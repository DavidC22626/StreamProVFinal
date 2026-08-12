# MATRIZ DE TRAZABILIDAD DE REQUISITOS VS COMPONENTES

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

**Versión:** 1.0.0

---

## 1. IDENTIFICACIÓN

| Campo | Dato |
|---|---|
| Elaborado por | |
| Fecha | |
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
| RQ-001 | El sistema debe permitir el registro de nuevos usuarios con nombre, nacionalidad, teléfono, email y contraseña | Alta | `rutas/registerUser.js`, `views/registerUser.ejs` | | |
| RQ-002 | Las contraseñas deben almacenarse cifradas con bcrypt (salt rounds >= 10) | Alta | `rutas/registerUser.js` (bcrypt.hash) | | |
| RQ-003 | El sistema debe validar que el teléfono tenga exactamente 10 dígitos | Media | `rutas/registerUser.js` | | |
| RQ-004 | El sistema debe validar que las contraseñas coincidan antes de registrar | Media | `rutas/registerUser.js`, `views/registerUser.ejs` | | |
| RQ-005 | El sistema debe permitir inicio de sesión con email y contraseña | Alta | `rutas/login.js`, `views/login.ejs` | | |
| RQ-006 | El sistema debe diferenciar entre usuarios normales y administradores al autenticar | Alta | `rutas/login.js` (tablas `usuarios`/`administradores`) | | |
| RQ-007 | El sistema debe mantener la sesión del usuario activa hasta que cierre sesión | Alta | `app.js` (express-session), `rutas/home.js` | | |
| RQ-008 | El sistema debe permitir recuperación de contraseña mediante token enviado por correo | Media | `rutas/recuperarPassword.js`, `views/recuperarPassword.ejs` | | |
| RQ-009 | El token de recuperación debe expirar después de 15 minutos | Media | `rutas/recuperarPassword.js` | | |

### 3.2 Módulo: Catálogo y Reproducción de Contenido

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-010 | El sistema debe mostrar un catálogo de películas disponibles | Alta | `rutas/home.js` (GET peliculas), `views/home.ejs` | | |
| RQ-011 | El sistema debe mostrar un catálogo de series con sus temporadas y capítulos | Alta | `rutas/home.js` (GET series/temporadas/capitulos) | | |
| RQ-012 | El sistema debe reproducir video MP4 directamente en el navegador | Alta | `views/home.ejs` (reproductor HTML5) | | |
| RQ-013 | El catálogo debe mostrar portada, título y descripción de cada contenido | Media | `views/home.ejs` | | |
| RQ-014 | El sistema debe cargar dinámicamente el contenido sin recargar la página | Media | `home.js` (API REST), `views/home.ejs` (fetch) | | |

### 3.3 Módulo: Administración (CRUD)

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-015 | El administrador debe poder agregar nuevas películas al catálogo | Alta | `rutas/home.js` (POST peliculas) | | |
| RQ-016 | El administrador debe poder editar películas existentes | Alta | `rutas/home.js` (PUT peliculas) | | |
| RQ-017 | El administrador debe poder eliminar películas del catálogo | Alta | `rutas/home.js` (DELETE peliculas) | | |
| RQ-018 | El administrador debe poder agregar, editar y eliminar series | Alta | `rutas/home.js` (CRUD series) | | |
| RQ-019 | El administrador debe poder agregar, editar y eliminar temporadas de una serie | Alta | `rutas/home.js` (CRUD temporadas) | | |
| RQ-020 | El administrador debe poder agregar, editar y eliminar capítulos de una temporada | Alta | `rutas/home.js` (CRUD capitulos) | | |

### 3.4 Módulo: Suscripciones y Pagos

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-021 | El sistema debe ofrecer un plan de suscripción premium | Alta | `views/suscripcion.ejs` | | |
| RQ-022 | El sistema debe integrarse con MercadoPago para procesar pagos | Alta | `config/mercadopago.js`, `rutas/suscripcion.js` | | |
| RQ-023 | El sistema debe registrar las suscripciones en la base de datos | Alta | `rutas/suscripcion.js`, BD `suscripciones` | | |
| RQ-024 | El sistema debe procesar notificaciones de pago (webhook) | Media | `rutas/suscripcion.js` (/webhook) | | |

### 3.5 Módulo: Seguridad y Configuración

| ID | Requisito | Prioridad | Componente(s) | Cumple | Evidencia |
|---|---|---|---|---|---|
| RQ-025 | El sistema debe prevenir inyección SQL usando consultas parametrizadas | Alta | Todas las rutas (mysql2 `??`) | | |
| RQ-026 | El sistema debe usar variables de entorno para configuraciones sensibles en producción | Media | `config/conexion.js`, `config/correo.js`, `config/mercadopago.js` | | |
| RQ-027 | El sistema debe restringir el panel administrativo solo a usuarios con rol administrador | Alta | `rutas/home.js` (sesión admin) | | |
| RQ-028 | La base de datos debe usar charset utf8mb4 para soportar caracteres especiales | Media | `database/stream_pro_schema.sql` | | |

---

## 4. ESTADÍSTICAS DE TRAZABILIDAD

| Indicador | Valor |
|---|---|
| Total de requisitos | 28 |
| Requisitos cumplidos (S) | |
| Requisitos no cumplidos (N) | |
| Requisitos parciales (P) | |
| Porcentaje de cumplimiento | |

---

## 5. OBSERVACIONES

[Registre aquí requisitos faltantes, cambios solicitados, o requisitos nuevos identificados durante el desarrollo]

---

## 6. FIRMAS

| Rol | Nombre | Firma |
|---|---|---|
| Elaboró | | |
| Revisó | | |
| Aprobó | | |

---

*Formato basado en GFPI-F-135 V02 — Proceso de Gestión de Formación Profesional Integral SENA*
