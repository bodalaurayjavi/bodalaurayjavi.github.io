# Sugerencias (no aplicadas)

> Cambios sobre el diseño ya aplicados a petición vuestra: en los contactos solo aparece el botón «WhatsApp» (se quitó «Llamar»).

Cosas que he visto al pasar el diseño a producción. **No he cambiado ninguna**: la web está tal cual el diseño. Decidid vosotros si merece la pena hacer alguna.

## Contenido

1. **Fecha límite para confirmar asistencia.** No aparece en ningún sitio. Una frase en la página del formulario («Confírmanos antes del 1 de abril») ayuda a que respondan a tiempo.
2. **Pregunta del autobús.** Dice «¿Harás uso del servicio de autobuses *desde la iglesia hasta la finca*?», pero entre las opciones también está la vuelta. Algo como «¿Usarás el servicio de autobuses?» encaja con los dos trayectos. Se cambia en `js/config.js` (`PREGUNTA_BUS`).
3. **Niños.** El formulario permite un acompañante, pero no pregunta por niños ni por menú infantil. Si va a haber familias con hijos, conviene añadirlo.
4. **Dress code de la boda.** La preboda tiene dress code y la boda no. Si hay alguno (o ninguno en especial), los invitados lo agradecerán.
5. **Cuenta atrás al llegar a cero.** Ahora se queda en «0 : 00 : 00 : 00». Podría mostrar «¡Hoy es el día!».
6. **«Añadir al calendario».** Un botón que guarde la preboda y la boda en el calendario del móvil.
7. **Datos de relleno visibles.** Mientras falten el IBAN y los teléfonos, se ven «ES00 0000…» y «+34 6XX XXX XXX». Si se va a compartir la web antes de tenerlos, se podría ocultar ese bloque hasta que estén.
8. **Copiar el IBAN sin espacios.** Algunas apps de banco no aceptan los espacios al pegar. El botón podría copiarlo sin espacios y la web seguir mostrándolo con ellos.

## Direcciones

9. **San Gil Plaza:** el diseño pone el código postal 49002; Google Maps da 49003.
10. **Doña Urraca:** la web oficial del hotel dice «Plaza La Puebla, 8» (lo que pone el diseño), pero Google Maps lo sitúa en «C. Puebla de Sanabria, 8». El enlace funciona igual porque usa el identificador del sitio. Solo lo comento por si algún invitado se lía con el nombre de la calle.

## Accesibilidad

11. **Contraste del teléfono en los contactos.** El gris de «+34 …» sobre el fondo beige de cada contacto tiene un contraste de 4,24:1, por debajo del 4,5:1 recomendado. Lighthouse lo marca, aunque la nota sigue siendo 96. Bastaría oscurecer un poco ese gris solo en ese sitio.
12. **Menú y teclado.** Con el menú abierto, al pasar del último enlace con el tabulador el foco sigue por la página de detrás, que está tapada por el velo. Mantenerlo dentro del menú mientras esté abierto es una mejora para quien navega sin ratón.

## Formulario y privacidad

13. **Datos de salud.** El formulario pregunta por alergias y embarazo. Son datos sensibles, así que propongo una línea debajo del botón «Enviar»: «Solo usaremos estas respuestas para organizar la boda». Y borrar la hoja después del evento.
14. **Duplicados por nombre distinto.** La hoja reconoce a la misma persona por su nombre y apellidos. Si alguien escribe «Javi» una vez y «Javier» otra, saldrán dos filas. Si molesta, se podría mandar a cada invitado un enlace personal.

## Imágenes

15. **Mapas de los hoteles.** Son capturas de imágenes de satélite de Google Maps sin la atribución «© Google». Para una web privada de boda el riesgo es mínimo, pero lo correcto sería añadir un «Mapas: © Google» pequeño.

## Código heredado del diseño (para quien lo mantenga)

16. **Animación de aparición desactivada.** El diseño tenía preparada una aparición suave de cada bloque al hacer scroll, pero con los dos estados iguales, así que no hacía nada. La he quitado al limpiar el código. Si se quiere, se puede reactivar.
17. **Nombre de clase repetido.** `.tl` se usa a la vez para el timeline y para el teléfono de los contactos. Hoy no se nota, pero un cambio en uno podría afectar al otro. Convendría renombrar la del teléfono.
18. **Selector de tema claro/oscuro.** El diseño tenía estilos para forzar un tema, pero ningún botón para cambiarlo. He dejado que la web siga el ajuste del móvil o del ordenador.
