# MATRIZ DE TRAZABILIDAD DE REQUISITOS VS COMPONENTES

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

**Versión:** 1.0.0

---

## 1. IDENTIFICACIÓN

| Campo | Dato |
|---|---|
| Elaborado por | David Caicedo |
| Fecha | 02/06/2026 |
| Versión del software | 1.0.0 |
| Alcance | Todos los módulos del sistema StreamPro |

---

## 2. INSTRUCCIONES DE DILIGENCIAMIENTO

1. **ID Requisito:** Use el código RQ-XXX para cada requisito funcional
2. **Descripción:** Describa el requisito de forma clara y verificable
3. **Prioridad:** Alta (esencial), Media (importante), Baja (deseable)
4. **Componente:** Especifique el archivo, ruta o vista donde se implementó
5. **Cumple:** S (Sí, implementado), N (No implementado), P (Parcial)
6. **Evidencia:** Indique la prueba o verificación que confirma el cumplimiento

---

## 3. MATRIZ DE TRAZABILIDAD

### 3.1 Módulo: Autenticación y Gestión de Usuarios

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-001 | El sistema debe permitir el registro de nuevos usuarios con nombre, nacionalidad, teléfono, email y contraseña | Alta | `rutas/registerUser.js`, `views/registerUser.ejs` | S | CP-001 ejecutado exitosamente. Registro completo verificado en BD |
| RQ-002 | Las contraseñas deben almacenarse cifradas con bcrypt (salt rounds >= 10) | Alta | `rutas/registerUser.js` (bcrypt.hash) | S | Código `registerUser.js:50`: `bcrypt.hash(password, 10)`. Hash verificado en BD |
| RQ-003 | El sistema debe validar que el teléfono tenga exactamente 10 dígitos | Media | `rutas/registerUser.js` | S | Función `validarTelefono()` en `registerUser.js:16-23` |
| RQ-004 | El sistema debe validar que las contraseñas coincidan antes de registrar | Media | `rutas/registerUser.js`, `views/registerUser.ejs` | S | Función `compararContaseñas()` en `registerUser.js:25-33` |
| RQ-005 | El sistema debe permitir inicio de sesión con email y contraseña | Alta | `rutas/login.js`, `views/login.ejs` | S | CP-002 ejecutado. Autenticación con bcrypt.compare |
| RQ-006 | El sistema debe diferenciar entre usuarios normales y administradores al autenticar | Alta | `rutas/login.js` (tablas `usuarios`/`administradores`) | S | Login.js:15 whitelist de tablas. Sesión almacena `req.session.tipo` |
| RQ-007 | El sistema debe mantener la sesión del usuario activa hasta que cierre sesión | Alta | `app.js` (express-session), `rutas/home.js` | S | express-session configurado. Sesión persiste. Sin maxAge (mejora pendiente) |
| RQ-008 | El sistema debe permitir recuperación de contraseña mediante token enviado por correo | Media | `rutas/recuperarPassword.js`, `views/recuperarPassword.ejs` | S | CP-009 ejecutado. Token UUID creado, almacenado en BD, enviado por Nodemailer |
| RQ-009 | El token de recuperación debe expirar después de 15 minutos | Media | `rutas/recuperarPassword.js` | S | Consulta SQL: `fecha_expiracion = NOW() + INTERVAL 15 MINUTE` |

### 3.2 Módulo: Catálogo y Reproducción de Contenido

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-010 | El sistema debe mostrar un catálogo de películas disponibles | Alta | `rutas/home.js` (GET peliculas), `views/home.ejs` | S | CP-004 ejecutado. API GET `/peliculas` retorna JSON. Tarjetas renderizadas en dashboard |
| RQ-011 | El sistema debe mostrar un catálogo de series con sus temporadas y capítulos | Alta | `rutas/home.js` (GET series/temporadas/capitulos) | S | API GET `/series`, GET `/temporadas`, GET `/capitulos` implementadas |
| RQ-012 | El sistema debe reproducir video MP4 directamente en el navegador | Alta | `views/home.ejs` (reproductor HTML5) | S | CP-005 ejecutado. Reproductor HTML5 con controles funcionales |
| RQ-013 | El catálogo debe mostrar portada, título y descripción de cada contenido | Media | `views/home.ejs` | S | Tarjetas con `<img>` portada, `<h3>` título, `<p>` descripción |
| RQ-014 | El sistema debe cargar dinámicamente el contenido sin recargar la página | Media | `rutas/home.js` (API REST), `views/home.ejs` (fetch) | S | Uso de `fetch()` en frontend para obtener datos de la API REST |

### 3.3 Módulo: Administración (CRUD)

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-015 | El administrador debe poder agregar nuevas películas al catálogo | Alta | `rutas/home.js` (POST peliculas) | S | CP-006 ejecutado. POST `/peliculas` inserta en BD. Reflejado en catálogo |
| RQ-016 | El administrador debe poder editar películas existentes | Alta | `rutas/home.js` (PUT peliculas) | S | CP-007 ejecutado. PUT `/peliculas/:id` actualiza en BD. Cambio visible en UI |
| RQ-017 | El administrador debe poder eliminar películas del catálogo | Alta | `rutas/home.js` (DELETE peliculas) | S | DELETE `/peliculas/:id` implementado en home.js |
| RQ-018 | El administrador debe poder agregar, editar y eliminar series | Alta | `rutas/home.js` (CRUD series) | S | CRUD completo para series con POST, PUT, DELETE |
| RQ-019 | El administrador debe poder agregar, editar y eliminar temporadas de una serie | Alta | `rutas/home.js` (CRUD temporadas) | S | CRUD completo para temporadas |
| RQ-020 | El administrador debe poder agregar, editar y eliminar capítulos de una temporada | Alta | `rutas/home.js` (CRUD capitulos) | S | CRUD completo para capítulos |

### 3.4 Módulo: Suscripciones y Pagos

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-021 | El sistema debe ofrecer un plan de suscripción premium | Alta | `views/suscripcion.ejs` | S | Página de suscripción con plan premium a $13.000 COP/mes |
| RQ-022 | El sistema debe integrarse con MercadoPago para procesar pagos | Alta | `config/mercadopago.js`, `rutas/suscripcion.js` | S | CP-008 ejecutado. SDK de MercadoPago crea preferencia de pago |
| RQ-023 | El sistema debe registrar las suscripciones en la base de datos | Alta | `rutas/suscripcion.js`, BD `suscripciones` | S | Inserción en tabla `suscripciones` después del pago |
| RQ-024 | El sistema debe procesar notificaciones de pago (webhook) | Media | `rutas/suscripcion.js` (/webhook) | S | Ruta `/webhook` con raw body parser para verificar firma |

### 3.5 Módulo: Seguridad y Configuración

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-025 | El sistema debe prevenir inyección SQL usando consultas parametrizadas | Alta | Todas las rutas (mysql2 `??`) | S | Todas las consultas usan `??` para identifiers y `?` para values con mysql2 |
| RQ-026 | El sistema debe usar variables de entorno para configuraciones sensibles en producción | Media | `config/conexion.js`, `config/correo.js`, `config/mercadopago.js` | P | Parcial: `conexion.js` usa valores fijos. `correo.js` y `mercadopago.js` tienen credenciales hardcodeadas |
| RQ-027 | El sistema debe restringir el panel administrativo solo a usuarios con rol administrador | Alta | `rutas/home.js` (validación de sesión admin) | S | `home.js` verifica `req.session.tipo === 'administradores'` para operaciones CRUD |
| RQ-028 | La base de datos debe usar charset utf8mb4 para soportar caracteres especiales | Media | `database/stream_pro_schema.sql` | S | Schema SQL: `DEFAULT CHARSET=utf8mb4` en todas las tablas |

---

## 4. ESTADÍSTICAS DE TRAZABILIDAD

| Indicador | Valor |
|---|---|
| Total de requisitos | 28 |
| Requisitos cumplidos (S) | 27 |
| Requisitos no cumplidos (N) | 0 |
| Requisitos parciales (P) | 1 |
| Porcentaje de cumplimiento | 96.4% |

---

## 5. OBSERVACIONES

**Requisito parcial (RQ-026):**
El sistema actualmente usa valores fijos en `config/conexion.js`, `config/correo.js` y `config/mercadopago.js`. Se requiere implementar variables de entorno para producción. Este hallazgo está documentado como NC-001, NC-002 y NC-003 en el instrumento F03.

**Requisitos adicionales identificados (no documentados originalmente):**
- Envío de correo SMTP para recuperación de contraseña (implementado en `rutas/recuperarPassword.js`)
- Distinción de roles usuario/administrador en sesión (implementado en `rutas/login.js`)
- Protección CSRF en formularios (pendiente de implementar)

---

## 6. FIRMAS

| Rol | Nombre | Firma |
|---|---|---|
| Elaboró | David Caicedo | |
| Revisó | | |
| Aprobó | | |

---

*Formato basado en GFPI-F-135 V02 — Proceso de Gestión de Formación Profesional Integral SENA*
