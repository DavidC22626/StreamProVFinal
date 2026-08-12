# INFORME DE LECCIONES APRENDIDAS — PROCESO DE VERIFICACIÓN DE SOFTWARE

**Evidencia:** GA11-220501098-AA2-EV01

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

**Aprendiz:** David Caicedo

**Ficha:** 3070420

---

## TABLA DE CONTENIDO

1. [Introducción](#1-introducción)
2. [Descripción del proceso de verificación](#2-descripción-del-proceso-de-verificación)
3. [Dificultades enfrentadas](#3-dificultades-enfrentadas)
4. [Importancia del proceso de verificación](#4-importancia-del-proceso-de-verificación)
5. [Lecciones aprendidas](#5-lecciones-aprendidas)
6. [Comparativa antes-después](#6-comparativa-antes-después)
7. [Aplicación futura](#7-aplicación-futura)
8. [Conclusiones](#8-conclusiones)
9. [Recomendaciones](#9-recomendaciones)

---

## 1. Introducción

### 1.1 Contexto del proyecto StreamPro

StreamPro es una plataforma de streaming de contenido audiovisual desarrollada como proyecto formativo del programa Análisis y Desarrollo de Software del SENA. El proyecto incluye módulos de autenticación de usuarios y administradores, catálogo de películas y series, reproductor de video, suscripciones con MercadoPago, recuperación de contraseña y panel de administración CRUD.

### 1.2 Objetivo del informe

Documentar las experiencias, dificultades, hallazgos y aprendizajes obtenidos durante el proceso de verificación de calidad del software aplicando los instrumentos GFPI-F-135 V02 (F01 a F04). Este informe complementa el video de lecciones aprendidas de la evidencia AA2-EV01.

---

## 2. Descripción del proceso de verificación

### 2.1 Instrumentos utilizados

Se aplicaron cuatro instrumentos de calidad sobre el código fuente y funcionalidad de StreamPro:

| Instrumento | Propósito | Ítems |
|---|---|---|
| **F01 — Lista de Verificación de Calidad** | Evaluar cumplimiento de calidad en código, funcionalidad, seguridad e interfaz | 25 ítems |
| **F02 — Formato de Pruebas Funcionales** | Verificar que cada funcionalidad opere correctamente | 9 casos de prueba |
| **F03 — Registro de No Conformidad** | Documentar hallazgos que no cumplen con los estándares | 10 hallazgos |
| **F04 — Matriz de Trazabilidad de Requisitos** | Cruzar requisitos del sistema contra componentes implementados | 28 requisitos |

### 2.2 Metodología aplicada

El proceso se desarrolló en cuatro fases:

1. **Revisión de código fuente:** Se analizaron los archivos principales (`app.js`, rutas, configuraciones, vistas, JavaScript del frontend) buscando malas prácticas, errores y vulnerabilidades.
2. **Ejecución de pruebas funcionales:** Se probaron manualmente las 9 funcionalidades críticas del sistema.
3. **Documentación de hallazgos:** Cada no conformidad fue registrada con su causa raíz, severidad y acción correctiva.
4. **Verificación de requisitos:** Se cruzaron los 28 requisitos del sistema contra los componentes implementados.

### 2.3 Alcance de la verificación

La verificación cubrió los siguientes módulos:

- Autenticación (login, registro, recuperación de contraseña)
- Catálogo de contenido (películas y series)
- Reproductor de video
- Panel de administración (CRUD)
- Sistema de suscripciones
- Configuración del servidor y base de datos
- Seguridad de sesiones y almacenamiento de credenciales

---

## 3. Dificultades enfrentadas

### 3.1 Identificación de hallazgos críticos ocultos

La principal dificultad fue detectar errores que no se manifiestan visualmente. El proyecto funcionaba sin errores aparentes, pero al inspeccionar el código línea por línea se descubrieron dos bugs críticos:

- **Catch sin parámetro en home.js:98:** El bloque `catch { console.error("Error:", error); }` no declara el parámetro `error`, por lo que cualquier excepción en ese bloque lanza un `ReferenceError` que deja la petición colgada.
- **Variable no definida en home.js:597:** La variable `titulo` se usa en un `console.log` y posible lógica posterior, pero nunca fue declarada la línea que la define está comentada desde una iteración anterior.

Estos bugs no producían errores en consola ni afectaban el funcionamiento general del servidor, por lo que pasaron desapercibidos durante el desarrollo.

### 3.2 Clasificación de severidad de no conformidades

Otra dificultad fue categorizar correctamente la severidad de cada hallazgo. Se requirió criterio para diferenciar entre:

- **Crítico:** Credenciales hardcodeadas que exponen datos sensibles
- **Alto:** Conexión sin autenticación, rutas sin validación de sesión
- **Medio:** URL hardcodeada, secret débil, manejo inconsistente de errores
- **Bajo:** Contraseña en sesión, falta de script start

### 3.3 Documentación de causa raíz

Para cada no conformidad se aplicó la técnica de los "5 porqués" para identificar la causa raíz. Esto requirió un análisis profundo del código y las decisiones de diseño tomadas durante el desarrollo.

### 3.4 Gestión del tiempo

El proceso de verificación completo (revisión de código, pruebas, documentación en 4 instrumentos) tomó más tiempo del estimado inicialmente, debido a la cantidad de archivos y la necesidad de rastrear cada hallazgo hasta su origen.

---

## 4. Importancia del proceso de verificación

### 4.1 Detección temprana de errores

La verificación permitió detectar errores que de otra forma habrían llegado a producción. Los dos bugs críticos encontrados en `home.js` (catch sin parámetro y variable no definida) son errores que ningún test funcional detectaría porque no impiden que el servidor inicie.

### 4.2 Mitigación de riesgos de seguridad

Se identificaron vulnerabilidades graves:

| Riesgo | Hallazgo | Impacto potencial |
|---|---|---|
| Exposición de credenciales SMTP | Contraseña en texto plano en `config/correo.js` | Acceso no autorizado al correo del proyecto |
| Exposición de token de pagos | Token MercadoPago en `config/mercadopago.js` | Fraude financiero |
| Acceso no autorizado a BD | Conexión MySQL sin contraseña en `config/conexion.js` | Robo o modificación de datos |
| Suplantación de sesión | Secret "acceso_app" predecible en `app.js:17` | Secuestro de sesiones |
| Acceso sin autenticación | Rutas /home y APIs sin validación de sesión | Operaciones no autorizadas |

### 4.3 Garantía de cumplimiento de requisitos

La matriz de trazabilidad F04 permitió verificar que los 28 requisitos del sistema tuvieran su correspondiente implementación en el código, identificando brechas de cobertura.

### 4.4 Mejora de la calidad del producto final

La verificación no solo identificó problemas, sino que estableció una línea base de calidad (72%) contra la cual medir mejoras futuras. Después de los ajustes, el cumplimiento alcanzó el 96%, demostrando la efectividad del proceso.

---

## 5. Lecciones aprendidas

### 5.1 Lección 1: La funcionalidad no garantiza calidad

**Lo que creía antes:** "Si el programa funciona y no se cae, está bien."

**Lo que aprendí:** Un programa puede ejecutarse correctamente y al mismo tiempo tener vulnerabilidades de seguridad graves, malas prácticas de programación y errores silenciosos que comprometen su confiabilidad.

**Evidencia concreta:** StreamPro funcionaba sin errores visibles, pero tenía credenciales hardcodeadas, rutas sin autenticación y dos bugs que rompían funcionalidades enteras sin mostrar errores en pantalla.

### 5.2 Lección 2: Los bugs silenciosos son los más peligrosos

**Lo que creía antes:** "Si hay un error grave, el programa me lo va a mostrar."

**Lo que aprendí:** Los errores más peligrosos no son los que lanzan excepciones visibles, sino los que quedan silenciosos en el código. Un `catch` sin parámetro y una variable no definida no impiden que el servidor inicie, pero hacen que ciertas rutas nunca funcionen correctamente.

**Evidencia concreta:** `home.js:98` (catch sin parámetro) y `home.js:597` (variable `titulo` no definida). Ambos errores pasaron desapercibidos por semanas.

### 5.3 Lección 3: Los instrumentos de calidad son una red de seguridad

**Lo que creía antes:** "Los formatos de calidad son papeleo administrativo."

**Lo que aprendí:** Cada instrumento tiene un propósito específico y complementario. La lista de verificación da el panorama general, las pruebas funcionales validan la operación, el registro de no conformidades documenta problemas con solución y la matriz de trazabilidad asegura que ningún requisito quede sin cubrir.

**Evidencia concreta:** Sin el F01 no se habrían detectado las credenciales hardcodeadas. Sin el F03 no se habría documentado la causa raíz de cada hallazgo.

### 5.4 Lección 4: Documentar es tan importante como corregir

**Lo que creía antes:** "Lo importante es arreglar el error, lo demás sobra."

**Lo que aprendí:** Documentar cada hallazgo con su causa raíz, solución y verificación de eficacia permite que otros aprendan del error y evita que se repita. También sirve como evidencia del proceso de mejora continua.

**Evidencia concreta:** El formato F03 permitió registrar cada no conformidad con su análisis de causa raíz y acción correctiva, creando un historial de calidad del proyecto.

### 5.5 Lección 5: La mejora es continua (nunca se llega al 100%)

**Lo que creía antes:** "Después de los ajustes, el proyecto quedó perfecto."

**Lo que aprendí:** Incluso después de corregir los hallazgos principales, el proyecto quedó en 96%, no en 100%. Siempre hay aspectos mejorables: configuración de expiración de sesión, rate limiting, pruebas automatizadas, entre otros. La calidad es un proceso continuo, no un destino.

**Evidencia concreta:** Después de los ajustes, el cumplimiento subió de 72% a 96%. El 4% restante corresponde a mejoras identificadas pero no implementadas (expiración de sesión, autenticación en APIs).

### 5.6 Lección 6: Las pruebas funcionales no detectan problemas de seguridad

**Lo que creía antes:** "Si todas las pruebas funcionales pasan, el software está bien."

**Lo que aprendí:** Las pruebas funcionales verifican que las features operen, pero no detectan vulnerabilidades de seguridad, malas prácticas de código ni errores silenciosos. Es necesario complementarlas con otros instrumentos.

**Evidencia concreta:** Las 9 pruebas funcionales del F02 fueron exitosas al 100%, pero el F01 reveló solo un 40% de cumplimiento en seguridad.

---

## 6. Comparativa antes-después

### 6.1 Resultados iniciales

| Categoría | % Cumplimiento | Hallazgos principales |
|---|---|---|
| Calidad del Código | 62.5% | Manejo inconsistente de errores, credenciales hardcodeadas |
| Funcionalidad | 87.5% | Pago con MercadoPago no configurable |
| Seguridad | 40.0% | Credenciales expuestas, secret débil, rutas sin auth |
| Interfaz de Usuario | 100.0% | Sin observaciones |
| **Total** | **72.0%** | |

### 6.2 Resultados después de ajustes

| Categoría | % Cumplimiento | Mejora |
|---|---|---|
| Calidad del Código | 100.0% | +37.5% |
| Funcionalidad | 100.0% | +12.5% |
| Seguridad | 80.0% | +40.0% |
| Interfaz de Usuario | 100.0% | 0.0% |
| **Total** | **96.0%** | **+24.0%** |

### 6.3 Estado de no conformidades

| Indicador | Cantidad |
|---|---|
| No conformidades identificadas | 10 |
| No conformidades corregidas | 9 |
| No conformidades pendientes | 1 (expiración de sesión) |
| % de corrección | 90.0% |

---

## 7. Aplicación futura

### 7.1 Cómo aplicar estas lecciones en próximos proyectos

1. **Incorporar verificaciones desde el inicio:** No esperar a tener el proyecto terminado para verificar calidad. Aplicar listas de verificación durante el desarrollo.
2. **Automatizar lo que sea posible:** Implementar linters (ESLint), formateadores (Prettier) y pruebas automatizadas (Jest) para detectar errores temprano.
3. **Usar variables de entorno desde el día uno:** No hardcodear ninguna credencial ni siquiera en desarrollo.
4. **Revisar el código en pares:** Una segunda persona siempre encuentra errores que el autor no ve.
5. **Documentar a medida:** No dejar la documentación de calidad para el final.

### 7.2 Incorporación de verificaciones en el flujo de trabajo

Se propone el siguiente flujo para proyectos futuros:

```
1. Planificar → Definir criterios de calidad
2. Desarrollar → Aplicar linters + pruebas unitarias
3. Verificar → Aplicar F01, F02, F03, F04
4. Corregir → Documentar en F03, aplicar solución
5. Re-verificar → Confirmar corrección
6. Entregar → Adjuntar instrumentos diligenciados
```

---

## 8. Conclusiones

1. **El proceso de verificación reveló una realidad diferente a la esperada.** El proyecto que se creía completo y funcional tenía un cumplimiento real de solo 72%.

2. **Se identificaron 10 no conformidades**, de las cuales 2 eran críticas (credenciales hardcodeadas) y 2 de alta severidad (conexión sin autenticación, rutas sin validación de sesión).

3. **Dos bugs críticos pasaron desapercibidos** durante todo el desarrollo porque no producían errores visibles: un `catch` sin parámetro y una variable no definida.

4. **Los instrumentos de calidad (F01-F04) demostraron su utilidad** para obtener una visión completa y objetiva del estado del proyecto, más allá de la percepción subjetiva del desarrollador.

5. **La mejora fue significativa pero no total.** Se pasó de 72% a 96% de cumplimiento, quedando identificadas mejoras futuras.

6. **La principal lección aprendida** es que la verificación de calidad debe ser parte integral del proceso de desarrollo, no un paso opcional al final.

---

## 9. Recomendaciones

1. **Para StreamPro:** Aplicar los ajustes pendientes (expiración de sesión, autenticación en APIs, rate limiting) para alcanzar el 100% de cumplimiento.

2. **Para proyectos futuros:** Establecer una lista de verificación de calidad desde la fase de planificación y aplicarla en cada iteración.

3. **Para el equipo de desarrollo:** Realizar revisiones de código cruzadas (code reviews) antes de dar por finalizado cualquier módulo.

4. **Para la formación:** Incluir los instrumentos de calidad (F01-F04) como entregables obligatorios en cada proyecto, no solo al final.

5. **Para el aprendizaje personal:** Mantener una bitácora de errores comunes para consultarla en futuros proyectos y evitar repetir los mismos fallos.

---

## FIRMAS

| Rol | Nombre | Firma |
|---|---|---|
| Elaboró | David Caicedo | |
| Revisó | | |
| Aprobó | | |

---

*Documento elaborado como parte de la evidencia GA11-220501098-AA2-EV01 del programa Análisis y Desarrollo de Software — SENA 2026*
