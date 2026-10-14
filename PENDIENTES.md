# Lo que falta por rellenar

Casi todo se cambia en **`js/config.js`**. Se puede abrir con cualquier editor de texto (Bloc de notas, TextEdit…). Las instrucciones están dentro del propio archivo; buscad la palabra **PENDIENTE**.

Después de cada cambio, hay que volver a publicar la web (ver «Cómo actualizar» al final).

## Imprescindible antes de compartir el enlace

| # | Qué | Archivo y línea | Qué poner |
|---|---|---|---|
| 1 | **IBAN** | `js/config.js`, línea 23 | El número de cuenta con espacios cada 4 caracteres: `'ES12 3456 7890 1234 5678 9012'`. Ahora se ve «ES00 0000…» en la web. |
| 2 | ~~Teléfono de Laura~~ | — | ✅ Hecho (+34 620 456 941). |
| 3 | **Teléfono de Javier** | `js/config.js`, línea 31 | `telefono: '+34 600 123 456'`. Mientras sea «6XX…» no sale su botón «WhatsApp», pero el texto de relleno sí se ve. |
| 4 | **URL del Apps Script** (dónde llegan las respuestas) | `js/config.js`, línea 42 | La dirección que acaba en `/exec`. Paso a paso en `apps-script/LEEME.md`. **Sin esto, el formulario no guarda nada:** muestra el resumen para copiarlo a mano. |

## Autobuses (cuando estén cerrados)

| # | Qué | Archivo y línea | Notas |
|---|---|---|---|
| 5 | Hora o texto de la **ida** | `js/config.js`, línea 65 | Ahora: «Al terminar la ceremonia». |
| 6 | Hora de la **vuelta** | `js/config.js`, línea 75 | Ahora: «00:00 h». |
| 7 | **Parada de llegada** de la vuelta | `js/config.js`, línea 81 | Ahora: «Ubicación de llegada por definir». Si queda definida, se cambia la `nota` (o se borra con `''`) y se puede añadir un enlace en `mapa`. |
| 8 | **Más trayectos** (por ejemplo, una segunda vuelta) | `js/config.js`, desde la línea 62 | Copiad un bloque `{ … }` entero, pegadlo debajo separado por una coma y cambiad los datos. Saldrá solo en la página Boda y en el formulario, y en la hoja aparecerá su columna «Plazas · Bus …». |
| 9 | Texto de la **pregunta del autobús** | `js/config.js`, línea 86 | Ahora dice «desde la iglesia hasta la finca», aunque también se puede elegir la vuelta. Ver SUGERENCIAS. |

**Cuidado:** el `id` de cada trayecto («Ida», «Vuelta») es el título de su columna en la hoja. No lo cambiéis cuando ya haya respuestas.

## Para confirmar

| # | Qué | Archivo y línea |
|---|---|---|
| 10 | **La Valenciana**: en Zamora hay dos heladerías con ese nombre, «Helados La Valenciana» (Av. de Portugal, 2) y «Valenciana Shock» (C. Renova, 15). El enlace lleva a la primera. ¿Es esa? | `js/config.js`, línea 178 |

## Opcional

| Qué | Archivo y línea |
|---|---|
| WhatsApp para recibir **también** una copia de cada respuesta | `js/config.js`, línea 43 (`'34600123456'`, sin «+» ni espacios) |
| Email para recibir **también** una copia de cada respuesta | `js/config.js`, línea 44 |

---

## Cómo actualizar la web después de un cambio

La web está en **https://bodalaurayjavi.github.io/** y se publica sola cada vez que se guarda un cambio en GitHub. No hace falta instalar nada: se hace desde el navegador.

1. Entrad en **https://github.com/bodalaurayjavi/bodalaurayjavi.github.io** con la cuenta de GitHub.
2. Pulsad la carpeta **`js`** y después el archivo **`config.js`**.
3. Arriba a la derecha del archivo, pulsad el **lápiz ✏️** («Edit this file»).
4. Buscad lo que queráis cambiar: **Ctrl+F** en Windows o **Cmd+F** en Mac, y escribid «PENDIENTE». Cambiad **solo lo que va entre comillas** `'…'`.
5. Arriba a la derecha, pulsad el botón verde **Commit changes…**. En «Commit message», escribid qué habéis cambiado (por ejemplo «Añadir IBAN») y pulsad **Commit changes**.
6. Esperad **1–2 minutos** y recargad la web. Si no veis el cambio, recargad forzando: Ctrl+Shift+R en Windows o Cmd+Shift+R en Mac. En el móvil, cerrad la pestaña y volved a abrirla.

**Si algo se rompe** (por ejemplo, la web sale en blanco), casi siempre es una coma o una comilla borrada sin querer:

1. En GitHub, abrid `config.js` y pulsad **History** (el reloj, arriba a la derecha).
2. Abrid el cambio anterior y comparad.
3. Corregid con el lápiz como antes, o pedid ayuda pasando el enlace del cambio.

Para ver si la publicación ha terminado, mirad la pestaña **Actions** del repositorio: un círculo verde ✓ significa que ya está publicada.
