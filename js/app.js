/* ═══════════════════════════════════════════════════════════════════
   Boda de Laura y Javier · funcionamiento de la web
   Los datos se editan en js/config.js; aquí no hace falta tocar nada.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var IGLESIA = { q: 'Iglesia de San Pedro y San Ildefonso, Zamora', pid: 'ChIJ05A4hzUeOQ0ROP3NQLySO4w' };

  /* ═════════ Utilidades ═════════ */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function icon(id) { return '<svg class="i"><use href="#i-' + id + '"/></svg>'; }
  function reducedMotion() { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function maps(q, pid) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q) + (pid ? '&query_place_id=' + pid : '');
  }
  function walkUrl(fromQ, fromPid) {
    return 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(fromQ) + (fromPid ? '&origin_place_id=' + fromPid : '') +
      '&destination=' + encodeURIComponent(IGLESIA.q) + '&destination_place_id=' + IGLESIA.pid + '&travelmode=walking';
  }
  function nb(s) { return esc(s).replace(/ /g, '&nbsp;'); }   // que «550 m» no se parta en dos líneas
  function busLabel(b) { return b.origen + ' → ' + b.destino; }

  /* ═════════ Autobuses (página Boda) ═════════ */
  function renderBuses() {
    $('bus-list').innerHTML = BUSES.map(function (b) {
      return '<div class="bus-row"><div class="ic">' + icon('bus') + '</div><div>' +
        '<b>' + esc(b.hora) + '</b><span>' + esc(busLabel(b)) + '</span>' +
        (b.nota ? '<small class="bus-tbd">' + esc(b.nota) + '</small>' : '') +
        (b.salida ? '<p class="bus-meet"><b>Punto de salida:</b> ' + esc(b.salida) + '</p>' : '') +
        (b.mapa ? '<a class="pill-link" target="_blank" rel="noopener" href="' + esc(b.mapa) + '">' + icon('pin') + esc(b.textoMapa || 'Cómo llegar') + '</a>' : '') +
        '</div></div>';
    }).join('');
  }

  /* ═════════ Alojamientos ═════════ */
  function renderHotels() {
    var sizes = '(min-width: 980px) 300px, (min-width: 760px) calc(50vw - 75px), calc(100vw - 74px)';
    $('hotels').innerHTML = HOTELES.map(function (h) {
      var src = 'img/' + h.imagen, ruta = esc(walkUrl(h.busqueda, h.placeId));
      return '<article class="card hotel">' +
        '<h3 class="h-title">' + esc(h.nombre) + '</h3>' +
        '<figure class="h-mapimg"><a href="' + ruta + '" target="_blank" rel="noopener" aria-label="Ver en Google Maps la ruta a pie desde ' + esc(h.nombre) + ' hasta la iglesia"><picture>' +
          '<source type="image/webp" srcset="' + src + '-450.webp 450w, ' + src + '-900.webp 900w" sizes="' + sizes + '">' +
          '<img src="' + src + '-900.jpg" srcset="' + src + '-450.jpg 450w, ' + src + '-900.jpg 900w" sizes="' + sizes + '" width="900" height="709" loading="lazy" alt="Ruta a pie desde ' + esc(h.nombre) + ' hasta la Iglesia de San Pedro y San Ildefonso">' +
        '</picture></a></figure>' +
        '<p class="h-desc">' + esc(h.descripcion) + '</p>' +
        '<div class="h-foot">' +
        (h.aPie ? '<p class="h-walk">' + icon('walk') + '<span>' + nb(h.aPie) + ' andando hasta la iglesia' + (h.distancia ? ' ' + nb('(' + h.distancia + ')') : '') + '</span></p>' : '') +
        '<a class="pc-addr" target="_blank" rel="noopener" href="' + ruta + '" title="Ver ruta a pie hasta la iglesia">' + icon('pin') + '<span>' + h.direccion.split(' · ').map(esc).join('<br>') + '</span></a>' +
        (h.web ? '<div><a class="web" target="_blank" rel="noopener" href="' + esc(h.web) + '">Visitar web ' + icon('ext') + '</a></div>' : '') +
        '</div></article>';
    }).join('');
  }

  /* ═════════ Conoce Zamora ═════════ */
  function renderZamora() {
    $('zamora-root').innerHTML = ZAMORA.map(function (g) {
      return '<div class="zgroup"><h2>' + g.titulo + '</h2>' +
        '<div class="zgrid' + (g.sitios.length === 4 ? ' n4' : '') + '">' + g.sitios.map(function (s) {
          return '<div class="zcard">' + (s.etiqueta ? '<span class="tag">' + esc(s.etiqueta) + '</span>' : '') +
            '<div class="nm">' + esc(s.nombre) + '</div><div class="q">' + esc(s.texto) + '</div>' +
            '<a class="pill-link" target="_blank" rel="noopener" href="' + esc(maps(s.busqueda, s.placeId)) + '">' + icon('pin') + 'Cómo llegar</a></div>';
        }).join('') + '</div></div>';
    }).join('');
  }

  /* ═════════ Regalo y contactos ═════════ */
  /* Devuelve el teléfono en formato internacional (solo cifras) o '' si aún no es real */
  function intlPhone(t) {
    var d = String(t || '').replace(/\D/g, '');
    if (d.length === 9) d = '34' + d;         // número español sin prefijo
    return d.length >= 11 ? d : '';
  }
  function renderContacts() {
    $('contacts').innerHTML = CONTACTOS.map(function (c) {
      var d = intlPhone(c.telefono);
      return '<div class="contact"><div><div class="nm">' + esc(c.nombre) + '</div><div class="tl">' + esc(c.telefono) + '</div></div>' +
        (d ? '<div class="acts"><a class="pill-link" href="tel:+' + d + '">' + icon('phone') + 'Llamar</a>' +
        '<a class="pill-link" target="_blank" rel="noopener" href="https://wa.me/' + d + '">' + icon('chat') + 'WhatsApp</a></div>' : '') + '</div>';
    }).join('');
    $('iban-txt').textContent = IBAN;
  }

  /* ═════════ Aviso flotante + copiar ═════════ */
  var toastT;
  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  function copyText(txt, okMsg) {
    function fallback() {
      try {
        var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); toast(okMsg);
      } catch (e) { toast('No se pudo copiar, selecciónalo manualmente'); }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast(okMsg); }, fallback);
      else fallback();
    } catch (e) { fallback(); }
  }

  /* ═════════ Navegación ═════════
     Una "página" por apartado del menú (#inicio, #preboda…).
     #boda/ceremonia y #boda/celebracion abren Boda y bajan a esa tarjeta. */
  var PAGES = ['inicio', 'preboda', 'boda', 'alojamiento', 'zamora', 'asistencia'];
  var ANCLAS = { 'boda/ceremonia': 't-ceremonia', 'boda/celebracion': 't-celebracion' };
  var TITLES = { inicio: 'Boda de Laura y Javier', preboda: 'Preboda · Laura y Javier', boda: 'Boda · Laura y Javier', alojamiento: 'Alojamiento · Laura y Javier', zamora: 'Conoce Zamora · Laura y Javier', asistencia: 'Confirma tu asistencia · Laura y Javier' };
  var burger = $('burger'), menu = $('menu'), scrim = $('scrim');

  function setMenu(open) {
    menu.classList.toggle('open', open); scrim.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  scrim.addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  function parseHash() {
    var h = decodeURIComponent((location.hash || '').slice(1));
    var page = h.split('/')[0];
    return { page: PAGES.indexOf(page) < 0 ? 'inicio' : page, target: ANCLAS[h] || null };
  }
  function scrollInstant(y) {
    try { window.scrollTo({ top: y, behavior: 'instant' }); } catch (e) { window.scrollTo(0, y); }
  }
  /* Posición real en la página, sin contar la animación de entrada (que la desplaza 8 px) */
  function docTop(el) { var y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }
  function goTarget(id) {
    var el = $(id); if (!el) return;
    requestAnimationFrame(function () {
      var margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      window.scrollTo({ top: docTop(el) - margin, behavior: reducedMotion() ? 'auto' : 'smooth' });
    });
  }
  /* Guarda la posición de cada entrada del historial para que «atrás» vuelva al mismo sitio */
  function saveScroll() { try { history.replaceState({ y: window.scrollY }, ''); } catch (e) {} }
  var saveT;
  window.addEventListener('scroll', function () { clearTimeout(saveT); saveT = setTimeout(saveScroll, 250); }, { passive: true });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function route() {
    var r = parseHash();
    document.documentElement.setAttribute('data-page', r.page);
    document.querySelectorAll('.menu a.lnk').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-route') === r.page); });
    document.title = TITLES[r.page];
    setMenu(false);
    var st = history.state;
    if (st && typeof st.y === 'number') scrollInstant(st.y);       // atrás / adelante / recarga
    else if (r.target) { scrollInstant(0); goTarget(r.target); }   // enlace a una tarjeta
    else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.id === 'edit-again') return;
    clearTimeout(saveT); saveScroll();
    if (a.getAttribute('href') !== location.hash) return;          // el navegador cambia de página
    // Enlace a la página en la que ya estás: cerrar menú y subir (o bajar a la tarjeta)
    e.preventDefault(); setMenu(false);
    var tg = ANCLAS[a.getAttribute('href').slice(1)];
    if (tg) goTarget(tg); else window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
  });

  /* ═════════ Cuenta atrás ═════════
     La fecha lleva la zona horaria (+02:00), así que da lo mismo desde dónde se mire. */
  var BODA_MS = Date.parse(FECHA_BODA), tickT;
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    if (isNaN(BODA_MS)) return;
    var s = Math.floor(Math.max(0, BODA_MS - Date.now()) / 1000);
    $('cd-d').textContent = Math.floor(s / 86400);
    $('cd-h').textContent = pad(Math.floor(s % 86400 / 3600));
    $('cd-m').textContent = pad(Math.floor(s % 3600 / 60));
    $('cd-s').textContent = pad(s % 60);
    if (s === 0) clearInterval(tickT);
  }

  /* ═════════ Cuestionario (se va desplegando según las respuestas) ═════════ */
  function initForm() {
    var form = $('rsvp'), done = $('done');
    var PERSONS = ['g', 'c'];
    function val(name) { var el = form.querySelector('input[name=' + name + ']:checked'); return el ? el.value : ''; }
    function vals(name) { return Array.prototype.map.call(form.querySelectorAll('input[name=' + name + ']:checked'), function (i) { return i.value; }); }
    function g(id) { return ($(id).value || '').trim(); }

    /* Pregunta y trayectos de autobús, generados desde BUSES y PREGUNTA_BUS */
    $('lg-bus-g').textContent = PREGUNTA_BUS.invitado;
    $('lg-bus-c').textContent = PREGUNTA_BUS.acompanante;
    $('lg-tray-g').textContent = PREGUNTA_BUS.trayectosInvitado;
    $('lg-tray-c').textContent = PREGUNTA_BUS.trayectosAcompanante;
    PERSONS.forEach(function (P) {
      $('opts-' + P).innerHTML = BUSES.map(function (b) {
        return '<label class="opt"><input type="checkbox" name="tray_' + P + '" value="' + esc(b.id) + '"><span><b>' + esc(b.hora) + '</b>' + esc(busLabel(b)) + '</span></label>';
      }).join('');
    });
    function trayText(id) {
      var b = BUSES.filter(function (x) { return x.id === id; })[0];
      return b ? b.id + ' · ' + b.hora + ' · ' + busLabel(b) : id;
    }

    function setOpen(el, open) {
      if (el.classList.contains('open') === open) return;
      clearTimeout(el._t);
      if (open) {
        el.inert = false; el.classList.add('open');
        el._t = setTimeout(function () { el.classList.add('settled'); }, 520);
      } else {
        el.classList.remove('settled'); el.classList.remove('open'); el.inert = true;
      }
    }
    function otherOn(P) { var o = form.querySelector('input[name=al_' + P + '][data-other]'); return !!(o && o.checked); }
    function alList(P) {
      var l = vals('al_' + P).filter(function (v) { return v !== 'Otra alergia o intolerancia'; });
      if (otherOn(P)) l.push('Otra: ' + (g('f-alx-' + P) || '(sin especificar)'));
      return l;
    }
    function updateMs(P) {
      var l = vals('al_' + P), el = $('ms-val-' + P);
      el.textContent = l.length ? l.join(', ') : 'Selecciona una o varias opciones';
      el.classList.toggle('has', l.length > 0);
    }
    function update() {
      var a = val('asiste'), ac = val('acomp');
      setOpen($('b-no'), a === 'no');
      setOpen($('b-si'), a === 'si');
      setOpen($('b-acomp'), ac === 'si');
      PERSONS.forEach(function (P) {
        setOpen($('b-bus-' + P), val('bus_' + P) === 'si');
        setOpen($('b-alx-' + P), otherOn(P));
        updateMs(P);
      });
    }
    function clearInvalid(e) {
      var w = e.target.closest && e.target.closest('.invalid');
      if (w) { w.classList.remove('invalid'); w.removeAttribute('data-err'); }
      $('err').textContent = '';
    }
    form.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches && t.matches('input[name^=al_]')) {
        // «Ninguna» excluye al resto de opciones
        var boxes = form.querySelectorAll('input[name=' + t.name + ']');
        if (t.hasAttribute('data-none') && t.checked) boxes.forEach(function (b) { if (b !== t) b.checked = false; });
        else if (t.checked) boxes.forEach(function (b) { if (b.hasAttribute('data-none')) b.checked = false; });
      }
      clearInvalid(e); update();
    });
    form.addEventListener('input', clearInvalid);
    /* Cerrar los desplegables al pulsar fuera o con Escape */
    document.addEventListener('click', function (e) {
      form.querySelectorAll('details.ms[open]').forEach(function (d) { if (!d.contains(e.target)) d.open = false; });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') form.querySelectorAll('details.ms[open]').forEach(function (d) { d.open = false; });
    });
    update();

    function SN(v) { return v === 'si' ? 'Sí' : (v === 'no' ? 'No' : '—'); }
    function personLines(P) {
      var l = [];
      l.push('Preboda (viernes 4 de junio): ' + SN(val('pre_' + P)));
      if (val('bus_' + P) === 'si') l.push('Autobús: Sí · ' + vals('tray_' + P).map(trayText).join(' + '));
      else l.push('Autobús: No');
      l.push('Alimentación: ' + alList(P).join(', '));
      return l;
    }
    function resumen() {
      var a = val('asiste'), ac = val('acomp');
      var l = ['CONFIRMACIÓN DE ASISTENCIA · Boda de Laura y Javier (5 de junio de 2027)', ''];
      l.push('Nombre: ' + g('f-nombre') + ' ' + g('f-apellidos'));
      if (a === 'no') {
        l.push('Asistencia a la boda: No podré asistir');
        if (g('f-msg-no')) l.push('Mensaje: ' + g('f-msg-no'));
        return l.join('\n');
      }
      l.push('Asistencia a la boda: Sí', '', '· TÚ ·');
      l = l.concat(personLines('g'));
      if (ac === 'si') {
        l.push('', '· ACOMPAÑANTE: ' + g('f-acomp-nombre') + ' ·');
        l = l.concat(personLines('c'));
      } else l.push('', 'Acompañante: No');
      if (g('f-cancion') || g('f-msg')) l.push('');
      if (g('f-cancion')) l.push('Canciones: ' + g('f-cancion'));
      if (g('f-msg')) l.push('Mensaje: ' + g('f-msg'));
      return l.join('\n');
    }

    function problems() {
      var p = [], a = val('asiste'), ac = val('acomp');
      if (!g('f-nombre')) p.push(['w-nombre', 'Necesitamos tu nombre.']);
      if (!g('f-apellidos')) p.push(['w-apellidos', 'Necesitamos tus apellidos.']);
      if (!a) p.push(['q-asiste', 'Cuéntanos si podrás acompañarnos.']);
      if (a !== 'si') return p;
      function checkPerson(P) {
        if (!val('pre_' + P)) p.push(['q-pre-' + P, 'Elige una opción.']);
        var bus = val('bus_' + P);
        if (!bus) p.push(['q-bus-' + P, 'Elige una opción.']);
        else if (bus === 'si' && !vals('tray_' + P).length) p.push(['q-tray-' + P, 'Selecciona al menos un trayecto.']);
        if (!vals('al_' + P).length) p.push(['q-al-' + P, 'Elige al menos una opción.']);
        if (otherOn(P) && !g('f-alx-' + P)) p.push(['w-alx-' + P, 'Cuéntanos cuál.']);
      }
      checkPerson('g');
      if (!ac) p.push(['q-acomp', 'Elige una opción.']);
      if (ac === 'si') {
        if (!g('f-acomp-nombre')) p.push(['w-acomp-nombre', 'Indícanos el nombre y apellidos de tu acompañante.']);
        checkPerson('c');
      }
      return p;
    }

    /* Datos para la hoja de Google: pares [columna, valor] en el orden de las columnas */
    function alBase(P) { return vals('al_' + P).filter(function (v) { return v !== 'Otra alergia o intolerancia'; }).join(', '); }
    function busText(P) { return val('bus_' + P) === 'si' ? 'Sí · ' + vals('tray_' + P).join(' + ') : 'No'; }
    function datos() {
      var si = val('asiste') === 'si', ac = si && val('acomp') === 'si', d = [];
      function add(k, v) { d.push([k, v == null ? '' : v]); }
      function uses(P, id) { return val('bus_' + P) === 'si' && vals('tray_' + P).indexOf(id) >= 0 ? 1 : 0; }
      add('Nombre', g('f-nombre'));
      add('Apellidos', g('f-apellidos'));
      add('¿Viene?', si ? 'Sí' : 'No');
      add('Personas', si ? (ac ? 2 : 1) : 0);
      add('Plazas · Preboda', si ? (val('pre_g') === 'si' ? 1 : 0) + (ac && val('pre_c') === 'si' ? 1 : 0) : 0);
      BUSES.forEach(function (b) { add('Plazas · Bus ' + b.id, si ? uses('g', b.id) + (ac ? uses('c', b.id) : 0) : 0); });
      add('Preboda', si ? SN(val('pre_g')) : '');
      add('Autobús', si ? busText('g') : '');
      add('Alimentación', si ? alBase('g') : '');
      add('Otra alergia', si && otherOn('g') ? g('f-alx-g') : '');
      add('Acompañante', si ? (ac ? 'Sí' : 'No') : '');
      add('Nombre acompañante', ac ? g('f-acomp-nombre') : '');
      add('Preboda acompañante', ac ? SN(val('pre_c')) : '');
      add('Autobús acompañante', ac ? busText('c') : '');
      add('Alimentación acompañante', ac ? alBase('c') : '');
      add('Otra alergia acompañante', ac && otherOn('c') ? g('f-alx-c') : '');
      add('Canciones', si ? g('f-cancion') : '');
      add('Mensaje', si ? g('f-msg') : g('f-msg-no'));
      return d;
    }

    /* Envío a Google Apps Script (texto plano para evitar bloqueos CORS; espera {ok:true}) */
    function enviar(body) {
      if (!RESPUESTAS.appsScript) return Promise.reject(new Error('Falta la URL del Apps Script en js/config.js'));
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
      return fetch(RESPUESTAS.appsScript, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(body), signal: ctrl ? ctrl.signal : undefined })
        .then(function (r) { return r.json(); })
        .then(function (j) { clearTimeout(timer); if (!j || !j.ok) throw new Error((j && j.error) || 'Respuesta inesperada'); })
        .catch(function (err) { clearTimeout(timer); throw err; });
    }

    var sending = false, btn = $('send-btn');
    function setSending(on) {
      sending = on; btn.disabled = on; btn.setAttribute('aria-busy', on ? 'true' : 'false');
      btn.textContent = on ? 'Enviando…' : 'Enviar';
    }
    function showDone(ok, txt) {
      var no = val('asiste') === 'no', n = g('f-nombre');
      $('done-icon').setAttribute('href', ok ? '#i-check' : '#i-info');
      $('done-title').textContent = !ok ? 'No hemos podido enviar tus respuestas' : (no ? 'Gracias por avisarnos, ' + n : '¡Gracias, ' + n + '!');
      var canales = [intlPhone(RESPUESTAS.whatsapp) ? 'WhatsApp' : '', RESPUESTAS.email ? 'email' : ''].filter(Boolean).join(' o ');
      $('done-sub').textContent = !ok ? 'Puede ser un fallo de conexión. Vuelve a intentarlo en un momento o copia tus respuestas y envíanoslas' + (canales ? ' por ' + canales : '') + '.'
        : (no ? 'Nos dará mucha pena no verte, pero te tendremos muy presente. Hemos recibido tu respuesta:' : 'Hemos recibido tus respuestas. Este es el resumen:');
      $('done-pre').textContent = txt;

      var wa = intlPhone(RESPUESTAS.whatsapp), html = '';
      if (!ok) html += '<button class="btn" type="button" id="retry">Volver a intentarlo</button>';
      if (wa) html += '<a class="btn' + (ok ? '' : ' ghost') + '" target="_blank" rel="noopener" href="https://wa.me/' + wa + '?text=' + encodeURIComponent(txt) + '">' + icon('chat') + 'Enviar por WhatsApp</a>';
      if (RESPUESTAS.email) html += '<a class="btn ghost" href="mailto:' + esc(RESPUESTAS.email) + '?subject=' + encodeURIComponent('Confirmación boda · ' + n + ' ' + g('f-apellidos')) + '&amp;body=' + encodeURIComponent(txt) + '">' + icon('mail') + 'Enviar por email</a>';
      html += '<button class="btn ghost" type="button" id="copy-resp">' + icon('copy') + 'Copiar respuestas</button>';
      $('send').innerHTML = html;
      $('copy-resp').addEventListener('click', function () { copyText(txt, 'Respuestas copiadas'); });
      if (!ok) $('retry').addEventListener('click', function () { done.hidden = true; form.hidden = false; form.requestSubmit ? form.requestSubmit() : submit(); });
      form.hidden = true; done.hidden = false;
      window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
      $('done-title').focus({ preventScroll: true });
    }

    function submit(e) {
      if (e) e.preventDefault();
      if (sending) return;                                              // evita el doble envío
      form.querySelectorAll('.invalid').forEach(function (n) { n.classList.remove('invalid'); n.removeAttribute('data-err'); });
      var err = $('err'), p = problems();
      if (p.length) {
        p.forEach(function (x) { var n = $(x[0]); n.classList.add('invalid'); n.setAttribute('data-err', x[1]); });
        err.textContent = 'Faltan algunas respuestas, las hemos marcado arriba.';
        $(p[0][0]).scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
        return;
      }
      err.textContent = '';
      var txt = resumen();
      if ($('f-web').value) { showDone(true, txt); return; }           // robot: fingimos que todo va bien
      setSending(true);
      enviar({ website: $('f-web').value, datos: datos() })
        .then(function () { setSending(false); showDone(true, txt); })
        .catch(function (er) { if (window.console) console.warn('Envío fallido:', er); setSending(false); showDone(false, txt); });
    }
    form.addEventListener('submit', submit);
    $('edit-again').addEventListener('click', function (e) { e.preventDefault(); done.hidden = true; form.hidden = false; window.scrollTo(0, 0); });
  }

  /* ═════════ Arranque ═════════ */
  $('copy-iban').addEventListener('click', function () { copyText(IBAN, 'Cuenta copiada'); });
  renderBuses(); renderHotels(); renderZamora(); renderContacts(); initForm();
  tick(); tickT = setInterval(tick, 1000);
  route();
})();
