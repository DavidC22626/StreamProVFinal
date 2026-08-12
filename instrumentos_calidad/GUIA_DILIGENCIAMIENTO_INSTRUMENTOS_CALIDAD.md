# GUÍA DE DILIGENCIAMIENTO DE INSTRUMENTOS PARA DOCUMENTAR PROCESOS DE CALIDAD DE SOFTWARE

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

---

## TABLA DE CONTENIDO

1. [Introducción](#1-introducción)
2. [Objetivos](#2-objetivos)
3. [¿Qué son los instrumentos de calidad de software?](#3-qué-son-los-instrumentos-de-calidad-de-software)
4. [Estructura GFPI-F-135 V02](#4-estructura-gfpi-f-135-v02)
5. [Instrumento 1: Lista de Verificación de Calidad (F01)](#5-instrumento-1-lista-de-verificación-de-calidad-f01)
6. [Instrumento 2: Formato de Pruebas Funcionales (F02)](#6-instrumento-2-formato-de-pruebas-funcionales-f02)
7. [Instrumento 3: Registro de No Conformidad (F03)](#7-instrumento-3-registro-de-no-conformidad-f03)
8. [Instrumento 4: Matriz de Trazabilidad de Requisitos (F04)](#8-instrumento-4-matriz-de-trazabilidad-de-requisitos-f04)
9. [Errores comunes al diligenciar](#9-errores-comunes-al-diligenciar)
10. [Ejemplo completo diligenciado](#10-ejemplo-completo-diligenciado)
11. [Recomendaciones finales](#11-recomendaciones-finales)
12. [Referencias](#12-referencias)

---

## 1. Introducción

La calidad del software no es un accidente, es el resultado de procesos sistemáticos de verificación, validación y mejora continua. Para lograr esto, es fundamental contar con **instrumentos sencillos, amigables y fáciles de entender** que permitan documentar cada etapa del proceso de calidad de manera organizada y estandarizada.

La presente guía está diseñada para que cualquier aprendiz o desarrollador pueda diligenciar correctamente los cuatro instrumentos de calidad desarrollados para el proyecto **StreamPro**, siguiendo los lineamientos del formato institucional **GFPI-F-135 V02** del SENA.

---

## 2. Objetivos

### Objetivo general

Guiar al aprendiz en el diligenciamiento correcto de los instrumentos para documentar procesos de calidad de software, asegurando consistencia, claridad y trazabilidad en la información registrada.

### Objetivos específicos

1. Explicar la estructura y propósito de cada instrumento de calidad
2. Proporcionar instrucciones paso a paso para el diligenciamiento
3. Presentar ejemplos prácticos basados en el proyecto StreamPro
4. Identificar errores comunes y cómo evitarlos

---

## 3. ¿Qué son los instrumentos de calidad de software?

Los instrumentos de calidad de software son **formatos estandarizados** que permiten registrar, organizar y dar seguimiento a las actividades de aseguramiento de la calidad durante el ciclo de vida del software.

| Instrumento | Propósito | ¿Cuándo usarlo? |
|---|---|---|
| **Lista de Verificación** | Verificar que el código y las funcionalidades cumplen con los estándares definidos | Durante y después del desarrollo |
| **Formato de Pruebas Funcionales** | Documentar la ejecución de casos de prueba y sus resultados | Durante la fase de pruebas |
| **Registro de No Conformidad** | Documentar hallazgos que no cumplen con los requisitos | Cuando se encuentra un error o desviación |
| **Matriz de Trazabilidad** | Relacionar requisitos con componentes implementados | Al inicio y cierre del proyecto |

---

## 4. Estructura GFPI-F-135 V02

El formato GFPI-F-135 V02 del SENA establece la estructura para las guías de aprendizaje y sus evidencias. Los instrumentos de calidad siguen esta misma estructura:

```
┌─────────────────────────────────────────────────────────┐
│  PROCESO DE GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL   │
├─────────────────────────────────────────────────────────┤
│  1. IDENTIFICACIÓN                                       │
│     • Programa de formación                              │
│     • Código del programa                                │
│     • Evidencia                                          │
│     • Proyecto                                           │
├─────────────────────────────────────────────────────────┤
│  2. INSTRUCCIONES DE DILIGENCIAMIENTO                    │
│     • Explicación clara de cómo llenar el formato        │
│     • Significado de convenciones (S, N, N/A, etc.)     │
├─────────────────────────────────────────────────────────┤
│  3. CUERPO DEL INSTRUMENTO                               │
│     • Tablas, casillas de verificación, campos de texto  │
├─────────────────────────────────────────────────────────┤
│  4. OBSERVACIONES                                        │
├─────────────────────────────────────────────────────────┤
│  5. FIRMAS                                               │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Instrumento 1: Lista de Verificación de Calidad (F01)

### 5.1 Estructura

El archivo `F01-Lista_Verificacion_Calidad.md` contiene:

1. **Identificación** (encabezado con evidencia, programa, proyecto)
2. **Instrucciones** (explicación de S=N=Sí, N=No, N/A=No Aplica)
3. **Lista de verificación** organizada en categorías:
   - Calidad del Código (8 ítems)
   - Funcionalidad (8 ítems)
   - Seguridad (5 ítems)
   - Interfaz de Usuario (4 ítems)
4. **Estadísticas** (total ítems, cumplidos, no cumplidos, %)
5. **Observaciones generales**
6. **Firmas**

### 5.2 Paso a paso para diligenciar

```
PASO 1: Complete la tabla de identificación
   ┌──────────────────────────────────────┐
   │ Nombre del verificador: [Su nombre] │
   │ Fecha: [dd/mm/aaaa]                 │
   │ Módulo: [Ej: Autenticación]         │
   │ Versión: 1.0.0                       │
   └──────────────────────────────────────┘

PASO 2: Revise cada ítem de la lista
   ┌────┬────────────────────────┬───┬───┬───┬──────────────┐
   │ #  │ Ítem                   │ S │ N │NA │ Observaciones│
   ├────┼────────────────────────┼───┼───┼───┼──────────────┤
   │ 1  │ Nomenclatura clara     │ X │   │   │ camelCase    │
   └────┴────────────────────────┴───┴───┴───┴──────────────┘
   Marque con X según corresponda.

PASO 3: Calcule las estadísticas
   % de cumplimiento = (S / Total evaluados) × 100

PASO 4: Registre observaciones y firme
```

### 5.3 Consejos prácticos

- Sea **objetivo**: si el ítem se cumple parcialmente, marque **N** y explique en observaciones
- En la columna **Observaciones** puede poner: número de línea, nombre de archivo, captura, etc.
- Si un ítem **no aplica**, marque N/A y justifique brevemente

---

## 6. Instrumento 2: Formato de Pruebas Funcionales (F02)

### 6.1 Estructura

El archivo `F02-Formato_Pruebas_Funcionales.md` contiene:

1. **Identificación** (evaluador, fecha, módulo, ambiente)
2. **Instrucciones** (explicación de cada campo)
3. **Casos de prueba** organizados por módulo:
   - Autenticación (CP-001 a CP-003)
   - Catálogo y Reproducción (CP-004 a CP-005)
   - Administración CRUD (CP-006 a CP-007)
   - Suscripción y Pagos (CP-008)
   - Recuperación de Contraseña (CP-009)
4. **Resumen de resultados**
5. **Observaciones**
6. **Firmas**

### 6.2 Paso a paso para diligenciar

```
PASO 1: Complete la identificación
   • Evaluador: [su nombre]
   • Fecha: [dd/mm/aaaa]
   • Módulo: [qué va a probar]
   • Ambiente: [Local / Producción]

PASO 2: Para CADA caso de prueba (CP-001 a CP-009):
   a) Lea la descripción, precondiciones y pasos ya escritos
   b) Ejecute los pasos en el sistema
   c) En "Resultado obtenido" escriba lo que realmente pasó
   d) Marque el Estado como Exitosa o Fallida
   e) Tome captura de pantalla como evidencia

PASO 3: Complete el resumen
   Total casos = 9
   Cuente cuántos fueron exitosos y cuántos fallidos

PASO 4: Registre observaciones y firme
```

### 6.3 Ejemplo de diligenciamiento correcto

```
| ID del caso     | CP-001                                               |
| Descripción     | Registro de nuevo usuario                            |
| Precondiciones  | BD activa, servidor Node.js en puerto 3000           |
| Datos entrada   | Carlos Pérez, Colombiana, 3001234567, ...            |
| Pasos           | 1. Navegar a /registerUser                           |
|                 | 2. Completar formulario                              |
|                 | 3. Hacer clic en "Registrarse"                       |
| Resultado esperado | Usuario creado, redirige al login                |
| Resultado obtenido | El usuario se registró y fue redirigido al login |
| Estado          | Exitosa                                              |
| Evidencia       | Captura: registro_exitoso.png                        |
```

---

## 7. Instrumento 3: Registro de No Conformidad (F03)

### 7.1 Estructura

El archivo `F03-Formato_No_Conformidad.md` contiene:

1. **Identificación** (número NC, fecha, severidad)
2. **Instrucciones** (definición de severidades)
3. **Descripción de la no conformidad** (qué, dónde, cuándo)
4. **Análisis de causa raíz** (causa inmediata, causa raíz)
5. **Clasificación** (tipo, impacto)
6. **Acciones inmediatas** (con responsables y fechas)
7. **Acción correctiva** (para eliminar la causa raíz)
8. **Cierre** (verificación de eficacia)
9. **Ejemplo diligenciado** (referencia)

### 7.2 Paso a paso para diligenciar

```
PASO 1: Identifique la no conformidad
   • Asígnele un número correlativo: NC-001, NC-002...
   • Defina la severidad:
     - CRÍTICA: El sistema no funciona o se pierden datos
     - ALTA: Funcionalidad principal afectada
     - MEDIA: Afecta funcionalidad con alternativa
     - BAJA: Mejora cosmética

PASO 2: Describa el hallazgo
   • ¿Qué ocurrió? → Descripción concreta
   • ¿Dónde? → Módulo, pantalla, ruta
   • ¿Cuándo? → Fecha, hora, condiciones

PASO 3: Analice la causa raíz
   • Pregunte "¿por qué?" varias veces hasta llegar al origen
   • Diferencie entre causa inmediata (síntoma) y raíz (problema real)

PASO 4: Defina acciones
   • Inmediatas: contener el problema (corto plazo)
   • Correctivas: eliminar la causa raíz (mediano plazo)

PASO 5: Cierre
   • Verifique que la corrección funciona
   • Asegúrese de que no volverá a ocurrir
   • Firme el cierre
```

### 7.3 Errores frecuentes

| Error | Cómo evitarlo |
|---|---|
| Describir la solución en lugar del problema | Describa solo lo que ocurrió, no cómo se arregla |
| Confundir causa inmediata con causa raíz | Pregunte "¿por qué?" al menos 3 veces |
| Severidad subjetiva | Use los criterios definidos en las instrucciones |
| Saltarse la verificación de eficacia | Siempre verifique que la acción correctiva funcionó |

---

## 8. Instrumento 4: Matriz de Trazabilidad de Requisitos (F04)

### 8.1 Estructura

El archivo `F04-Matriz_Trazabilidad_Requisitos.md` contiene:

1. **Identificación** (elaborado por, fecha, alcance)
2. **Instrucciones** (códigos: RQ-XXX, prioridad, cumplimiento S/N/P)
3. **Matriz** organizada por módulos:
   - Autenticación (RQ-001 a RQ-009)
   - Catálogo y Reproducción (RQ-010 a RQ-014)
   - Administración CRUD (RQ-015 a RQ-020)
   - Suscripciones (RQ-021 a RQ-024)
   - Seguridad (RQ-025 a RQ-028)
4. **Estadísticas**
5. **Observaciones**
6. **Firmas**

### 8.2 Paso a paso para diligenciar

```
PASO 1: Revise los requisitos listados
   • Cada requisito tiene un ID único (RQ-001, RQ-002...)
   • Cada uno tiene asociado el componente(s) donde se implementó

PASO 2: Verifique cada requisito en el código fuente
   • Abra el archivo indicado en "Componente(s)"
   • Confirme que la funcionalidad existe y funciona

PASO 3: Marque el estado de cumplimiento
   • S (Sí): El requisito está completamente implementado
   • N (No): El requisito no está implementado
   • P (Parcial): Está parcialmente implementado

PASO 4: Registre la evidencia
   • Especifique qué prueba, captura o revisión confirma el cumplimiento
   • Ejemplo: "CP-001 ejecutado exitosamente" o "Revisión de código línea 45-60"

PASO 5: Calcule estadísticas y firme
```

### 8.3 Consejos prácticos

- La matriz de trazabilidad debe actualizarse durante todo el proyecto, no solo al final
- Si un requisito cambia, actualice la matriz y registre el cambio en observaciones
- Un requisito puede estar asociado a múltiples componentes

---

## 9. Errores comunes al diligenciar

### 9.1 Errores generales

| # | Error | Problema | Solución |
|---|---|---|---|
| 1 | Dejar campos en blanco | Se pierde información valiosa | Siempre complete todos los campos; si no aplica, escriba "N/A" |
| 2 | Usar marcas incorrectas | Confunde al lector | Use solo S, N, N/A según las instrucciones |
| 3 | Observaciones vagas | No permiten tomar acción | Sea específico: "Error en login.js línea 42: no valida email vacío" |
| 4 | No fechar los registros | Se pierde la trazabilidad temporal | Siempre incluya fecha en cada registro |
| 5 | Diligenciar sin verificar | El instrumento pierde validez | Primero verifique, luego registre |

### 9.2 Errores específicos por instrumento

**F01 - Lista de Verificación:**
- Marcar todo como "S" sin realmente verificar
- No usar la columna de observaciones

**F02 - Pruebas Funcionales:**
- Copiar el resultado esperado en el resultado obtenido sin probar realmente
- No incluir capturas de evidencia

**F03 - No Conformidad:**
- Confundir severidades (ej: marcar como "baja" algo que impide el login)
- No hacer análisis de causa raíz

**F04 - Matriz de Trazabilidad:**
- Diligenciar solo al final del proyecto
- No actualizar cuando cambian los requisitos

---

## 10. Ejemplo completo diligenciado

A continuación se presenta un ejemplo de cómo se vería el instrumento F01 completamente diligenciado para el módulo de Autenticación de StreamPro:

### F01 - Lista de Verificación (Ejemplo)

| Campo | Valor |
|---|---|
| Verificador | David Caicedo |
| Fecha | 02/06/2026 |
| Módulo | Autenticación |
| Versión | 1.0.0 |

| # | Ítem | S | N | N/A | Observaciones |
|---|---|---|---|---|---|
| 1 | Nomenclatura clara | X | | | camelCase en `login.js`, PascalCase en `RegisterUser` |
| 2 | Funciones con propósito único | X | | | `validarCredenciales()`, `crearSesion()` separadas |
| 3 | Manejo de errores | X | | | try/catch en `login.js` líneas 15-40 |
| 4 | Sin credenciales hardcodeadas | | X | | Contraseña SMTP en `correo.js` está en texto plano |
| 5 | Consultas parametrizadas | X | | | mysql2 con `??` en todas las consultas |
| 6 | Rutas separadas | X | | | Cada módulo en su archivo en `/rutas/` |
| 7 | Sin código muerto | X | | | Sin comentarios innecesarios |
| 8 | Validación de entrada | X | | | Email y contraseña validados en frontend y backend |

**Estadísticas:**
- Total evaluados: 8
- Cumplidos (S): 7
- No cumplidos (N): 1
- N/A: 0
- % Cumplimiento: 87.5%

---

## 11. Recomendaciones finales

1. **Diligencie los instrumentos a medida que avanza**, no los deje para el final
2. **Sea honesto** en sus evaluaciones — un instrumento truthful es más útil que uno con puros "S"
3. **Adjunte evidencia** siempre que sea posible (capturas, logs, fragmentos de código)
4. **Revise los instrumentos** antes de entregarlos como parte de su evidencia
5. **Use lenguaje claro y profesional** en todas las observaciones
6. **Mantenga los instrumentos accesibles** para todo el equipo del proyecto

---

## 12. Referencias

- GFPI-F-135 V02. (2024). *Formato Guía de Aprendizaje*. SENA — Servicio Nacional de Aprendizaje.
- ISO/IEC 25010:2011. *Systems and software Quality Requirements and Evaluation (SQuaRE)*.
- ISO/IEC/IEEE 14764:2022. *Software Engineering — Software Life Cycle Processes — Maintenance*.
- Pressman, R. S. (2014). *Ingeniería del Software: Un enfoque práctico* (7ª ed.). McGraw-Hill.

---

*Documento elaborado como parte de la evidencia GA11-220501098-AA1-EV01 del programa Análisis y Desarrollo de Software — SENA 2026*
