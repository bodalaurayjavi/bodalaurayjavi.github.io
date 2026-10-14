# Sugerencias (no aplicadas)

> Cambios sobre el diseño ya aplicados a petición vuestra:
> - En los contactos solo aparece el botón «WhatsApp» (se quitó «Llamar»).
> - Hechas también: pregunta del autobús («¿Usarás el servicio de autobuses?»), aviso de privacidad bajo «Enviar», botones «Añadir al calendario» (preboda y ceremonia), fecha límite configurable, IBAN copiado sin espacios, mensajes al terminar la cuenta atrás, gris más oscuro en los teléfonos y foco del teclado dentro del menú.
> - Conoce Zamora tiene un mapa ilustrado (datos de OpenStreetMap) con los sitios numerados, y cada tarjeta lleva su número. La Esquina de Colás (Toro) queda fuera del mapa.

Cosas que he visto al pasar el diseño a producción. **No he cambiado ninguna**: la web está tal cual el diseño. Decidid vosotros si merece la pena hacer alguna.

## Contenido

1. **Niños.** El formulario permite un acompañante, pero no pregunta por niños ni por menú infantil. Si va a haber familias con hijos, conviene añadirlo.
2. **Dress code de la boda.** La preboda tiene dress code y la boda no. Si hay alguno (o ninguno en especial), los invitados lo agradecerán.
3. **Datos de relleno visibles.** Mientras falten el IBAN y los teléfonos, se ven «ES00 0000…» y «+34 6XX XXX XXX». Si se va a compartir la web antes de tenerlos, se podría ocultar ese bloque hasta que estén.

## Direcciones

4. **San Gil Plaza:** el diseño pone el código postal 49002; Google Maps da 49003.
5. **Doña Urraca:** la web oficial del hotel dice «Plaza La Puebla, 8» (lo que pone el diseño), pero Google Maps lo sitúa en «C. Puebla de Sanabria, 8». El enlace funciona igual porque usa el identificador del sitio. Solo lo comento por si algún invitado se lía con el nombre de la calle.

## Accesibilidad


## Formulario y privacidad

6. **Duplicados por nombre distinto.** La hoja reconoce a la misma persona por su nombre y apellidos. Si alguien escribe «Javi» una vez y «Javier» otra, saldrán dos filas. Si molesta, se podría mandar a cada invitado un enlace personal.

## Imágenes

7. **Mapas de los hoteles.** Son capturas de imágenes de satélite de Google Maps sin la atribución «© Google». Para una web privada de boda el riesgo es mínimo, pero lo correcto sería añadir un «Mapas: © Google» pequeño.

## Código heredado del diseño (para quien lo mantenga)

8. **Animación de aparición desactivada.** El diseño tenía preparada una aparición suave de cada bloque al hacer scroll, pero con los dos estados iguales, así que no hacía nada. La he quitado al limpiar el código. Si se quiere, se puede reactivar.
9. **Nombre de clase repetido.** `.tl` se usa a la vez para el timeline y para el teléfono de los contactos. Hoy no se nota, pero un cambio en uno podría afectar al otro. Convendría renombrar la del teléfono.
10. **Selector de tema claro/oscuro.** El diseño tenía estilos para forzar un tema, pero ningún botón para cambiarlo. He dejado que la web siga el ajuste del móvil o del ordenador.
