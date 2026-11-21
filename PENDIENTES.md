# Cómo cambiar la web

La web está en **https://bodalaurayjavi.github.io/** y es un solo archivo: **`index.html`**. Lleva las fotos dentro, por eso pesa unos 4 MB.

Los datos que más se cambian están todos juntos al principio del código, en el bloque **`var CONFIG = { … }`** (hacia la línea 991 de `index.html`). Para encontrarlo, buscad **`var CONFIG`** con Ctrl+F (Windows) o Cmd+F (Mac).

## Qué hay en `var CONFIG`

| Dato | Qué es | Valor actual |
|---|---|---|
| `emailRespuestas` | Correo que sale en el botón «Enviar por email» de la pantalla de gracias. | `familiagironescid@gmail.com` |
| `web3formsKey` | Clave de Web3Forms. Con ella, las respuestas del formulario llegan solas a familiagironescid@gmail.com al pulsar «Enviar». **No la borréis.** | `3ecbced9-…` |
| `whatsappRespuestas` | WhatsApp para el botón «Enviar por WhatsApp» (con prefijo, sin «+» ni espacios: `'34600123456'`). Vacío = se usa el teléfono de Laura. | vacío |
| `iban` | Número de cuenta que se ve y se copia en la web. | `ES24 0081 5342 3100 0147 1948` |
| `contactos` | Nombre y teléfono de Laura y de Javier. | Laura: +34 620 456 941 · Javier: +34 608 075 973 |
| `formUrl` | Solo si algún día queréis usar un formulario externo (Google Forms, Typeform…) en lugar del de la web. | vacío |

Cambiad **solo lo que va entre comillas** `'…'` y no borréis las comas del final de cada línea.

Otros textos (horarios del autobús, hoteles, sitios de Zamora…) están escritos directamente más abajo en `index.html`. Buscadlos con Ctrl+F / Cmd+F por una palabra que aparezca en la web.

## Las respuestas del formulario

- Cuando un invitado pulsa **Enviar**, el resumen llega a **familiagironescid@gmail.com** con el asunto «Confirmación boda · Nombre Apellidos». El invitado ve «¡Recibido! Ya nos han llegado tus respuestas.».
- Si el envío falla (sin conexión, Web3Forms caído…), el invitado ve botones para mandarlo por WhatsApp, por email o copiarlo.
- Lo gestiona **Web3Forms** (web3forms.com), con la cuenta de familiagironescid@gmail.com. El plan gratuito tiene un límite mensual de envíos de sobra para una boda.
- Si alguna respuesta va a Spam, marcadla como «No es spam» para que las siguientes lleguen a la bandeja de entrada.

## Cómo actualizar la web después de un cambio

Se publica sola cada vez que se guarda un cambio en GitHub. No hace falta instalar nada: se hace desde el navegador.

1. Entrad en **https://github.com/bodalaurayjavi/bodalaurayjavi.github.io** con la cuenta de GitHub.
2. Pulsad el archivo **`index.html`**.
3. Arriba a la derecha del archivo, pulsad el **lápiz ✏️** («Edit this file»). Como el archivo es grande, puede tardar unos segundos en abrirse.
4. Buscad lo que queráis cambiar con **Ctrl+F** (Windows) o **Cmd+F** (Mac), por ejemplo `var CONFIG`. Cambiad **solo lo que va entre comillas** `'…'`.
5. Arriba a la derecha, pulsad el botón verde **Commit changes…**. En «Commit message», escribid qué habéis cambiado (por ejemplo «Cambiar horario autobús») y pulsad **Commit changes**.
6. Esperad **1–2 minutos** y recargad la web. Si no veis el cambio, recargad forzando: Ctrl+Shift+R en Windows o Cmd+Shift+R en Mac. En el móvil, cerrad la pestaña y volved a abrirla.

**Importante:** no toquéis las líneas larguísimas que contienen `data:image/jpeg;base64,…`: son las fotos. Si se borra un trozo, esa foto deja de verse.

**Si algo se rompe** (por ejemplo, la web sale en blanco), casi siempre es una coma o una comilla borrada sin querer:

1. En GitHub, abrid `index.html` y pulsad **History** (el reloj, arriba a la derecha).
2. Abrid el cambio anterior y comparad.
3. Corregid con el lápiz como antes, o pedid ayuda pasando el enlace del cambio.

Para ver si la publicación ha terminado, mirad la pestaña **Actions** del repositorio: un círculo verde ✓ significa que ya está publicada.

## Archivos antiguos

Las carpetas `css/`, `js/`, `img/`, `fonts/`, `cal/` y `apps-script/`, y el archivo `SUGERENCIAS.md`, son de la versión anterior de la web. La web actual no los usa. Se pueden dejar o borrar; si se borran, siguen en el historial de GitHub.
