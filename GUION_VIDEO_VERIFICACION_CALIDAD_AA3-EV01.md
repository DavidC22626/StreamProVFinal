# GUION DE VIDEO — VERIFICACIONES DE CONDICIONES DE CALIDAD DEL PRODUCTO DE SOFTWARE AJUSTADO

**Evidencia:** GA11-220501098-AA3-EV01 — Documento con las verificaciones de condiciones de calidad del producto de software ajustado

**Duración estimada:** 7-8 minutos

**Formato:** Video expositivo mostrando el informe de verificaciones de calidad

---

## INSTRUCCIONES PARA LA GRABACIÓN

- Use un tono formal y técnico, apropiado para una exposición de resultados de calidad
- Muestre el informe en pantalla mientras lo explica
- Incluya capturas del código antes (con el problema) y después (con el ajuste)
- Muestre los instrumentos F01, F02, F03 diligenciados
- Concluya con una tabla comparativa clara

---

## ESTRUCTURA DEL VIDEO

---

### ESCENA 1 — INTRODUCCIÓN (30 segundos)

`
[Pantalla: Logo SENA + título "Verificación de Condiciones de Calidad — StreamPro"]

NARRADOR:
"Buenos días. Mi nombre es [tu nombre], aprendiz del programa Análisis y Desarrollo
de Software del SENA. En este video presentaré el informe de verificaciones de
condiciones de calidad del producto de software ajustado StreamPro, correspondiente
a la evidencia GA11-220501098-AA3-EV01.

Este informe documenta cómo, partiendo de los instrumentos de calidad diseñados
en la evidencia AA1-EV01, identificamos hallazgos en el código, aplicamos
ajustes correctivos, y volvimos a verificar para asegurar que el producto
cumple con las condiciones de calidad requeridas."

[Mostrar: portada del informe]
`

---

### ESCENA 2 — HALLAZGOS IDENTIFICADOS (1 minuto 30 segundos)

`
[Pantalla: tabla de no conformidades]

NARRADOR:
"En la evaluación inicial aplicamos la Lista de Verificación de Calidad F01
y el Registro de No Conformidad F03 sobre el código fuente de StreamPro.
Identificamos 10 hallazgos, de los cuales 2 fueron de severidad Crítica,
2 de severidad Alta, 4 de severidad Media y 2 de severidad Baja.

Los hallazgos más críticos fueron:

1. NC-001: La contraseña SMTP de Gmail estaba hardcodeada en config/correo.js
2. NC-002: El token de acceso de MercadoPago estaba visible en config/mercadopago.js

[Mostrar fragmentos de código con los problemas resaltados en rojo]

También encontramos:
- Conexión MySQL sin contraseña (NC-003)
- Rutas /home y /registerUser sin validación de sesión (NC-004, NC-005)
- URL base fija como localhost (NC-006)
- Secret de sesión débil (NC-008)
- Y otros hallazgos menores...

El resultado inicial fue un cumplimiento general del 72%, con seguridad al 40%."

[Mostrar: gráfico o tabla con resultados iniciales]
`

---

### ESCENA 3 — AJUSTES REALIZADOS (2 minutos)

`
[Pantalla: tabla resumen de ajustes]

NARRADOR:
"A partir de estos hallazgos, procedimos a realizar los ajustes necesarios.
Los cambios más importantes fueron:

Para NC-001 y NC-002, movimos todas las credenciales sensibles —SMTP,
MercadoPago y base de datos— a variables de entorno. Esto significa que
los archivos de configuración ahora leen de process.env en lugar de
tener valores fijos en texto plano.

[MOSTAR EN PANTALLA: código antes (rojo) vs después (verde)]

Para NC-004 y NC-005, agregamos validación de sesión en las rutas
/home y /registerUser. Si un usuario no tiene sesión activa, se redirige
al login. Esto evita accesos no autorizados.

Para NC-008, cambiamos el secret de sesión de 'acceso_app' a un valor
generado aleatoriamente con crypto.randomBytes, y lo hicimos configurable
por variable de entorno.

Para NC-009, eliminamos el almacenamiento de contraseñas en la sesión,
tanto para usuarios como para administradores.

Y finalmente, para NC-010 agregamos el script 'start' en el package.json,
necesario para el despliegue en producción."

[Mostrar: cada ajuste con su comparativa antes/después]
`

---

### ESCENA 4 — RE-VERIFICACIÓN (1 minuto 30 segundos)

`
[Pantalla: F01 post-ajustes diligenciado]

NARRADOR:
"Una vez aplicados todos los ajustes, ejecutamos nuevamente la Lista de
Verificación F01 sobre el código modificado.

Los resultados fueron los siguientes:
- Calidad del Código: subió de 62.5% a 100%
- Funcionalidad: subió de 87.5% a 100%
- Seguridad: subió de 40% a 80%
- Interfaz de Usuario: se mantuvo en 100%

[MOSTAR EN PANTALLA: tabla comparativa antes vs después]

Además, ejecutamos los 9 casos de prueba del Formato F02.
TODOS fueron exitosos. El registro de usuarios, el inicio de sesión,
la visualización del catálogo, la reproducción de video, las operaciones
CRUD del administrador, el proceso de pago con MercadoPago y la
recuperación de contraseña funcionaron al 100%."

[Mostrar: capturas de las pruebas exitosas]
`

---

### ESCENA 5 — RESULTADOS (1 minuto)

`
[Pantalla: gráficos de resultados]

NARRADOR:
"Los resultados finales de la verificación son contundentes:

El cumplimiento general pasó del 72% al 96%, una mejora del 24%.
De las 10 no conformidades identificadas, 9 fueron corregidas —un 90%—.
La única pendiente es la configuración del tiempo de expiración de sesión,
que queda como mejora para una siguiente iteración.

Las 9 pruebas funcionales fueron exitosas, dando un 100% de efectividad.

En cuanto a las dimensiones de calidad evaluadas:
- Funcionalidad: Excelente (100%)
- Seguridad: Buena (80%)
- Mantenibilidad: Excelente
- Usabilidad: Excelente
- Confiabilidad: Buena"

[Mostrar: estrella de calificación o tabla de dimensiones]
`

---

### ESCENA 6 — CONCLUSIONES (45 segundos)

`
[Pantalla: lista de conclusiones]

NARRADOR:
"Podemos concluir que:

Primero, el producto ajustado tiene un nivel de madurez ALTO,
con un 96% de cumplimiento general.

Segundo, la seguridad fue la dimensión que más mejoró, pasando
del 40% al 80%, gracias a la externalización de todas las credenciales.

Tercero, el 100% de las funcionalidades críticas fueron verificadas
y funcionan correctamente.

Y cuarto, StreamPro versión 1.0.0 ajustada está en condiciones
de calidad adecuadas para su operación en entornos controlados."

[Mostrar: resumen visual con los logros]
`

---

### ESCENA 7 — CIERRE (30 segundos)

`
[Pantalla: datos del proyecto y SENA]

NARRADOR:
"En resumen, este informe demuestra que la aplicación sistemática
de instrumentos de calidad, seguida de ajustes correctivos y una
re-verificación rigurosa, permite elevar significativamente la
calidad del producto de software.

Mi nombre es [tu nombre], esto fue para la evidencia
GA11-220501098-AA3-EV01 del programa Análisis y Desarrollo de Software.
Muchas gracias."

[Pantalla final: SENA — Servicio Nacional de Aprendizaje, 2026]
`

---

## ANEXO: CHECKLIST DE GRABACIÓN

| Aspecto | Sí | No |
|---|---|---|
| ¿El video inicia con logo del SENA? | | |
| ¿Se menciona el código GA11-220501098-AA3-EV01? | | |
| ¿Se muestran los hallazgos iniciales (NC-001 a NC-010)? | | |
| ¿Se muestra código antes (rojo) y después (verde)? | | |
| ¿Se muestran los instrumentos F01 y F02 diligenciados? | | |
| ¿Se presenta la tabla comparativa antes vs. después? | | |
| ¿Se muestran capturas de las pruebas funcionales? | | |
| ¿El audio es claro y sin ruido de fondo? | | |
| ¿La duración total está entre 7 y 8 minutos? | | |
| ¿El cierre incluye los datos del aprendiz y programa? | | |

---

*Guion elaborado como parte de la evidencia GA11-220501098-AA3-EV01 del programa Análisis y Desarrollo de Software — SENA 2026*
