# OPCIONES DE GUION PARA VIDEO AA2-EV01 (3 min)

**Evidencia:** GA11-220501098-AA2-EV01 — Informe de lecciones aprendidas en el proceso de verificación del software

**Programa:** Análisis y Desarrollo de Software — SENA

**Proyecto:** StreamPro

---

## CONTENIDO DEL DOCUMENTO

1. [Resumen del proceso de verificación](#resumen-del-proceso-de-verificación)
2. [Datos clave para cualquier opción](#datos-clave-para-cualquier-opción)
3. [Opción A — "De la teoría a la realidad"](#opción-a--de-la-teoría-a-la-realidad)
4. [Opción B — "Los 3 errores que me enseñaron más"](#opción-b--los-3-errores-que-me-enseñaron-más)
5. [Opción C — "Antes y después"](#opción-c--antes-y-después)
6. [Opción D — "Carta al yo del pasado" (Extra)](#opción-d--carta-al-yo-del-pasado-extra)
7. [Estructura para el documento escrito](#estructura-para-el-documento-escrito)

---

## Resumen del proceso de verificación

Se aplicaron los 4 instrumentos de calidad (F01-F04) sobre StreamPro:

- **F01 — Lista de Verificación:** 25 ítems evaluados → 72% de cumplimiento
- **F02 — Pruebas Funcionales:** 9 casos ejecutados → 100% exitosos
- **F03 — No Conformidad:** 10 hallazgos documentados (2 críticos, 2 altos, 4 medios, 2 bajos)
- **F04 — Matriz de Trazabilidad:** 28 requisitos contra componentes → 96.4%

Hallazgos destacados:
- Contraseña SMTP y token MercadoPago hardcodeados
- Conexión MySQL sin contraseña
- Rutas /home y /registerUser sin validación de sesión
- Secret de sesión débil
- **Bug crítico:** catch sin parámetro (home.js:98) — deja peticiones colgadas
- **Bug crítico:** variable `titulo` no definida (home.js:597) — ruta nunca funciona

---

## Datos clave para cualquier opción

Usa estos números y frases en cualquier versión del guion:

| Dato | Valor |
|---|---|
| Cumplimiento inicial | 72% |
| Cumplimiento después | 96% |
| Mejora | +24% |
| No conformidades | 10 |
| Bugs críticos | 2 |
| Pruebas funcionales | 9/9 exitosas |
| Archivos analizados | 12+ |

Frases útiles:
- "La funcionalidad no garantiza calidad"
- "Un programa puede funcionar y tener fugas de seguridad"
- "Verificar toma tiempo, pero no verificar cuesta más"
- "Los instrumentos de calidad son una red de seguridad"
- "Pasé de creer que estaba listo a saber que siempre hay algo que mejorar"

---

## Opción A — "De la teoría a la realidad"

**Enfoque:** Contraste entre lo que creías antes de verificar vs. lo que descubriste después.

**Tono:** Sincero, de descubrimiento personal.

---

### Toma 1 — Introducción (20 seg)

[Cámara: plano medio, fondo SENA o escritorio]

"Cuando terminé de desarrollar StreamPro, estaba convencido de que el proyecto estaba completo y funcionaba bien. Pero luego llegó el momento de aplicar los instrumentos de calidad, y lo que encontré me hizo cambiar completamente mi forma de pensar."

---

### Toma 2 — La dificultad (40 seg)

[Pantalla: mostrar el código abierto, señalando líneas específicas]

"Lo más difícil del proceso fue enfrentarme a los hallazgos críticos. Encontré contraseñas de Gmail en texto plano en `config/correo.js`, el token de MercadoPago visible en `config/mercadopago.js`, y la conexión a la base de datos sin contraseña en `config/conexion.js`. Pero lo que más me impactó fueron dos bugs que habían estado ahí, silenciosos, sin que nadie los notara: un bloque `catch` sin parámetro en la línea 98 de `home.js` que deja las peticiones colgadas para siempre, y una variable `titulo` que nunca fue definida en la línea 597, lo que hace que la ruta de búsqueda de temporadas nunca funcione."

---

### Toma 3 — La importancia (50 seg)

[Pantalla: mostrar los instrumentos F01, F02, F03, F04]

"Ahí entendí la importancia de los instrumentos de calidad. Sin la lista de verificación F01, esos errores habrían llegado a producción sin que nadie los detectara. Sin el formato de no conformidad F03, no habría documentado la causa raíz de cada problema. La matriz de trazabilidad F04 me permitió verificar que cada requisito del sistema estuviera cubierto. Descubrí que el proyecto tenía un 72% de cumplimiento en calidad, muy lejos del 100% que yo imaginaba."

---

### Toma 4 — Lo que aprendí (50 seg)

[Cámara: plano medio otra vez]

"¿Qué aprendí? Tres cosas. Primera: que un programa funcional no es lo mismo que un programa de calidad. StreamPro corría, pero tenía vulnerabilidades graves. Segunda: que documentar los hallazgos con su solución es tan importante como corregirlos, porque permite que otros aprendan de esos errores. Y tercera: que la mejora es continua. Pasamos del 72% al 96% de cumplimiento, pero aún hay trabajo por hacer: sesiones sin expiración, APIs sin autenticación, y deuda técnica que resolver."

---

### Toma 5 — Cierre (20 seg)

[Cámara: plano medio]

"Hoy sé que verificar no es un paso opcional. Es lo que separa un proyecto amateur de un producto profesional. Mi nombre es [tu nombre], evidencia GA11-220501098-AA2-EV01. Gracias."

---

**Duración total:** ~3 min

---

## Opción B — "Los 3 errores que me enseñaron más"

**Enfoque:** Tres lecciones concretas basadas en hallazgos reales del código.

**Tono:** Técnico pero accesible, estructurado, didáctico.

---

### Toma 1 — Introducción (15 seg)

[Cámara: plano medio]

"Hoy quiero compartirles las tres lecciones más importantes que aprendí al verificar la calidad de StreamPro, mi proyecto de plataforma de streaming."

---

### Toma 2 — Lección 1: Seguridad (50 seg)

[Pantalla: mostrar config/correo.js y config/mercadopago.js]

"Lección número uno: nunca hardcodees credenciales, ni siquiera en proyectos de clase. En StreamPro encontré la contraseña SMTP de Gmail, el token de acceso de MercadoPago y el secret de sesión, todos escritos directamente en el código. En seguridad solo cumplíamos al 40%. La solución fue mover todo a variables de entorno, pero el daño conceptual ya estaba hecho: aprendí que la seguridad no es una característica, es una disciplina que se practica desde la primera línea de código."

---

### Toma 3 — Lección 2: Bugs silenciosos (55 seg)

[Pantalla: mostrar home.js líneas 98 y 597]

"Lección número dos: los bugs más peligrosos son los que no se ven. En `home.js` línea 98 hay un bloque `catch` que no recibe el parámetro `error`. Si ocurre una excepción, en lugar de responder con un JSON, el servidor intenta usar `error` que no existe, y la petición queda colgada para siempre. Y en la línea 597, la variable `titulo` se usa sin haber sido definida. La línea que la define está comentada desde hace quién sabe cuánto tiempo. Estos errores no tiran el servidor, pero rompen funcionalidades enteras sin que nadie lo note hasta que un usuario las reporta."

---

### Toma 4 — Lección 3: Los instrumentos importan (50 seg)

[Pantalla: mostrar los 4 formatos diligenciados]

"Lección número tres: los instrumentos de calidad no son papeleo, son una red de seguridad. La lista de verificación F01 me obligó a revisar cada aspecto del código. Las pruebas funcionales F02 me confirmaron que las features operan correctamente. El formato de no conformidad F03 me ayudó a documentar cada hallazgo con su causa raíz y solución. Y la matriz de trazabilidad F04 me aseguró que ningún requisito quedó sin implementar. Sin estos formatos, mi evaluación habría sido subjetiva e incompleta."

---

### Toma 5 — Cierre (10 seg)

[Cámara: plano medio]

"Con los instrumentos pasamos de 72% a 96%. Pero lo más valioso no es el número, es el hábito de verificar."

---

**Duración total:** ~3 min

---

## Opción C — "Antes y después"

**Enfoque:** Transformación personal como desarrollador, desde la confianza inicial hasta la conciencia de calidad.

**Tono:** Reflexivo, narrativo, de crecimiento personal.

---

### Toma 1 — El antes (25 seg)

[Cámara: plano medio]

"Cuando terminé StreamPro, estaba orgulloso. El proyecto funcionaba, las vistas se renderizaban, los usuarios podían registrarse e iniciar sesión. En mi cabeza, el proyecto estaba listo para entregar. No fue hasta que apliqué los instrumentos de calidad que me di cuenta de lo equivocado que estaba."

---

### Toma 2 — La dificultad (40 seg)

[Pantalla: mostrar la lista de hallazgos]

"La mayor dificultad fue emocional y técnica al mismo tiempo. Emocional porque tuve que aceptar que mi código tenía fallas graves que había pasado por alto durante semanas. Técnica porque documentar cada no conformidad requería entender no solo qué estaba mal, sino por qué y cómo solucionarlo. Categorizar la severidad de cada hallazgo también fue un reto: ¿qué es crítico? ¿qué es solo una mejora? Aprendí a diferenciar usando el impacto en el usuario y el riesgo de seguridad."

---

### Toma 3 — El proceso (50 seg)

[Pantalla: mostrar los instrumentos]

"El proceso fue: primero apliqué la lista de verificación F01 y obtuve un 72%. Luego ejecuté las pruebas funcionales F02, que sorprendentemente pasaron todas al 100% —y eso fue otra lección: las pruebas funcionales no detectan problemas de seguridad. Después documenté cada hallazgo en el F03 con su causa raíz. Y finalmente usé la matriz F04 para verificar requisitos. Cada instrumento me dio una perspectiva diferente del mismo proyecto."

---

### Toma 4 — El después (50 seg)

[Cámara: plano medio]

"Después del proceso, mi mentalidad cambió. Ahora cuando escribo código me pregunto: ¿esto qué pasa si falla? ¿Estoy exponiendo datos sensibles? ¿Alguien más va a entender este código? Aprendí que la calidad no es un destino, es un proceso continuo. Incluso después de los ajustes, llegamos al 96%, no al 100%. Siempre hay margen para mejorar. Pero ese 96% me da la tranquilidad de que el producto es sólido."

---

### Toma 5 — Cierre (15 seg)

[Cámara: plano medio]

"Hoy no entrego un proyecto sin antes verificar su calidad. Eso es lo más valioso que me llevo de este proceso."

---

**Duración total:** ~3 min

---

## Opción D — "Carta al yo del pasado" (Extra)

**Enfoque:** Formato de carta o mensaje dirigido a ti mismo antes de empezar el proceso de verificación.

**Tono:** Personal, honesto, casi conversacional.

---

### Toma 1 — Apertura (15 seg)

[Cámara: plano medio]

"Si pudiera enviarle un mensaje a mi yo de hace unas semanas, cuando terminó StreamPro y creía que todo estaba bien, le diría esto:"

---

### Toma 2 — Lo que no sabías (45 seg)

[Pantalla: mostrar código con los bugs]

"No sabías que en `home.js` hay un catch que no atrapa el error correctamente. No sabías que la ruta de búsqueda de temporadas usa una variable que no existe. No sabías que tus credenciales de Gmail y MercadoPago están en texto plano. No sabías que cualquiera con acceso al repositorio tiene la clave de tu base de datos. Todo esto pasó desapercibido porque nunca te sentaste a verificar metódicamente."

---

### Toma 3 — Lo que aprenderás (50 seg)

[Pantalla: mostrar instrumentos F01 a F04]

"Pero vas a aprender algo valioso: que existen instrumentos de calidad diseñados para evitar exactamente esto. Una lista de verificación de 25 ítems. Un formato de pruebas funcionales con 9 casos. Un registro de no conformidad para documentar cada hallazgo. Una matriz de trazabilidad para cruzar requisitos con componentes. Cuando termines de usarlos, tu proyecto pasará de 72% a 96% de cumplimiento."

---

### Toma 4 — El cambio (50 seg)

[Cámara: plano medio]

"Y lo más importante: vas a dejar de pensar como alguien que solo escribe código para empezar a pensar como alguien que construye productos. Vas a entender que la verificación no es un trámite, es una herramienta que te hace mejor desarrollador. Vas a dejar de confiar en la intuición y vas a empezar a confiar en los datos. Eso es lo que realmente cambia cuando aplicas instrumentos de calidad."

---

### Toma 5 — Cierre (20 seg)

[Cámara: plano medio]

"Al final, no importa cuántos errores encuentres. Importa que aprendas a encontrarlos antes de que tus usuarios lo hagan. Mi nombre es [tu nombre], evidencia GA11-220501098-AA2-EV01."

---

**Duración total:** ~3 min

---

## Estructura para el documento escrito

Además del video, necesitas entregar el **Informe de Lecciones Aprendidas** (documento). Aquí tienes la estructura propuesta:

```
Título: INFORME DE LECCIONES APRENDIDAS — PROCESO DE VERIFICACIÓN DE SOFTWARE
Código: GA11-220501098-AA2-EV01
Programa: Análisis y Desarrollo de Software
Aprendiz: David Caicedo
Ficha: 3070420
Fecha: [fecha]

---

TABLA DE CONTENIDO

1. INTRODUCCIÓN
   1.1 Contexto del proyecto StreamPro
   1.2 Objetivo del informe

2. DESCRIPCIÓN DEL PROCESO DE VERIFICACIÓN
   2.1 Instrumentos utilizados (F01, F02, F03, F04)
   2.2 Metodología aplicada
   2.3 Alcance de la verificación

3. DIFICULTADES ENFRENTADAS
   3.1 Identificación de hallazgos críticos ocultos
   3.2 Clasificación de severidad de no conformidades
   3.3 Documentación de causa raíz
   3.4 Gestión del tiempo entre verificación y documentación

4. IMPORTANCIA DEL PROCESO DE VERIFICACIÓN
   4.1 Detección temprana de errores
   4.2 Mitigación de riesgos de seguridad
   4.3 Garantía de cumplimiento de requisitos
   4.4 Mejora de la calidad del producto final

5. LECCIONES APRENDIDAS
   5.1 Lección 1: La funcionalidad no garantiza calidad
   5.2 Lección 2: Los bugs silenciosos son los más peligrosos
   5.3 Lección 3: Los instrumentos de calidad son una red de seguridad
   5.4 Lección 4: Documentar es tan importante como corregir
   5.5 Lección 5: La mejora es continua (nunca se llega al 100%)
   5.6 Lección 6: Las pruebas funcionales no detectan problemas de seguridad

6. COMPARATIVA ANTES-DESPUÉS
   6.1 Resultados iniciales (72%)
   6.2 Resultados después de ajustes (96%)
   6.3 Hallazgos críticos corregidos

7. APLICACIÓN FUTURA
   7.1 Cómo aplicar estas lecciones en próximos proyectos
   7.2 Incorporación de verificaciones en el flujo de trabajo

8. CONCLUSIONES

9. RECOMENDACIONES

FIRMAS

---

ANEXOS
- Anexo 1: Enlace al video de lecciones aprendidas
```

---

## Checklist antes de grabar

- [ ] Elegir opción de guion (A, B, C o D)
- [ ] Reemplazar `[tu nombre]` con tu nombre real
- [ ] Tener abiertos los archivos de código para mostrar en pantalla
- [ ] Tener abiertos los instrumentos diligenciados (F01-F04)
- [ ] Mencionar el código de evidencia: GA11-220501098-AA2-EV01
- [ ] Mostrar logo SENA al inicio
- [ ] Grabar en un lugar con buena iluminación y sin ruido
- [ ] Hablar pausado y claro
- [ ] Cronometrar para no exceder 3 minutos

---

*Documento preparado como apoyo para la evidencia GA11-220501098-AA2-EV01 — Programa Análisis y Desarrollo de Software — SENA 2026*
