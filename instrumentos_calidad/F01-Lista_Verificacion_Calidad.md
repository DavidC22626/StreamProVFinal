# LISTA DE VERIFICACIÓN DE CALIDAD DE SOFTWARE

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

**Versión:** 1.0.0

---

## 1. IDENTIFICACIÓN

| Campo | Dato |
|---|---|
| Nombre del verificador | |
| Fecha de verificación | |
| Módulo / Componente evaluado | |
| Versión del software | 1.0.0 |

---

## 2. INSTRUCCIONES DE DILIGENCIAMIENTO

Marque con una **X** en la columna **Cumple** según corresponda:
- **S (Sí):** El ítem se cumple completamente
- **N (No):** El ítem no se cumple
- **N/A (No Aplica):** El ítem no aplica para este componente

En la columna **Observaciones** registre evidencia, justificación o referencia del resultado.

---

## 3. LISTA DE VERIFICACIÓN

### 3.1 Calidad del Código

| # | Ítem a Verificar | S | N | N/A | Observaciones |
|---|---|---|---|---|---|
| 1 | El código sigue una nomenclatura clara y consistente (camelCase, PascalCase) | | | | |
| 2 | Las funciones tienen un propósito único y bien definido | | | | |
| 3 | Se manejan correctamente los errores y excepciones (try/catch) | | | | |
| 4 | No hay credenciales ni datos sensibles hardcodeados | | | | |
| 5 | Las consultas SQL usan parámetros o consultas preparadas | | | | |
| 6 | Las rutas y controladores están correctamente separados | | | | |
| 7 | El código está libre de comentarios innecesarios o código muerto | | | | |
| 8 | Se implementan validaciones de entrada de datos del usuario | | | | |

### 3.2 Funcionalidad

| # | Ítem a Verificar | S | N | N/A | Observaciones |
|---|---|---|---|---|---|
| 9 | Registro de usuarios funciona correctamente | | | | |
| 10 | Inicio de sesión autentica correctamente (usuarios y administradores) | | | | |
| 11 | Catálogo de películas y series se visualiza correctamente | | | | |
| 12 | El reproductor de video carga y reproduce contenido | | | | |
| 13 | El panel de administración CRUD opera sin errores | | | | |
| 14 | El proceso de suscripción y pago se completa exitosamente | | | | |
| 15 | La recuperación de contraseña envía el token por correo | | | | |
| 16 | El cierre de sesión limpia la sesión correctamente | | | | |

### 3.3 Seguridad

| # | Ítem a Verificar | S | N | N/A | Observaciones |
|---|---|---|---|---|---|
| 17 | Las contraseñas se almacenan usando bcrypt (hash + salt) | | | | |
| 18 | Las sesiones expiran después de inactividad | | | | |
| 19 | Se valida el tipo de usuario antes de acceder a rutas administrativas | | | | |
| 20 | Los tokens de recuperación tienen expiración (15 min) | | | | |
| 21 | Se previene inyección SQL en todas las consultas | | | | |

### 3.4 Interfaz de Usuario

| # | Ítem a Verificar | S | N | N/A | Observaciones |
|---|---|---|---|---|---|
| 22 | La navegación entre páginas es intuitiva | | | | |
| 23 | Los formularios muestran mensajes de error claros | | | | |
| 24 | El diseño es responsivo (se adapta a diferentes pantallas) | | | | |
| 25 | Los tiempos de carga son aceptables | | | | |

---

## 4. ESTADÍSTICAS

| Indicador | Valor |
|---|---|
| Total de ítems evaluados | |
| Ítems cumplidos (S) | |
| Ítems no cumplidos (N) | |
| Ítems no aplica (N/A) | |
| Porcentaje de cumplimiento | |

---

## 5. OBSERVACIONES GENERALES

[Espacio para registrar hallazgos, recomendaciones o acciones correctivas]

---

## 6. FIRMAS

| Rol | Nombre | Firma |
|---|---|---|
| Elaboró | | |
| Revisó | | |
| Aprobó | | |

---

*Formato basado en GFPI-F-135 V02 — Proceso de Gestión de Formación Profesional Integral SENA*
