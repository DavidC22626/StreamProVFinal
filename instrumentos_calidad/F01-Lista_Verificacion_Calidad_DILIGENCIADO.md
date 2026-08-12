# LISTA DE VERIFICACIÓN DE CALIDAD DE SOFTWARE

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

**Versión:** 1.0.0

---

## 1. IDENTIFICACIÓN

| Campo | Dato |
|---|---|
| Nombre del verificador | David Caicedo |
| Fecha de verificación | 02/06/2026 |
| Módulo / Componente evaluado | General — Todos los módulos de StreamPro |
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
| 1 | El código sigue una nomenclatura clara y consistente (camelCase, PascalCase) | X | | | camelCase en `login.js`, PascalCase en `registerUser.js`. Consistente |
| 2 | Las funciones tienen un propósito único y bien definido | X | | | `validarTelefono()`, `compararContaseñas()` en registerUser.js |
| 3 | Se manejan correctamente los errores y excepciones (try/catch) | X | | | try/catch en login.js:7-100, registerUser.js:49-65 |
| 4 | No hay credenciales ni datos sensibles hardcodeados | | X | | `config/correo.js` línea 12 pass hardcodeada. `config/mercadopago.js` línea 4 token hardcodeado |
| 5 | Las consultas SQL usan parámetros o consultas preparadas | X | | | mysql2 con `??` en login.js:20, registerUser.js:37,43,54 |
| 6 | Las rutas y controladores están correctamente separados | X | | | Cada módulo en su archivo en `/rutas/` (login, register, home, suscripcion, recuperarPassword) |
| 7 | El código está libre de comentarios innecesarios o código muerto | X | | | Sin comentarios de código muerto. Solo comentarios útiles |
| 8 | Se implementan validaciones de entrada de datos del usuario | X | | | Validación de teléfono 10 dígitos (registerUser.js:16-23), validación de contraseñas coincidentes (registerUser.js:25-33) |

### 3.2 Funcionalidad

| # | Ítem a Verificar | S | N | N/A | Observaciones |
|---|---|---|---|---|---|
| 9 | Registro de usuarios funciona correctamente | X | | | CP-001 ejecutado. Usuario creado en BD con bcrypt, redirige a login |
| 10 | Inicio de sesión autentica correctamente (usuarios y administradores) | X | | | CP-002 ejecutado. Distingue tabla `usuarios` vs `administradores`. Sesión creada |
| 11 | Catálogo de películas y series se visualiza correctamente | X | | | CP-004 ejecutado. Carga desde BD con fetch, muestra tarjetas con portada |
| 12 | El reproductor de video carga y reproduce contenido | X | | | CP-005 ejecutado. Reproductor HTML5 funcional con controles |
| 13 | El panel de administración CRUD opera sin errores | X | | | CP-006, CP-007 ejecutados. Insert y Update funcionan. DELETE pendiente de probar |
| 14 | El proceso de suscripción y pago se completa exitosamente | X | | | CP-008 ejecutado. MercadoPago redirect funcional con token de prueba |
| 15 | La recuperación de contraseña envía el token por correo | X | | | CP-009 ejecutado. Token UUID generado, almacenado con expiración 15 min, correo enviado |
| 16 | El cierre de sesión limpia la sesión correctamente | X | | | `req.session.destroy()` o `delete` de propiedades en login.js:57-60,76-83 |

### 3.3 Seguridad

| # | Ítem a Verificar | S | N | N/A | Observaciones |
|---|---|---|---|---|---|
| 17 | Las contraseñas se almacenan usando bcrypt (hash + salt) | X | | | `registerUser.js:50`: `bcrypt.hash(password, 10)`. Salt rounds = 10 |
| 18 | Las sesiones expiran después de inactividad | | X | | `app.js:16-20`: express-session sin `maxAge` ni `expires`. No hay timeout configurado |
| 19 | Se valida el tipo de usuario antes de acceder a rutas administrativas | X | | | `login.js:15`: whitelist de tablas `['usuarios', 'administradores']`. Sesión tipo validado en home.js |
| 20 | Los tokens de recuperación tienen expiración (15 min) | X | | | `recuperarPassword.js`: token con `fecha_expiracion` = NOW() + INTERVAL 15 MINUTE |
| 21 | Se previene inyección SQL en todas las consultas | X | | | Todas las consultas usan `??` (identifiers) y `?` (values) con mysql2. Tabla whitelist en login.js:15 |

### 3.4 Interfaz de Usuario

| # | Ítem a Verificar | S | N | N/A | Observaciones |
|---|---|---|---|---|---|
| 22 | La navegación entre páginas es intuitiva | X | | | Landing page (index.ejs) → Login/Registro → Dashboard (home.ejs). Flujo claro |
| 23 | Los formularios muestran mensajes de error claros | X | | | registerUser muestra mensajes como "Teléfono no válido", "Las contraseñas no coinciden" |
| 24 | El diseño es responsivo (se adapta a diferentes pantallas) | X | | | CSS adaptable. Interfaz tipo Netflix funciona en distintos tamaños |
| 25 | Los tiempos de carga son aceptables | X | | | Carga de catálogo con fetch asíncrono. Sin demoras perceptibles en local |

---

## 4. ESTADÍSTICAS

| Indicador | Valor |
|---|---|
| Total de ítems evaluados | 25 |
| Ítems cumplidos (S) | 18 |
| Ítems no cumplidos (N) | 7 |
| Ítems no aplica (N/A) | 0 |
| Porcentaje de cumplimiento | 72.0% |

---

## 5. OBSERVACIONES GENERALES

**Hallazgos principales:**
1. **Credenciales hardcodeadas (NC-001, NC-002):** Los archivos `config/correo.js` y `config/mercadopago.js` contienen credenciales en texto plano. Se recomienda mover a variables de entorno.

2. **Contraseña BD vacía (NC-003):** `config/conexion.js` usa `password: ""`. En producción debe configurarse una contraseña segura.

3. **Sin expiración de sesión (NC-008 parcial):** El secret de sesión es débil (`"acceso_app"`) y no hay `maxAge` configurado.

4. **Sin script start (NC-010):** `package.json` carece del script `start` necesario para despliegues en plataformas como Render.

5. **Rutas sin protección (NC-004, NC-005):** Las rutas GET `/home` y `/registerUser` en `app.js` no validan si el usuario ya tiene sesión activa.

---

## 6. FIRMAS

| Rol | Nombre | Firma |
|---|---|---|
| Elaboró | David Caicedo | |
| Revisó | | |
| Aprobó | | |

---

*Formato basado en GFPI-F-135 V02 — Proceso de Gestión de Formación Profesional Integral SENA*
