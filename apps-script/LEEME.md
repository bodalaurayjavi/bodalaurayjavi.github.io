# Cómo recibir las respuestas del formulario en Google Sheets

Lo vais a hacer **una sola vez** y se tarda unos 10 minutos. Solo necesitáis una cuenta de Google (Gmail) y un ordenador. Las respuestas os llegarán a una hoja de cálculo de vuestra cuenta, gratis.

---

## Paso 1 · Crear la hoja de cálculo

1. Entrad en <https://sheets.new> con la cuenta de Google donde queráis recibir las respuestas.
2. Arriba a la izquierda, donde pone «Hoja de cálculo sin título», escribid un nombre. Por ejemplo, **Respuestas boda**.

No hace falta crear columnas ni pestañas: se crean solas con la primera respuesta.

## Paso 2 · Pegar el script

1. En el menú de la hoja, pulsad **Extensiones → Apps Script**. Se abre una pestaña nueva con un editor.
2. Borrad todo lo que aparece escrito (`function myFunction() { … }`).
3. Abrid el archivo **`Code.gs`** de esta carpeta con cualquier editor de texto (el Bloc de notas o TextEdit sirven), seleccionad todo y copiadlo.
4. Pegadlo en el editor de Apps Script.
5. Pulsad el icono del **disquete** (💾 Guardar).
6. Opcional: arriba a la izquierda, donde pone «Proyecto sin título», poned **Formulario boda**.

## Paso 3 · Publicarlo como «aplicación web»

1. Arriba a la derecha, pulsad el botón azul **Implementar → Nueva implementación**.
2. Junto a «Seleccionar tipo», pulsad la rueda ⚙️ y elegid **Aplicación web**.
3. Rellenad así:
   - **Descripción:** `Formulario boda`
   - **Ejecutar como:** **Yo** (vuestro correo)
   - **Quién tiene acceso:** **Cualquier usuario**. Es necesario para que los invitados puedan enviar sin iniciar sesión; solo pueden *añadir* su respuesta, no ver la hoja.
4. Pulsad **Implementar**.
5. Google os pedirá permiso:
   - Pulsad **Autorizar acceso** y elegid vuestra cuenta.
   - Saldrá un aviso: «**Google no ha verificado esta aplicación**». Es normal, porque el script lo habéis creado vosotros y no está publicado en ninguna tienda. Pulsad **Configuración avanzada** y después **Ir a Formulario boda (no seguro)**.
   - Pulsad **Permitir**. El script solo pide permiso para escribir en vuestras hojas de cálculo.
6. Aparecerá la **URL de la aplicación web**. Empieza por `https://script.google.com/macros/s/` y termina en `/exec`. Pulsad **Copiar**.

## Paso 4 · Comprobar que funciona

Pegad esa URL en una pestaña nueva del navegador. Debe aparecer:

> ✅ El script de respuestas de la boda está funcionando.

## Paso 5 · Conectar la web

1. Abrid el archivo **`js/config.js`** de la web.
2. Buscad esta línea (apartado 4):
   ```js
   appsScript: '', // PENDIENTE: URL del Apps Script
   ```
3. Pegad la URL entre las comillas:
   ```js
   appsScript: 'https://script.google.com/macros/s/AKfy…/exec',
   ```
4. Guardad y volved a publicar la web.
5. **Haced una prueba**: rellenad el formulario con un nombre inventado. En unos segundos aparecerá en la pestaña **Respuestas** de la hoja. Después borrad esa fila de prueba (botón derecho sobre el número de fila → Eliminar fila).

---

## Cómo leer las respuestas

La hoja tiene dos pestañas:

| Pestaña | Qué contiene |
|---|---|
| **Respuestas** | **Una fila por invitado**, siempre con su última respuesta. Si alguien vuelve a enviar el formulario con el mismo nombre y apellidos, su fila se sustituye. Se reconoce a la persona aunque cambie tildes o mayúsculas. |
| **Historial** | Una copia de **todos** los envíos, incluidos los repetidos. Solo por si necesitáis ver qué contestó alguien antes. |

Columnas de **Respuestas**:

- **Fecha y hora** del último envío, en hora de Madrid.
- **Nombre**, **Apellidos** y **¿Viene?** (Sí / No).
- **Personas**: 0, 1 o 2 (con acompañante). Para el total de invitados, sumad la columna.
- **Plazas · Preboda**: cuántas personas de esa fila vienen a la preboda.
- **Plazas · Bus Ida**, **Plazas · Bus Vuelta**…: cuántas plazas de cada autobús. Hay una columna por trayecto. Sumad la columna para saber cuántas plazas reservar.
- **Preboda**, **Autobús**, **Alimentación** y **Otra alergia** del invitado.
- **Acompañante** (Sí / No), su **nombre** y sus mismas respuestas.
- **Canciones** y **Mensaje**.
- **Veces enviado**: cuántas veces ha mandado el formulario esa persona.
- **Clave (no tocar)**: es lo que usa el script para reconocer a cada persona.

**Para sumar una columna:** pinchad en la letra de la columna (por ejemplo, la F). Abajo a la derecha de la pantalla aparece **Suma: …**.

**Para ver solo a quien tiene alergias:** Datos → Crear un filtro, y en la columna «Alimentación» desmarcad «Ninguna alergia ni intolerancia».

### Importante

- **No cambiéis el nombre de las pestañas** («Respuestas» e «Historial») **ni los títulos de la primera fila**. Si lo hacéis, el script creará columnas nuevas.
- Sí podéis cambiar colores, anchos de columna, ordenar o filtrar, y añadir columnas propias **a la derecha del todo** (por ejemplo, «Mesa»).
- Si añadís un trayecto de autobús en `js/config.js`, su columna aparecerá sola con la siguiente respuesta.

---

## Si algún día cambiáis el script

Si modificáis `Code.gs`, la web **no** usa el cambio hasta que publiquéis una versión nueva. Para mantener la misma URL:

1. **Implementar → Gestionar implementaciones**.
2. Pulsad el lápiz ✏️ de la implementación que ya existe.
3. En **Versión**, elegid **Nueva versión** y pulsad **Implementar**.

No uséis «Nueva implementación»: os daría una URL distinta y habría que cambiarla en `config.js`.

## Problemas frecuentes

| Qué pasa | Solución |
|---|---|
| Al enviar sale «No hemos podido enviar tus respuestas» | Comprobad que la URL de `config.js` termina en `/exec` y que en el paso 3 elegisteis **Cualquier usuario**. Abrid la URL en el navegador: debe salir el mensaje ✅. |
| Al abrir la URL pide iniciar sesión | En «Quién tiene acceso» no está puesto «Cualquier usuario». Gestionad la implementación (lápiz ✏️) y cambiadlo. |
| No aparece nada en la hoja | Mirad que el script esté dentro de **esa** hoja (Extensiones → Apps Script desde la propia hoja). |
| Una persona aparece dos veces | Escribió su nombre de forma distinta (por ejemplo, «Javi» y «Javier»). Borrad la fila que sobre. |

Aunque el envío falle, el invitado no pierde nada: la web le muestra un resumen y un botón «Copiar respuestas» para que os lo mande por otro medio.
