/**
 * Boda de Laura y Javier · respuestas del formulario → Google Sheets
 *
 * Se pega en la hoja de cálculo (Extensiones › Apps Script) y se publica como
 * aplicación web. Instrucciones paso a paso en LEEME.md.
 *
 * Qué hace:
 *  · Pestaña «Respuestas»: UNA fila por invitado. Si la misma persona (mismo nombre
 *    y apellidos) vuelve a enviar el formulario, su fila se sustituye por la nueva.
 *  · Pestaña «Historial»: copia de TODOS los envíos, por si hiciera falta consultarlos.
 *  · Las columnas se crean solas. Si se añade un trayecto de autobús en la web,
 *    aparece su columna «Plazas · Bus …» al final la próxima vez que alguien responda.
 */

var ZONA_HORARIA = 'Europe/Madrid';
var HOJA_RESPUESTAS = 'Respuestas';
var HOJA_HISTORIAL = 'Historial';
var COL_FECHA = 'Fecha y hora';
var COL_VECES = 'Veces enviado';
var COL_CLAVE = 'Clave (no tocar)';
var MAX_TEXTO = 2000;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (body.website) return json_({ ok: true });                 // campo trampa relleno: es un robot
    var datos = limpiar_(body.datos);
    var nombre = valor_(datos, 'Nombre'), apellidos = valor_(datos, 'Apellidos');
    if (!nombre || !apellidos) return json_({ ok: false, error: 'Faltan el nombre o los apellidos' });

    var fecha = Utilities.formatDate(new Date(), ZONA_HORARIA, 'dd/MM/yyyy HH:mm:ss');
    var clave = normalizar_(nombre + ' ' + apellidos);
    var fila = [[COL_FECHA, fecha]].concat(datos);

    lock.waitLock(20000);
    var libro = SpreadsheetApp.getActiveSpreadsheet();

    // Historial: siempre se añade
    var hist = hoja_(libro, HOJA_HISTORIAL);
    var cabH = cabeceras_(hist, fila.map(function (p) { return p[0]; }));
    hist.appendRow(cabH.map(function (c) { return valor_(fila, c); }));

    // Respuestas: una fila por persona
    var resp = hoja_(libro, HOJA_RESPUESTAS);
    var cab = cabeceras_(resp, fila.map(function (p) { return p[0]; }).concat([COL_VECES, COL_CLAVE]));
    var colClave = cab.indexOf(COL_CLAVE), colVeces = cab.indexOf(COL_VECES);
    var n = resp.getLastRow(), existente = -1, veces = 0;
    if (n > 1) {
      var claves = resp.getRange(2, colClave + 1, n - 1, 1).getValues();
      for (var i = 0; i < claves.length; i++) if (claves[i][0] === clave) { existente = i + 2; break; }
      if (existente > 0) veces = Number(resp.getRange(existente, colVeces + 1).getValue()) || 1;
    }
    var completa = fila.concat([[COL_VECES, veces + 1], [COL_CLAVE, clave]]);
    var valores = [cab.map(function (c) { return valor_(completa, c); })];
    if (existente > 0) resp.getRange(existente, 1, 1, cab.length).setValues(valores);
    else resp.getRange(n + 1, 1, 1, cab.length).setValues(valores);

    return json_({ ok: true, actualizado: existente > 0 });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

/** Al abrir la URL en el navegador: sirve para comprobar que está bien publicado. */
function doGet() {
  return ContentService.createTextOutput('✅ El script de respuestas de la boda está funcionando.');
}

/* ───────── Ayudantes ───────── */

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Devuelve la pestaña (la crea si no existe). */
function hoja_(libro, nombre) {
  var h = libro.getSheetByName(nombre);
  if (!h) { h = libro.insertSheet(nombre); h.setFrozenRows(1); }
  return h;
}

/** Asegura que existen todas las columnas y devuelve la cabecera.
 *  Las que falten se añaden al final, pero siempre antes de «Veces enviado» y «Clave». */
function cabeceras_(h, necesarias) {
  var ancho = h.getLastColumn();
  var cab = ancho ? h.getRange(1, 1, 1, ancho).getValues()[0].map(String) : [];
  var nuevas = necesarias.filter(function (c) { return cab.indexOf(c) < 0 && c !== COL_VECES && c !== COL_CLAVE; });
  if (nuevas.length) {
    var pos = cab.indexOf(COL_VECES);
    if (pos < 0) pos = cab.length;
    else h.insertColumnsBefore(pos + 1, nuevas.length);
    h.getRange(1, pos + 1, 1, nuevas.length).setValues([nuevas]).setFontWeight('bold');
    cab = cab.slice(0, pos).concat(nuevas, cab.slice(pos));
  }
  var tecnicas = necesarias.filter(function (c) { return cab.indexOf(c) < 0; });
  if (tecnicas.length) {
    h.getRange(1, cab.length + 1, 1, tecnicas.length).setValues([tecnicas]).setFontWeight('bold');
    cab = cab.concat(tecnicas);
  }
  h.setFrozenRows(1);
  return cab;
}

function valor_(pares, col) {
  for (var i = 0; i < pares.length; i++) if (pares[i][0] === col) return pares[i][1];
  return '';
}

/** Solo pares [texto, texto|número]; recorta textos largos y neutraliza fórmulas (=, +, -, @). */
function limpiar_(datos) {
  if (!Array.isArray(datos)) return [];
  return datos.filter(function (p) { return Array.isArray(p) && p.length === 2 && typeof p[0] === 'string'; })
    .map(function (p) {
      var k = p[0].slice(0, 80), v = p[1];
      if (typeof v === 'number') return [k, v];
      v = String(v == null ? '' : v).slice(0, MAX_TEXTO);
      if (/^[=+\-@]/.test(v)) v = "'" + v;
      return [k, v];
    });
}

/** «  José  Pérez » → «jose perez» (para reconocer a la misma persona aunque cambie tildes o mayúsculas). */
function normalizar_(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
}
