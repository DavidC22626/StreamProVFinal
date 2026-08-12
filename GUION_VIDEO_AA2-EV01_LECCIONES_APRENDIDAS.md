# GUION — LECCIONES APRENDIDAS EN VERIFICACIÓN DE SOFTWARE (3 min)

**Evidencia:** GA11-220501098-AA2-EV01

**Programa:** Análisis y Desarrollo de Software — SENA

**Proyecto:** StreamPro

**Enfoque:** Opción A — "De la teoría a la realidad"

---

### Toma 1 — Introducción (20 seg)

**[Cámara: plano medio, fondo SENA o escritorio. Tono sincero.]**

"Cuando terminé de desarrollar StreamPro, estaba convencido de que el proyecto estaba completo y funcionaba bien. Pero luego llegó el momento de aplicar los instrumentos de calidad, y lo que encontré me hizo cambiar completamente mi forma de pensar."

---

### Toma 2 — La dificultad (40 seg)

**[Pantalla: mostrar el código abierto, señalando líneas específicas]**

"Lo más difícil del proceso fue enfrentarme a los hallazgos críticos. Encontré contraseñas de Gmail en texto plano en `config/correo.js`, el token de MercadoPago visible en `config/mercadopago.js`, y la conexión a la base de datos sin contraseña en `config/conexion.js`. Pero lo que más me impactó fueron dos bugs que habían estado ahí, silenciosos, sin que nadie los notara: un bloque `catch` sin parámetro en la línea 98 de `home.js` que deja las peticiones colgadas para siempre, y una variable `titulo` que nunca fue definida en la línea 597, lo que hace que la ruta de búsqueda de temporadas nunca funcione."

---

### Toma 3 — La importancia (50 seg)

**[Pantalla: mostrar los instrumentos F01, F02, F03, F04]**

"Ahí entendí la importancia de los instrumentos de calidad. Sin la lista de verificación F01, esos errores habrían llegado a producción sin que nadie los detectara. Sin el formato de no conformidad F03, no habría documentado la causa raíz de cada problema. La matriz de trazabilidad F04 me permitió verificar que cada requisito del sistema estuviera cubierto. Descubrí que el proyecto tenía un 72% de cumplimiento en calidad, muy lejos del 100% que yo imaginaba."

---

### Toma 4 — Lo que aprendí (50 seg)

**[Cámara: plano medio otra vez]**

"¿Qué aprendí? Tres cosas. Primera: que un programa funcional no es lo mismo que un programa de calidad. StreamPro corría, pero tenía vulnerabilidades graves. Segunda: que documentar los hallazgos con su solución es tan importante como corregirlos, porque permite que otros aprendan de esos errores. Y tercera: que la mejora es continua. Pasamos del 72% al 96% de cumplimiento, pero aún hay trabajo por hacer: sesiones sin expiración, APIs sin autenticación, y deuda técnica que resolver."

---

### Toma 5 — Cierre (20 seg)

**[Cámara: plano medio]**

"Hoy sé que verificar no es un paso opcional. Es lo que separa un proyecto amateur de un producto profesional. Mi nombre es [tu nombre], evidencia GA11-220501098-AA2-EV01. Gracias."

---

**Duración total aproximada:** 3 minutos

---

## Checklist pre-grabación

- [ ] Reemplazar `[tu nombre]` con tu nombre real
- [ ] Mostrar logo SENA al inicio
- [ ] Tener abierto `config/correo.js`, `config/mercadopago.js`, `config/conexion.js` para Toma 2
- [ ] Tener abierto `home.js` líneas 98 y 597 para Toma 2
- [ ] Tener abiertos los 4 instrumentos diligenciados (F01 a F04) para Toma 3
- [ ] Mencionar el código de evidencia al final
- [ ] Cronometrar ensayo para no exceder 3 min
- [ ] Hablar pausado, hacer pausas entre tomas
