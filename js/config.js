/* ═══════════════════════════════════════════════════════════════════
   DATOS DE LA WEB · Boda de Laura y Javier
   ───────────────────────────────────────────────────────────────────
   Este es el ÚNICO archivo que hace falta tocar para cambiar datos.

   Cómo editarlo sin romper nada:
   · Cambia solo lo que está entre comillas '…'.
   · Si un texto lleva un apóstrofo ('), escríbelo como \' (por ejemplo 'L\'Atelier').
   · No borres las comas del final de cada línea ni las llaves { } [ ].
   · Las líneas que empiezan por // son notas: el navegador las ignora.
   · Busca «PENDIENTE» para ver lo que falta por rellenar.
   ═══════════════════════════════════════════════════════════════════ */


/* ───────────────── 1. Fecha y hora de la boda (cuenta atrás) ─────────────────
   Formato: AAAA-MM-DDTHH:MM:SS+02:00  (el +02:00 es la hora de Madrid en verano).
   Funciona igual se abra la web desde donde se abra. */
var FECHA_BODA = '2027-06-05T12:30:00+02:00';


/* ───────────────── 2. Número de cuenta para el regalo ─────────────────
   Escríbelo con espacios cada 4 caracteres, como se quiera ver en la web. */
var IBAN = 'ES00 0000 0000 0000 0000 0000'; // PENDIENTE: IBAN


/* ───────────────── 3. Teléfonos de los novios ─────────────────
   Mientras el teléfono no sea real, NO salen los botones «Llamar» y «WhatsApp».
   Escríbelo con el prefijo de país: '+34 600 123 456'. */
var CONTACTOS = [
  { nombre: 'Laura Cid',      telefono: '+34 6XX XXX XXX' }, // PENDIENTE: teléfono Laura
  { nombre: 'Javier Gironés', telefono: '+34 6XX XXX XXX' }  // PENDIENTE: teléfono Javier
];


/* ───────────────── 4. Dónde llegan las respuestas del formulario ─────────────────
   appsScript: la dirección que da Google al publicar el script (ver apps-script/LEEME.md).
               Empieza por https://script.google.com/macros/s/…/exec
   whatsapp y email: OPCIONALES. Si los rellenas, en la pantalla de «¡Gracias!» aparecen
               botones para enviar también el resumen por WhatsApp o email.
               WhatsApp con prefijo y sin «+» ni espacios: '34600123456'. */
var RESPUESTAS = {
  appsScript: '', // PENDIENTE: URL del Apps Script
  whatsapp:   '', // opcional
  email:      ''  // opcional
};


/* ───────────────── 5. Autobuses ─────────────────
   Cada bloque { … } es un trayecto. Sale en la página «Boda» y como opción en el formulario.
   Para añadir un trayecto (por ejemplo una segunda vuelta), copia un bloque entero,
   pégalo debajo (separado por una coma) y cambia los datos.

   id          → nombre corto y único. Es el título de la columna en la hoja de respuestas.
                 No lo cambies cuando ya haya respuestas (se crearía una columna nueva).
   hora        → texto grande: '00:00 h' o 'Al terminar la ceremonia'.
   origen      → de dónde sale.
   destino     → a dónde va.
   salida      → (opcional) texto del punto de salida. Déjalo '' si no hay.
   mapa        → (opcional) enlace de Google Maps para el botón. Déjalo '' si no hay.
   textoMapa   → texto del botón del mapa.
   nota        → (opcional) texto pequeño debajo, por ejemplo 'Ubicación de llegada por definir'. */
var BUSES = [
  {
    id: 'Ida',
    hora: 'Al terminar la ceremonia',
    origen: 'Parque de San Martín',
    destino: 'Finca Maradela',
    salida: 'Parque de San Martín, justo al lado de la iglesia.',
    mapa: 'https://www.google.com/maps/dir/?api=1&origin=Iglesia+de+San+Pedro+y+San+Ildefonso,+Zamora&origin_place_id=ChIJ05A4hzUeOQ0ROP3NQLySO4w&destination=Parque+San+Mart%C3%ADn,+C.+San+Mart%C3%ADn,+49001+Zamora&travelmode=walking',
    textoMapa: 'Cómo llegar a pie',
    nota: ''
  },
  {
    id: 'Vuelta',
    hora: '00:00 h',
    origen: 'Finca Maradela',
    destino: 'Zamora',
    salida: '',
    mapa: '',
    textoMapa: '',
    nota: 'Ubicación de llegada por definir' // PENDIENTE: parada de llegada en Zamora
  }
];

/* Textos de la pregunta del autobús en el formulario */
var PREGUNTA_BUS = {
  invitado:            '¿Harás uso del servicio de autobuses desde la iglesia hasta la finca?',
  acompanante:         '¿Hará uso del servicio de autobuses desde la iglesia hasta la finca?',
  trayectosInvitado:   'Selecciona los trayectos que vayas a necesitar:',
  trayectosAcompanante:'Selecciona los trayectos que vaya a necesitar:'
};


/* ───────────────── 6. Alojamiento ─────────────────
   Salen en este orden. Campos de cada hotel:
   nombre, aPie + distancia (andando hasta la iglesia, según Google Maps), direccion (la « · » separa las dos líneas), descripcion, web (página oficial),
   busqueda + placeId (para que Google Maps abra el sitio exacto),
   imagen (nombre del mapa dentro de la carpeta img, sin el tamaño ni la extensión). */
var HOTELES = [
  { nombre: 'Hotel Ares', aPie: '8 min', distancia: '550 m', direccion: 'Plaza Puentica, 2 · 49031 Zamora',
    busqueda: 'Ares Hotel Zamora Plaza Puentica 2', placeId: 'ChIJH6N--UkeOQ0RyI9zeQLpdhg',
    web: 'https://www.areszamora.com/', imagen: 'hotel-ares',
    descripcion: 'Junto a las murallas, cerca del Museo Etnográfico y a pocos minutos a pie de la Plaza Mayor.' },
  { nombre: 'Hotel San Gil Plaza', aPie: '10 min', distancia: '700 m', direccion: 'Plaza Maestro Haedo, 5 · 49002 Zamora',
    busqueda: 'San Gil Plaza Zamora Plaza Maestro Haedo 5', placeId: 'ChIJr5yLQTEeOQ0RO8mMhlilXbo',
    web: 'https://sangilplaza.es/', imagen: 'hotel-sangil',
    descripcion: 'En pleno centro histórico, junto a la iglesia de Santiago del Burgo y cerca de la Plaza Mayor y el Mercado de Abastos.' },
  { nombre: 'Hotel Alda Mercado de Zamora', aPie: '11 min', distancia: '850 m', direccion: 'Plaza del Mercado, 20 · 49003 Zamora',
    busqueda: 'Hotel Alda Mercado de Zamora', placeId: 'ChIJi7KsnzEeOQ0RXT1oGn9JLr8',
    web: 'https://www.aldahotels.es/hoteles/castilla-y-leon/zamora/zamora/hotel-alda-mercado-de-zamora', imagen: 'hotel-alda',
    descripcion: 'Frente al Mercado de Abastos, a pocos minutos a pie de la Plaza Mayor y la calle Santa Clara.' },
  { nombre: 'Hotel Zenit Dos Infantas', aPie: '14 min', distancia: '1,1 km', direccion: 'C/ Cortinas de San Miguel, 3 · 49015 Zamora',
    busqueda: 'Hotel Zenit Dos Infantas Zamora', placeId: 'ChIJE5iAODAeOQ0RGE8TTd2lcN0',
    web: 'https://dosinfantas.zenithoteles.com/es/', imagen: 'hotel-zenit',
    descripcion: 'En la zona comercial de Zamora, junto a la calle Santa Clara y cerca de la Plaza de la Marina Española.' },
  { nombre: 'Hostería Real de Zamora', aPie: '4 min', distancia: '220 m', direccion: 'Cuesta de Pizarro, 7 · 49026 Zamora',
    busqueda: 'Hosteria Real de Zamora Cuesta de Pizarro 7', placeId: 'ChIJW2fyqDUeOQ0Rf8kP22eTXds',
    web: 'https://www.hosteriarealdezamora.com/', imagen: 'hotel-hosteria',
    descripcion: 'Junto al río Duero y el Puente de Piedra, cerca del casco histórico y a un paseo de la Plaza Mayor.' },
  { nombre: 'Hotel Doña Urraca', aPie: '11 min', distancia: '750 m', direccion: 'Plaza de la Puebla, 8 · 49005 Zamora',
    busqueda: 'Hotel Doña Urraca, Plaza de la Puebla 8, 49005 Zamora', placeId: 'ChIJ6xhctzceOQ0RePz6dv0EVz8',
    web: 'https://www.hoteldonaurraca.es/es', imagen: 'hotel-urraca',
    descripcion: 'Cerca de la Plaza Mayor y de la Plaza de Viriato, en una zona próxima al casco histórico.' }
];


/* ───────────────── 7. Conoce Zamora ─────────────────
   titulo: lo que va entre <em> y </em> sale en dorado.
   Cada sitio: nombre, texto, busqueda + placeId (Google Maps) y, si hace falta, etiqueta (p. ej. 'En Toro'). */
var ZAMORA = [
  {
    titulo: '… <em>tapear</em> como un zamorano',
    sitios: [
      { nombre: 'La Maja', busqueda: 'La Maja Tortillería, C. Alfonso de Castro 4, 49014 Zamora', placeId: 'ChIJudNvyd4fOQ0RfdzaWZvV49s',
        texto: 'Las tortillas de moda en Zamora. Pide la Fromaja, con quesos zamoranos y confitura casera de pimientos de Benavente. Si te gusta la tortilla, aquí hay que parar.' },
      { nombre: 'La Salita', busqueda: 'Taberna La Salita, C. de los Herreros 34, 49001 Zamora', placeId: 'ChIJ6cKeuCgfOQ0RUoJWLWpZ2aM',
        texto: 'El hermano pequeño de Lasal: pequeño, informal y con mucho nivel. Su imprescindible es el montado de pancetaca, aunque merece la pena dejarse recomendar.' },
      { nombre: 'La Vinacoteca', busqueda: 'La Vinacoteca, C. Cervantes 5, 49013 Zamora', placeId: 'ChIJT4HwMiUeOQ0RsPKbNDT80Wk',
        texto: 'Para los amantes del buen vino y el producto de aquí. Cecina, embutidos, quesos y sus caprichos de la casa. Aquí la copa de vino también forma parte del tapeo.' },
      { nombre: 'AttiKo GastroBar', busqueda: 'AttiKo GastroBar, C. de Diego de Losada 2, 49018 Zamora', placeId: 'ChIJr_FS1FMfOQ0R5h-y6-6v0kg',
        texto: 'Tapeo moderno y sin complicaciones. Tapas creativas, buenas raciones para compartir y una carta que invita a probar cosas diferentes. Déjate recomendar y pide varias para compartir.' },
      { nombre: 'El Chillón', busqueda: 'Chillón, C. Diego de Ordax 6, 49003 Zamora', placeId: 'ChIJy4xYFTEeOQ0RpeBHBvVLkUQ',
        texto: 'Un clásico entre los clásicos. Su tapa estrella es la tortilla de patata con salsa de callos. Si quieres probar una de las combinaciones más zamoranas, esta es obligatoria.' },
      { nombre: 'Bar Caballero', busqueda: 'Bar Caballero, C. de las Flores de San Torcuato 4, 49014 Zamora', placeId: 'ChIJBwpIZjAeOQ0R9xBHUaqPJgw',
        texto: 'Uno de los clásicos de la zona de pinchos. Pide sus famosas patatas mixtas y, si te atreves con la casquería, prueba también los figones o las crestas.' },
      { nombre: 'Los Caprichos de Meneses', busqueda: 'Los Caprichos de Meneses, Plaza Mayor 3, 49001 Zamora', placeId: 'ChIJE5iAODAeOQ0RvNvBT8FDSwM',
        texto: 'Junto a la Plaza Mayor y con una propuesta algo más elaborada. Pide el suflé de tortilla o la milhoja de bacalao y acompáñalo con un buen vino.' },
      { nombre: 'El Lobo', busqueda: 'El Lobo - El Rey de los Pinchitos, C. El Horno de San Torcuato 1, 49014 Zamora', placeId: 'ChIJG1PuYjAeOQ0RBWR7Uy_SZG8',
        texto: 'El rey de los pinchos morunos. Pídelos como manda la tradición: "uno que sí y uno que no", con y sin picante. Una parada imprescindible para entender el tapeo zamorano.' },
      { nombre: 'Al Lío', busqueda: 'Al Lío, C. de los Herreros 27, 49001 Zamora', placeId: 'ChIJe9_CSQAfOQ0R1tdp1Rfs7Rw',
        texto: 'Otra opción en Los Herreros, pero con un punto más nocturno. Croquetas, choripán de Tudanca y picoteo para empezar la noche o alargar la ruta.' }
    ]
  },
  {
    titulo: '… <em>sentarte a la mesa</em>',
    sitios: [
      { nombre: 'Cuzeo', busqueda: 'Cuzeo, C. Rúa los Francos 6, 49001 Zamora', placeId: 'ChIJG9KYZMQfOQ0Rtqq5P_MvXJs',
        texto: 'Cocina de temporada con producto zamorano y mucho mimo, en pleno casco antiguo. Pide el menú degustación si quieres probar su propuesta completa, o déjate llevar por la carta.' },
      { nombre: 'Cava Reina', busqueda: 'Cava Reina, C. Reina 3, 49004 Zamora', placeId: 'ChIJNZ30SucfOQ0Rwm8Ze937AVI',
        texto: 'Restaurante y enoteca en plena Plaza Mayor. Cocina cuidada, producto de la tierra y una carta de vinos enorme. Un sitio para comer bien y alargar la sobremesa.' },
      { nombre: 'La Sal', busqueda: 'Lasal, C. de los Herreros 29, 49001 Zamora', placeId: 'ChIJAbQVBTQeOQ0Ror1CP37xthM',
        texto: 'Para una comida o cena más especial. Producto de temporada, cocina cuidada y platos de esos que piden sentarse y disfrutar sin prisas.' },
      { nombre: 'La Baraka', busqueda: 'Restaurante La Baraka, Calle Sotelo 1, 49006 Zamora', placeId: 'ChIJt6bpxDAeOQ0RizdexDBGTI0',
        texto: 'Cocina cuidada y trato cercano en pleno centro. Producto de calidad y una carta para disfrutar sin prisas.' },
      { nombre: 'Asador Casa Mariano', busqueda: 'Asador Casa Mariano, Av. de Portugal 28, 49016 Zamora', placeId: 'ChIJlZSgLy4eOQ0RpHgyJv5yLqE',
        texto: 'Un asador tradicional donde el lechazo asado es el protagonista. Cocina zamorana de toda la vida, con buenas carnes y especialidades como el bacalao.' },
      { nombre: 'La Esquina de Colás', busqueda: 'Restaurante La Esquina de Colás, Plaza Mayor 24, 49800 Toro, Zamora', placeId: 'ChIJnepqS9OUOA0R2KXL3OKwdIs', etiqueta: 'En Toro',
        texto: 'Si te apetece acercarte a Toro, además de visitar alguna de sus bodegas, apunta este sitio. Se come fenomenal, el producto es muy bueno y el trato es de diez.' }
    ]
  },
  {
    titulo: '… un buen <em>café y algo dulce</em>',
    sitios: [
      { nombre: 'Atelier Bistrot', busqueda: 'Atelier Bistrot, Av. del Príncipe de Asturias 7, 49013 Zamora', placeId: 'ChIJA8xIYAAfOQ0R0p1owf3LmTY',
        texto: 'Café, té y repostería artesanal. Un rincón tranquilo para desayunar sin prisa o darte un capricho a media tarde.' },
      { nombre: 'Bendita Dulzura', busqueda: 'Bendita Dulzura, C. Pablo Morillo 2, 49014 Zamora', placeId: 'ChIJxcH2ZXAfOQ0Rl19Vpa4wK1s',
        texto: 'Buen café y tartas caseras que no resultan nada empalagosas. De esos sitios en los que siempre apetece pedir un poquito más.' },
      // DUDOSO: hay dos heladerías («Helados La Valenciana», Av. de Portugal 2, y «Valenciana Shock», C. Renova 15). Confirmar cuál.
      { nombre: 'La Valenciana', busqueda: 'Helados La Valenciana, Av. de Portugal 2, 49015 Zamora', placeId: 'ChIJMUbIQAcfOQ0RXcjGByqMhMg',
        texto: 'Los helados que todo el mundo conoce en Zamora. Artesanos, cremosos y perfectos para darte un capricho después de pasear por el centro.' }
    ]
  },
  {
    titulo: '… <em>comprar</em> en Gottas',
    sitios: [
      { nombre: 'Gottas', busqueda: 'GOTTAS Moda y Piel, C. Rúa los Francos 23, 49001 Zamora', placeId: 'ChIJCTl5l-EfOQ0R1v1XxyF3clc',
        texto: 'Moda y piel a precios irresistibles. De esas tiendas que se convierten en descubrimiento cuando visitas una ciudad. Y si vas, diles que vienes de parte de Laura y Javier: les hará mucha ilusión.' }
    ]
  }
];
