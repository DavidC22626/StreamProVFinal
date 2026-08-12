# GUÍA PROCEDURAL DE MIGRACIÓN — STREAMPRO

## Proceso completo con diagramas de flujo, matrices de decisión y procedimientos

---

&nbsp;

**Evidencia:** GA10-220501097-AA9-EV01 — Documentación de plan de migración y respaldo de los datos del software

**Programa:** Análisis y Desarrollo de Software

**Centro de Formación:** Centro de Gestión de Mercados, Logística y Tecnologías de la Información

**Regional:** Distrito Capital

**SENA — Servicio Nacional de Aprendizaje**

**Aprendiz:** David Caicedo

**Año:** 2026

&nbsp;

&nbsp;

&nbsp;

---

## TABLA DE CONTENIDO

1. [Introducción](#introducción)
2. [Descripción del Sistema](#descripción-del-sistema)
3. [Evaluación de la Infraestructura Actual](#evaluación-de-la-infraestructura-actual)
4. [Escenarios de Migración](#escenarios-de-migración)
5. [Roles y Responsabilidades del Equipo](#roles-y-responsabilidades-del-equipo)
6. [Visión General del Proceso](#visión-general-del-proceso)
7. [Fase 1: Pre-Migración](#fase-1-pre-migración)
8. [Fase 2: Respaldo de Datos](#fase-2-respaldo-de-datos)
9. [Fase 3: Ejecución de la Migración](#fase-3-ejecución-de-la-migración)
10. [Fase 4: Post-Migración y Verificación](#fase-4-post-migración-y-verificación)
11. [Revisión de Modificaciones y Seguridad](#revisión-de-modificaciones-y-seguridad)
12. [Cronograma de Implementación](#cronograma-de-implementación)
13. [Procedimientos de Rollback](#procedimientos-de-rollback)
14. [Referencias Bibliográficas](#referencias-bibliográficas)

---

## 1. INTRODUCCIÓN

La migración de un sistema de software es un proceso crítico que implica trasladar una aplicación funcional desde un entorno operativo a otro, preservando la integridad de los datos, la continuidad del servicio y la seguridad de la información. Una migración mal ejecutada puede resultar en pérdida de datos, tiempos de inactividad prolongados y una mala experiencia para los usuarios.

Esta guía procedural presenta el proceso de migración para **StreamPro** — plataforma de streaming basada en Node.js, Express y MySQL — de una manera visual y estructurada, utilizando:

- **Diagramas de flujo ASCII** que muestran el flujo completo del proceso
- **Matrices de decisión** para evaluar rápidamente qué hacer en cada fase
- **Tablas de procedimientos** con pasos concretos, responsables y tiempos estimados
- **Mapas de configuración** que comparan el estado origen vs. destino

El documento está diseñado para que cualquier desarrollador o administrador pueda ejecutar una migración de StreamPro de manera controlada, trazable y segura.

---

## 2. DESCRIPCIÓN DEL SISTEMA

### Ficha Técnica de StreamPro

| Atributo | Valor |
|----------|-------|
| **Nombre** | StreamPro |
| **Versión** | 1.0.0 |
| **Tipo** | Plataforma de streaming audiovisual |
| **Arquitectura** | Node.js + Express 5 + MySQL 8 |
| **Autor** | David Caicedo — SENA |

### Stack Tecnológico Detallado

```
┌────────────────────────────────────────────────────────────┐
│                   STACK TECNOLÓGICO STREAMPRO              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  FRONTEND                                                  │
│  ┌────────────────────────────────────────────────────┐   │
│  │  EJS (Embedded JavaScript)  +  CSS  +  JS Cliente  │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  BACKEND                                                   │
│  ┌────────────────────────────────────────────────────┐   │
│  │  Node.js 22.x  +  Express 5.1.0                    │   │
│  │  • express-session 1.18.2  • bcrypt 6.0.0          │   │
│  │  • mysql2 3.15.3       • uuid 13.0.0               │   │
│  │  • cors 2.8.5                                      │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  SERVICIOS EXTERNOS                                        │
│  ┌────────────────────┐  ┌──────────────────────────┐     │
│  │  MercadoPago SDK   │  │  Nodemailer (Gmail SMTP) │     │
│  │  2.12.0            │  │  8.0.5                   │     │
│  └────────────────────┘  └──────────────────────────┘     │
│                                                            │
│  BASE DE DATOS                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │  MySQL 8.x (vía XAMPP)     BD: stream_pro         │   │
│  │  8 tablas: administradores, usuarios, peliculas,   │   │
│  │  series, temporadas, capitulos, suscripciones,     │   │
│  │  tokens_recuperacion                               │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Archivos Críticos del Proyecto

| Archivo | Propósito | ¿Requiere modificación en migración? |
|---------|-----------|:-----------------------------------:|
| `app.js` | Punto de entrada del servidor | Solo si cambia puerto o configuración core |
| `config/conexion.js` | Conexión a MySQL | **Sí** — nuevas credenciales de BD |
| `config/mercadopago.js` | Configuración de pagos | **Sí** — nuevos tokens de producción |
| `config/correo.js` | Configuración SMTP | **Sí** — nueva configuración de correo |
| `config/link.js` | URL base de la app | **Sí** — nuevo dominio o IP |
| `package.json` | Dependencias del proyecto | Solo si cambian versiones |
| `database/stream_pro_schema.sql` | Esquema de BD | Rara vez |

---

## 3. EVALUACIÓN DE LA INFRAESTRUCTURA ACTUAL

Antes de iniciar cualquier migración, es necesario evaluar tres aspectos fundamentales del entorno origen para dimensionar correctamente el esfuerzo, los riesgos y los recursos necesarios.

### 3.1 Volumen de Datos

Determinar la cantidad y el tamaño de los datos a migrar permite seleccionar el método de transferencia adecuado y estimar los tiempos.

| Componente | Ubicación | Método de medición | Tamaño típico |
|------------|-----------|-------------------|:-------------:|
| Base de datos MySQL | MySQL (XAMPP) | `SELECT COUNT(*) FROM cada_tabla` + peso del archivo mysqldump | 1 MB - 50 MB |
| Videos MP4 | `public/video/` | Propiedades de carpeta / `du -sh` | 100 MB - 5 GB |
| Portadas e imágenes | `public/portadas/` | Propiedades de carpeta / `du -sh` | 10 MB - 500 MB |
| Código fuente | `app.js`, `rutas/`, `views/`, `public/css/`, `public/js/` | Propiedades de carpeta | < 5 MB |
| Configuración | `config/` | Propiedades de carpeta | < 10 KB |
| **Total estimado** | | | **111 MB - 5.5 GB** |

**Herramientas para medir:**
- **Windows:** Click derecho en carpeta → Propiedades, o `dir` en PowerShell
- **Linux:** `du -sh /ruta/de/la/carpeta`
- **MySQL:** `SELECT table_schema "BD", ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) "Tamaño MB" FROM information_schema.tables WHERE table_schema = 'stream_pro' GROUP BY table_schema;`

### 3.2 Disponibilidad y Tiempo de Inactividad

| Factor | Pregunta clave | Impacto |
|--------|---------------|---------|
| Ventana de migración | ¿Cuánto tiempo puede estar el servicio caído? | Define si la migración debe ser nocturna o en fin de semana |
| Usuarios activos | ¿Hay usuarios usando la app 24/7? | Determina la necesidad de notificar con antelación |
| Servicios externos | ¿MercadoPago, SMTP, CDN dependen de IP fija? | Puede requerir coordinación con terceros |
| Tolerancia a pérdida | ¿Cuántos datos se pueden perder como máximo? | Define la frecuencia de los backups durante la migración |

**Criterio para StreamPro:** Se estima un máximo de **4 horas** de inactividad permitida, idealmente en horario de baja actividad (ej: domingo 2:00 AM - 6:00 AM).

### 3.3 Seguridad

| Riesgo | Probabilidad | Impacto | Medida de mitigación |
|--------|:-----------:|:-------:|----------------------|
| Interceptación de datos durante la transferencia | Baja | Alto | Usar SCP, SFTP o HTTPS para transferencias; evitar FTP plano |
| Exposición de credenciales en archivos de configuración | Media | Alto | No incluir `config/*.js` en repositorios públicos; usar `.gitignore` |
| Acceso no autorizado a backups | Media | Alto | Cifrar backups con AES-256; almacenar en ubicación segura |
| Pérdida de datos por backup corrupto | Baja | Crítico | Verificar checksums; mantener 2 copias en ubicaciones diferentes |
| Fuga de datos personales de usuarios | Baja | Crítico | Minimizar datos exportados; anonimizar si es posible |

---

## 4. ESCENARIOS DE MIGRACIÓN

### Matriz de Escenarios

```
┌────────────┬────────────────────────────────┬──────────────────────────┬──────────────────┐
│ ESCENARIO  │            ORIGEN              │         DESTINO          │  RIESGO ESTIMADO │
├────────────┼────────────────────────────────┼──────────────────────────┼──────────────────┤
│            │                                │                          │                  │
│  E1        │ Windows + XAMPP (MySQL)        │ Ubuntu Server + MySQL    │    ●●●●○ Alto    │
│  Local→VPS │ Node.js localhost:3000         │ PM2 + Nginx proxy inverso│                  │
│            │                                │                          │                  │
│  E2        │ Archivos en disco local        │ Amazon S3 + CloudFront   │    ●●●○○ Medio   │
│  CDN       │ public/video/  public/portadas/│ URLs públicas CDN        │                  │
│            │                                │                          │                  │
│  E3        │ Node.js 22.x                   │ Node.js 24.x             │    ●●○○○ Bajo    │
│  Versión   │                                │                          │                  │
│  Node      │                                │                          │                  │
│            │                                │                          │                  │
│  E4        │ MySQL 8 (XAMPP)                │ MySQL 9                  │    ●●●○○ Medio   │
│  Versión   │                                │                          │                  │
│  MySQL     │                                │                          │                  │
│            │                                │                          │                          │
│  E5        │ PC personal del desarrollador  │ PC de reemplazo          │    ●●○○○ Bajo    │
│  Equipo    │                                │                          │                  │
└────────────┴────────────────────────────────┴──────────────────────────┴──────────────────┘
```

### Navegación Rápida por Escenario

| Si tu migración es... | Comienza en... | Saltos recomendados |
|-----------------------|----------------|---------------------|
| Local (Windows/XAMPP) → Servidor en la nube | **Fase 1 (PRE)** completa | Todas las fases aplican |
| Solo cambiar almacenamiento de videos a CDN | **Fase 2 (BKP)** | PRE parcial, MIG parcial, POST parcial |
| Actualizar Node.js a nueva versión | **Fase 1** (PRE parcial) | BKP no aplica, MIG parcial, POST funcional |
| Cambiar de PC de desarrollo | **Fase 2** completa + **Fase 3** | Procedimiento estándar |

---

## 5. ROLES Y RESPONSABILIDADES DEL EQUIPO

Cada migración debe contar con un equipo claramente definido. Para StreamPro se establecen los siguientes roles:

### 5.1 Asignación de Roles

| Rol | Responsable por defecto | Función principal |
|-----|------------------------|-------------------|
| **Administrador de Datos** | Propietario del proyecto / Líder técnico | Supervisar la migración de datos y la integridad de los respaldos. Autorizar el pase a producción. |
| **Desarrollador de Software** | Programador asignado | Adaptar el software al nuevo sistema, modificar configuraciones, ejecutar pruebas de integración. |
| **Equipo de Seguridad** | Administrador del sistema | Garantizar la seguridad de los datos durante la migración y el almacenamiento. Verificar cifrado, accesos y cumplimiento. |

### 5.2 Matriz de Responsabilidades por Actividad

| Actividad | Administrador de Datos | Desarrollador | Equipo de Seguridad |
|-----------|:---------------------:|:-------------:|:-------------------:|
| Evaluar infraestructura actual | **R** | C | C |
| Definir volumen de datos y ventana de migración | **R** | C | I |
| Realizar backup de base de datos | I | **R** | I |
| Verificar integridad de backups | **R** | C | I |
| Cifrar y almacenar backups de forma segura | A | C | **R** |
| Transferir archivos al entorno destino | I | **R** | I |
| Configurar conexiones y credenciales en destino | I | **R** | A |
| Ejecutar pruebas unitarias | I | **R** | I |
| Ejecutar pruebas de integración | C | **R** | I |
| Ejecutar pruebas de carga | **R** | C | I |
| Verificar seguridad de datos migrados | C | I | **R** |
| Ejecutar plan de rollback si es necesario | **R** | C | C |
| Generar acta de cierre de migración | **R** | C | I |

**Leyenda:** R = Responsable, A = Aprueba, C = Consultado, I = Informado

---

## 6. VISIÓN GENERAL DEL PROCESO

### Diagrama de Flujo General de la Migración

```
                        ┌──────────────────────┐
                        │  INICIO DE MIGRACIÓN  │
                        └──────────┬───────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │   FASE 1: PRE-MIGRACIÓN      │
                    │  • Inventario de entorno      │
          ┌─────────│  • Verificación de requisitos │─────────┐
          │         │  • Plan de contingencia       │         │
          │         │  • Notificación a usuarios    │         │
          │         └──────────────┬───────────────┘         │
          │                        │                         │
          │                        ▼                         │
          │         ┌──────────────────────────────┐         │
          │         │   ¿Todo listo para iniciar?   │         │
          │         └──────────────┬───────────────┘         │
          │                        │                         │
          │                   Sí   │   No                    │
          │                        ▼                         │
          │         ┌──────────────────────────────┐         │
          │         │   FASE 2: RESPALDO DE DATOS  │         │
          │         │  • Backup completo de BD     │         │
          │◄────────│  • Backup de configuración   │─────────┘
          │         │  • Backup de archivos        │
          │         │  • Verificación de integridad│
          │         └──────────────┬───────────────┘
          │                        │
          │                        ▼
          │         ┌──────────────────────────────┐
          │         │  ¿Backups verificados?        │
          │         └──────────────┬───────────────┘
          │                        │
          │                   Sí   │   No
          │                        ▼
          │         ┌──────────────────────────────┐
          │         │  FASE 3: EJECUCIÓN           │
          │         │  • Detener servicio origen   │
          │         │  • Transferir archivos       │         ────┐
          │         │  • Restaurar BD en destino   │            │
          │         │  • Configurar entorno        │            │
          │         │  • Iniciar servicio destino  │         ────┘
          │         └──────────────┬───────────────┘
          │                        │
          │                        ▼
          │         ┌──────────────────────────────┐
          │         │   FASE 4: POST-MIGRACIÓN     │
          │         │  • Pruebas funcionales       │
          │         │  • Pruebas de integración    │
          │         │  • Pruebas de rendimiento    │
          │         │  • Monitoreo 24h             │
          │         └──────────────┬───────────────┘
          │                        │
          │                        ▼
          │         ┌──────────────────────────────┐
          │         │  ¿Resultados exitosos?        │
          │         └──────────────┬───────────────┘
          │                        │
          │                   Sí   │   No
          │                        ▼                  │
          │         ┌──────────────────────────────┐  │
          │         │   MIGRACIÓN COMPLETADA       │  │
          │         │   Generar acta de cierre     │  │
          │         └──────────────────────────────┘  │
          │                                          │
          └──────────────────────────────────────────┘
                     (Volver a fase que falló)
```

---

## 7. FASE 1: PRE-MIGRACIÓN

### Diagrama de Flujo de Pre-Migración

```
┌─────────────────────────────────────────────────────────────────────┐
│                  FASE 1: PRE-MIGRACIÓN                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│  │  INVENTARIO  │    │  REQUISITOS  │    │  PLAN DE CONTINGENCIA│  │
│  │  DEL ORIGEN  │───▶│  DEL DESTINO │───▶│  Y NOTIFICACIÓN      │  │
│  └──────────────┘    └──────────────┘    └──────────────────────┘  │
│         │                   │                       │               │
│         ▼                   ▼                       ▼               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│  │ Node, MySQL, │    │ Espacio,     │    │ Rollback documentado │  │
│  │ deps, conf,  │    │ software,    │    │ Usuarios notificados │  │
│  │ servicios    │    │ conectividad │    │                       │  │
│  └──────────────┘    └──────────────┘    └──────────────────────┘  │
│                                                                     │
│  RESULTADO: ✔ Línea base documentada  ✔ Entorno destino listo      │
│             ✔ Plan de contingencia   ✔ Usuarios informados          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Matriz de Verificación de Pre-Migración

| # | Actividad | ¿Qué revisar? | Herramienta / Comando | Responsable | Tiempo estimado |
|---|-----------|---------------|----------------------|-------------|:---------------:|
| 1 | Inventario de versión Node.js | `node -v` debe ser ≥ 22.x | Terminal (cmd/PowerShell) | Desarrollador | 5 min |
| 2 | Inventario de versión MySQL | `mysql --version` debe ser ≥ 8.x | MySQL CLI o phpMyAdmin | Desarrollador | 5 min |
| 3 | Inventario de dependencias | `npm list --depth=0` sin errores | Terminal | Desarrollador | 5 min |
| 4 | Documentar configuración actual | Capturar credenciales MP, SMTP, URL | Editor de texto | Desarrollador | 15 min |
| 5 | Verificar espacio en disco destino | ≥ 10 GB libres | `df -h` (Linux) / Administrador de tareas (Win) | Administrador | 5 min |
| 6 | Instalar software base en destino | Node.js, MySQL/Cliente MySQL, PM2 | Gestor de paquetes (apt, choco) | Administrador | 30 min |
| 7 | Verificar conectividad de red | Ping, puertos 3306, 22, 80/443 | `ping`, `telnet`, `Test-NetConnection` | Administrador | 10 min |
| 8 | Crear BD vacía en destino | `CREATE DATABASE stream_pro ...` | MySQL CLI / phpMyAdmin | Administrador | 5 min |
| 9 | Elaborar plan de rollback | Documento con pasos de reversión | Editor de texto | Administrador | 30 min |
| 10 | Notificar a usuarios | Correo o comunicado con ventana de migración | Gmail / sistema de tickets | Administrador | 15 min |
| 11 | Preparar entorno de pruebas en destino | `npm install` en el directorio destino | Terminal | Desarrollador | 15 min |

**Tiempo total estimado de la fase:** ~2 horas

### Decisión de Continuación

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Puedo pasar a la Fase 2 (Respaldo)?                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✔ SÍ — cuando todos los ítems 1-11 están completados           │
│         y no hay bloqueantes                                     │
│                                                                 │
│  ✘ NO — si hay algún ítem crítico pendiente:                    │
│         • Falta de espacio en disco destino                      │
│         • Software base no instalado en destino                  │
│         • Sin plan de rollback                                   │
│         • Sin conectividad de red                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. FASE 2: RESPALDO DE DATOS

### Diagrama de Flujo de Respaldo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     FASE 2: RESPALDO DE DATOS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────┐ │
│  │  BACKUP BD   │───▶│  BACKUP      │───▶│  BACKUP      │───▶│ BACKUP    │ │
│  │  (MySQL)     │    │  CONFIGURACIÓN│    │  MULTIMEDIA  │    │ CÓDIGO    │ │
│  └──────────────┘    └──────────────┘    └──────────────┘    └───────────┘ │
│         │                   │                   │                │          │
│         ▼                   ▼                   ▼                ▼          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────┐ │
│  │ mysqldump    │    │ conexion.js  │    │ public/video/│    │ app.js    │ │
│  │ stream_pro   │    │ mercadopago  │    │ public/      │    │ rutas/    │ │
│  │ → .sql       │    │ .js, correo  │    │ portadas/    │    │ views/    │ │
│  │              │    │ .js, link.js │    │              │    │ public/*  │ │
│  └──────────────┘    └──────────────┘    └──────────────┘    └───────────┘ │
│         │                   │                   │                │          │
│         └───────────────────┴───────────────────┴────────────────┘          │
│                             │                                               │
│                             ▼                                               │
│              ┌─────────────────────────────────────┐                        │
│              │  VERIFICACIÓN DE INTEGRIDAD         │                        │
│              │  • Checksum (SHA256)                │                        │
│              │  • Restauración de prueba           │                        │
│              │  • Almacenamiento externo (2 copias)│                        │
│              └─────────────────────────────────────┘                        │
│                                                                             │
│  RESULTADO: ✔ Backups completos y verificados  ✔ Almacenados de forma segura│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mapa de Archivos a Respaldar

```
┌─────────────────────────────────────────────────────────────────────────────┐
│               MAPA DE RESPALDO — STREAMPRO                                   │
├──────────────┬──────────────────────┬───────────────────┬───────────────────┤
│  COMPONENTE  │  UBICACIÓN ORIGEN    │  COMANDO / MÉTODO │  TAMAÑO ESTIMADO  │
├──────────────┼──────────────────────┼───────────────────┼───────────────────┤
│              │                      │                   │                   │
│  Base de     │ MySQL (XAMPP)        │ mysqldump -u root │   1 MB - 50 MB    │
│  datos       │ BD: stream_pro       │ stream_pro >      │   (según datos)   │
│              │                      │ backup.sql        │                   │
│              │                      │                   │                   │
│  Config.     │ config/conexion.js   │ Copia directa     │   < 10 KB         │
│  aplicación  │ config/mercadopago.js│ (Ctrl+C / cp)     │                   │
│              │ config/correo.js     │                   │                   │
│              │ config/link.js       │                   │                   │
│              │                      │                   │                   │
│  Videos      │ public/video/        │ Copia directa     │   Variable        │
│              │                      │                   │   (100 MB - 5 GB) │
│              │                      │                   │                   │
│  Portadas    │ public/portadas/     │ Copia directa     │   10 MB - 500 MB  │
│              │                      │                   │                   │
│  Código      │ app.js, rutas/,      │ Git push /        │   < 5 MB          │
│  fuente      │ views/, public/css/, │ Copia directa     │                   │
│              │ public/js/,          │                   │                   │
│              │ package.json         │                   │                   │
│              │                      │                   │                   │
└──────────────┴──────────────────────┴───────────────────┴───────────────────┘
```

### Matriz de Verificación de Respaldo

| # | Actividad | Comando / Procedimiento | Criterio de éxito | Tiempo |
|---|-----------|------------------------|-------------------|:------:|
| 1 | Backup de BD | `mysqldump -u root stream_pro > stream_pro_backup_[fecha].sql` | Archivo .sql generado, peso > 0 KB | 5 min |
| 2 | Verificar integridad del backup | `mysql -u root stream_pro_test < backup.sql` + `SHOW TABLES;` | 8 tablas creadas sin errores | 5 min |
| 3 | Backup de configuración | Copiar archivos de `config/` a carpeta de backup | 4 archivos copiados verificados | 5 min |
| 4 | Backup de multimedia | Copiar `public/video/` y `public/portadas/` | Mismo número de archivos que origen | 15 min |
| 5 | Backup de código fuente | Copiar `app.js`, `rutas/`, `views/`, `public/css/`, `public/js/`, `package.json` | Misma estructura de directorios | 10 min |
| 6 | Generar checksums | `sha256sum archivo > checksum.sha256` (Linux) / `Get-FileHash` (PowerShell) | Archivo de checksums generado | 5 min |
| 7 | Almacenar en ubicación segura | Copiar backups a disco externo + nube | 2 copias verificadas como accesibles | 10 min |
| 8 | Documentar respaldo | Registrar ruta, fecha y responsable en acta | Acta diligenciada | 5 min |

**Tiempo total estimado de la fase:** ~50 min

### Decisión de Continuación

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Puedo pasar a la Fase 3 (Ejecución)?                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✔ SÍ — cuando:                                                 │
│     • Backup de BD verificado (restauración de prueba exitosa)  │
│     • Backups almacenados en 2 ubicaciones                      │
│     • Checksums registrados                                     │
│                                                                 │
│  ✘ NO — si:                                                     │
│     • El backup de BD tiene errores                             │
│     • No hay almacenamiento externo disponible                  │
│     • Faltan archivos críticos en el backup                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. FASE 3: EJECUCIÓN DE LA MIGRACIÓN

### Diagrama de Flujo de Ejecución

```
┌────────────────────────────────────────────────────────────────────────────┐
│                 FASE 3: EJECUCIÓN DE LA MIGRACIÓN                           │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────────────────┐                                          │
│  │  1. DETENER SERVICIO ORIGEN  │                                          │
│  │  Ctrl+C / pm2 stop streampro │                                          │
│  │  Verificar: localhost:3000   │                                          │
│  │  no responde                 │                                          │
│  └─────────────┬────────────────┘                                          │
│                │                                                           │
│                ▼                                                           │
│  ┌──────────────────────────────┐                                          │
│  │  2. TRANSFERIR ARCHIVOS      │                                          │
│  │  SCP / rsync / USB / copia   │                                          │
│  │  red → todo el proyecto      │                                          │
│  └─────────────┬────────────────┘                                          │
│                │                                                           │
│                ▼                                                           │
│  ┌──────────────────────────────┐    ┌──────────────────────────────────┐  │
│  │  3. RESTAURAR BD EN DESTINO  │    │  4. CONFIGURAR ENTORNO DESTINO   │  │
│  │  mysql -u root stream_pro    │    │  • conexion.js (nuevas creds)    │  │
│  │  < backup.sql                │    │  • mercadopago.js                │  │
│  │  Verificar: SHOW TABLES (8)  │    │  • correo.js, link.js            │  │
│  └─────────────┬────────────────┘    │  • npm install                   │  │
│                │                     └──────────────┬───────────────────┘  │
│                │                                    │                      │
│                └────────────────┬───────────────────┘                      │
│                                 ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  5. INICIAR SERVICIO EN DESTINO                                      │  │
│  │  node app.js  →  Debe mostrar: "conexion exitosa" + "puerto 3000"   │  │
│  │  (Opcional) Configurar PM2: pm2 start app.js --name streampro        │  │
│  │  (Opcional) Configurar Nginx + SSL                                   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  RESULTADO: ✔ Aplicación corriendo en el nuevo entorno                    │
│             ✔ Base de datos conectada y operativa                         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Decisión de Continuación

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Puedo pasar a la Fase 4 (Post-Migración)?                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✔ SÍ — cuando:                                                 │
│     • node app.js muestra "conexion exitosa"                    │
│     • node app.js muestra "http://localhost:3000"               │
│     • El navegador carga la página principal sin errores        │
│                                                                 │
│  ✘ NO — si:                                                     │
│     • Error de conexión a base de datos                         │
│     • Puerto en uso o bloqueado                                 │
│     • Dependencias faltantes (npm install falló)                │
│     • Las rutas de archivos multimedia no coinciden             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. FASE 4: POST-MIGRACIÓN Y VERIFICACIÓN

### Mapa de Pruebas por Módulo

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                  MAPA DE PRUEBAS — STREAMPRO                                  │
├──────────────┬──────────────────────┬───────────────────┬────────────────────┤
│  MÓDULO      │  QUÉ PROBAR          │  CÓMO PROBARLO    │  RESULTADO ESPERADO│
├──────────────┼──────────────────────┼───────────────────┼────────────────────┤
│              │                      │                   │                    │
│  Landing     │ Carga de página      │ Navegar a /       │ Página completa,   │
│  Page        │ principal            │                   │ sin errores 404    │
│              │                      │                   │                    │
│  Login       │ Autenticación        │ POST /login       │ Redirección a      │
│              │ usuario y admin      │ con credenciales  │ /home              │
│              │                      │                   │                    │
│  Registro    │ Crear cuenta nueva   │ POST              │ Registro en BD +   │
│              │                      │ /registerUser     │ redirección        │
│              │                      │                   │                    │
│  Dashboard   │ Catálogo visible     │ GET /home         │ Películas/series   │
│              │                      │ (autenticado)     │ por categorías     │
│              │                      │                   │                    │
│  Reproductor │ Video MP4 funciona   │ Clic en película  │ Video se reproduce │
│  de video    │                      │ o capítulo        │ sin errores        │
│              │                      │                   │                    │
│  CRUD        │ Crear/Leer/Actualizar│ Endpoints API     │ BD refleja cambios  │
│  Películas   │ Eliminar             │ CRUD              │                    │
│              │                      │                   │                    │
│  CRUD Series │ CRUD + cascada       │ Endpoints API     │ Al eliminar serie, │
│              │                      │ CRUD              │ se borran temp y   │
│              │                      │                   │ caps               │
│              │                      │                   │                    │
│  MercadoPago │ Crear preferencia    │ POST              │ Redirección a MP   │
│              │ Webhook              │ /crear-suscripcion│ Estado actualizado  │
│              │                      │                   │                    │
│  Correo      │ Enviar token         │ POST /enviar-token│ Correo recibido    │
│              │ Verificar token      │                   │ con token 8 dígitos│
│              │ Cambiar password     │                   │                    │
│              │                      │                   │                    │
│  Sesiones    │ Persistencia         │ Navegar 5 páginas │ Sesión se mantiene │
│              │ Cierre de sesión     │ Cerrar sesión     │ /home bloqueado    │
│              │                      │                   │                    │
│  Carga       │ Comportamiento con   │ Abrir 10          │ Sin errores 500,   │
│  (Stress)    │ alto volumen de      │ pestañas          │ 503, ni timeout    │
│              │ usuarios simulados   │ simultáneas,      │ Tiempo de respuesta│
│              │                      │ reproducir        │ < 2s en cada una   │
│              │                      │ videos en 5       │                    │
└──────────────┴──────────────────────┴───────────────────┴────────────────────┘
```

### Matriz de Pruebas de Rendimiento

| Prueba | Herramienta | Criterio de aceptación |
|--------|-------------|------------------------|
| Tiempo de carga de página principal | Navegador (F12 → Network) | < 3 segundos |
| Tiempo de respuesta de API (GET) | Postman / curl | < 500 ms |
| Reproducción de video | Navegador | Sin buffering excesivo (> 5s) |
| Uso de CPU durante reproducción | Administrador de tareas / `top` | < 70% |
| Consumo de RAM | Administrador de tareas / `top` | < 512 MB |
| Conexiones concurrentes | Prueba con múltiples pestañas | Sin errores 503 |
| Prueba de carga (10 usuarios simultáneos) | Pestañas de navegador + monitoreo de logs | Sin errores 500/503/504, tiempo de respuesta < 2s |
| Pico de estrés (reproducción de 5 videos en paralelo) | Abrir 5 pestañas reproduciendo video | CPU < 85%, RAM < 1 GB, sin cortes de video |

### Ventana de Monitoreo Post-Migración

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    MONITOREO POST-MIGRACIÓN (24 HORAS)                      │
├─────────────┬──────────┬──────────┬──────────┬──────────┬──────────┬───────┤
│             │  HORA 0  │  HORA 4  │  HORA 8  │  HORA 12 │  HORA 18 │ HORA  │
│             │          │          │          │          │          │  24   │
├─────────────┼──────────┼──────────┼──────────┼──────────┼──────────┼───────┤
│ Logs de     │    ✔     │    ✔     │    ✔     │    ✔     │    ✔     │   ✔   │
│ aplicación  │          │          │          │          │          │       │
│ (sin errors)│          │          │          │          │          │       │
│             │          │          │          │          │          │       │
│ Servicios   │    ✔     │    ✔     │    ✔     │    ✔     │    ✔     │   ✔   │
│ externos    │          │          │          │          │          │       │
│ (MP, SMTP)  │          │          │          │          │          │       │
│             │          │          │          │          │          │       │
│ Uso de      │    ✔     │    ✔     │          │    ✔     │          │   ✔   │
│ recursos    │          │          │          │          │          │       │
│ (CPU/RAM)   │          │          │          │          │          │       │
│             │          │          │          │          │          │       │
│ Tiempo de   │    ✔     │          │    ✔     │          │    ✔     │   ✔   │
│ respuesta   │          │          │          │          │          │       │
│             │          │          │          │          │          │       │
└─────────────┴──────────┴──────────┴──────────┴──────────┴──────────┴───────┘
```

---

## 11. REVISIÓN DE MODIFICACIONES Y SEGURIDAD

### Matriz de Cambios Realizados

```
┌───────────────────────────────────────────────────────────────────────────────┐
│              REGISTRO DE MODIFICACIONES DURANTE LA MIGRACIÓN                  │
├──────────────┬────────────┬──────────────┬──────────┬────────────┬───────────┤
│  ARCHIVO     │  CAMBIO    │  JUSTIFICACIÓN│  ANTES   │  DESPUÉS   │  APROBADO │
│              │  REALIZADO │              │          │            │           │
├──────────────┼────────────┼──────────────┼──────────┼────────────┼───────────┤
│              │            │              │          │            │           │
│ config/      │ Nuevas     │ Nueva BD en  │ host:    │ host:      │  ✔/✘     │
│ conexion.js  │ credenciales│ servidor     │ localhost│ 203.0.113.5│           │
│              │            │ destino      │ user:    │ user:      │           │
│              │            │              │ root     │ streampro  │           │
│              │            │              │ pass: '' │ pass: [***]│           │
│              │            │              │          │            │           │
│ config/      │ Nuevo       │ Cambio a     │ token    │ token      │  ✔/✘     │
│ mercadopago  │ access_token│ entorno de   │ test     │ producción │           │
│ .js          │            │ producción   │          │            │           │
│              │            │              │          │            │           │
│ config/      │ Nueva       │ Nueva        │ user:    │ user:      │  ✔/✘     │
│ correo.js    │ conf. SMTP  │ config. de   │ sena@    │ admin@     │           │
│              │            │ correo       │ gmail    │ streampro  │           │
│              │            │              │          │ .com       │           │
│              │            │              │          │            │           │
│ config/      │ Nueva URL   │ Nuevo        │ http://  │ https://   │  ✔/✘     │
│ link.js      │ base       │ dominio      │ localhost│ streampro  │           │
│              │            │              │ :3000    │ .dominio   │           │
│              │            │              │          │ .com       │           │
│              │            │              │          │            │           │
└──────────────┴────────────┴──────────────┴──────────┴────────────┴───────────┘
```

### Lista de Verificación de Seguridad

```
┌────────────────────────────────────────────────────────────────────────────┐
│                 VERIFICACIONES DE SEGURIDAD POST-MIGRACIÓN                 │
├──────┬──────────────────────────────────────┬──────────┬───────────────────┤
│  #   │  VERIFICACIÓN                        │  ESTADO  │  EVIDENCIA        │
├──────┼──────────────────────────────────────┼──────────┼───────────────────┤
│      │                                      │          │                   │
│  1   │ Contraseñas en BD con hash bcrypt    │  ✔/✘    │  SELECT * FROM    │
│      │ (campo passw_user inicia con $2b$)   │          │  usuarios LIMIT 1 │
│      │                                      │          │                   │
│  2   │ MySQL con contraseña (no vacía)      │  ✔/✘    │  mysql -u root -p │
│      │ en entorno de producción             │          │                   │
│      │                                      │          │                   │
│  3   │ Claves de MercadoPago no expuestas   │  ✔/✘    │  Revisar vistas   │
│      │ en el frontend                       │          │  .ejs y JS público│
│      │                                      │          │                   │
│  4   │ express-session con httpOnly: true   │  ✔/✘    │  Revisar app.js   │
│      │ secure: true (si HTTPS)              │          │                   │
│      │                                      │          │                   │
│  5   │ .gitignore excluye archivos de       │  ✔/✘    │  Revisar .gitignore│
│      │ configuración con credenciales       │          │                   │
│      │                                      │          │                   │
│  6   │ npm audit: 0 vulnerabilidades        │  ✔/✘    │  npm audit         │
│      │ críticas o altas                     │          │                   │
│      │                                      │          │                   │
│  7   │ Backups cifrados o protegidos        │  ✔/✘    │  Verificar método │
│      │                                      │          │  de protección    │
│      │                                      │          │                   │
│  8   │ Sin información de versión en        │  ✔/✘    │  curl -I,         │
│      │ headers HTTP                         │          │  revisar headers  │
│      │                                      │          │                   │
│  9   │ Datos personales de usuarios         │  ✔/✘    │  Revisar columnas │
│      │ protegidos (solo datos necesarios)   │          │  en tabla usuarios│
│      │                                      │          │                   │
└──────┴──────────────────────────────────────┴──────────┴───────────────────┘
```

---

## 12. CRONOGRAMA DE IMPLEMENTACIÓN

El cronograma de implementación organiza las actividades de migración en 4 fases secuenciales, desde la planificación inicial hasta la puesta en producción del nuevo entorno.

### 12.1 Diagrama de Fases del Cronograma

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                         CRONOGRAMA DE IMPLEMENTACIÓN                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  FASE 1: PLANIFICACIÓN (Días 1-3)                                                    │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │  Actividades:                                                                  │   │
│  │  • Definir alcance y objetivos de la migración                                │   │
│  │  • Evaluar infraestructura actual (volumen, disponibilidad, seguridad)        │   │
│  │  • Seleccionar escenario de migración (E1-E5)                                 │   │
│  │  • Asignar roles y responsabilidades del equipo                               │   │
│  │  • Elaborar plan de contingencia y rollback                                   │   │
│  │  • Notificar a usuarios sobre la ventana de migración                         │   │
│  │  Entregable: Documento de plan de migración aprobado                          │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                           ▼                                                         │
│  FASE 2: DESARROLLO (Días 4-6)                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │  Actividades:                                                                  │   │
│  │  • Instalar y configurar software base en el entorno destino                  │   │
│  │  • Realizar backup completo de BD, configuración, multimedia y código        │   │
│  │  • Verificar integridad de backups (checksum + restauración de prueba)       │   │
│  │  • Almacenar backups en ubicación segura (2 copias)                           │   │
│  │  • Transferir archivos al entorno destino                                     │   │
│  │  • Configurar conexiones, credenciales y dependencias en destino              │   │
│  │  Entregable: Entorno destino preparado y verificado                           │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                           ▼                                                         │
│  FASE 3: PRUEBAS (Días 7-8)                                                         │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │  Actividades:                                                                  │   │
│  │  • Pruebas unitarias: verificar cada componente individualmente               │   │
│  │  • Pruebas de integración: evaluar interacción entre componentes              │   │
│  │  • Pruebas de carga: simular alto volumen de usuarios                         │   │
│  │  • Pruebas de seguridad: verificar cifrado, accesos, vulnerabilidades        │   │
│  │  • Pruebas de regresión: confirmar que todo funciona como antes               │   │
│  │  Entregable: Informe de pruebas con resultado APROBADO                        │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                           ▼                                                         │
│  FASE 4: IMPLEMENTACIÓN (Días 9-10)                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │  Actividades:                                                                  │   │
│  │  • Detener servicio en entorno origen                                         │   │
│  │  • Transferir datos al sistema de producción (corte final)                   │   │
│  │  • Iniciar servicio en entorno destino                                        │   │
│  │  • Activar nuevo entorno y redirigir tráfico                                  │   │
│  │  • Monitorear sistema durante 24 horas                                        │   │
│  │  • Generar acta de cierre de migración                                        │   │
│  │  Entregable: Sistema migrado + Acta de cierre firmada                        │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 12.2 Tabla de Tiempos por Fase

| Fase | Días | Duración estimada | Responsable principal | Hitos |
|------|:----:|:-----------------:|----------------------|-------|
| **Planificación** | 1-3 | 3 días | Administrador de Datos | Plan aprobado, roles asignados, usuarios notificados |
| **Desarrollo** | 4-6 | 3 días | Desarrollador de Software | Backups verificados, entorno destino listo |
| **Pruebas** | 7-8 | 2 días | Desarrollador + Equipo de Seguridad | Informe de pruebas aprobado |
| **Implementación** | 9-10 | 2 días | Administrador de Datos | Sistema migrado, acta firmada, monitoreo activo |
| **Total** | **1-10** | **10 días** | | |

### 12.3 Hitos Clave

| Hito | Fecha estimada | Criterio de éxito |
|------|:-------------:|-------------------|
| H1: Plan aprobado | Día 3 | Plan de migración firmado por Administrador de Datos |
| H2: Backups verificados | Día 6 | Restauración de prueba exitosa + checksums registrados |
| H3: Pruebas superadas | Día 8 | 100% de pruebas unitarias, integración y carga aprobadas |
| H4: Migración completada | Día 10 | App funcionando en destino + acta de cierre firmada |

### 12.4 Plan de Contingencia del Cronograma

| Riesgo | Impacto | Acción |
|--------|---------|--------|
| Falla de hardware en el destino | Retraso de 2-3 días | Solicitar nuevo VPS o servidor; extender cronograma |
| Incompatibilidad de dependencias | Retraso de 1-2 días | Revertir a versión anterior y documentar incompatibilidad |
| Pérdida de datos durante la transferencia | Retraso de 1 día | Restaurar desde backup, verificar integridad, reintentar |
| Enfermedad del responsable clave | Retraso de 2-5 días | Activar rol secundario; todo debe tener al menos 2 personas capacitadas |

---

## 13. PROCEDIMIENTOS DE ROLLBACK

### Matriz de Rollback por Escenario

```
┌────────────┬──────────────────────────────────────┬─────────────────────┬──────────┐
│ ESCENARIO  │  CONDICIÓN QUE ACTIVA ROLLBACK       │  ACCIÓN DE ROLLBACK │ TIEMPO   │
├────────────┼──────────────────────────────────────┼─────────────────────┼──────────┤
│            │                                      │                     │          │
│  E1        │ • La app no inicia en el destino     │ 1. Restaurar DNS/   │ 30 min   │
│  Local→VPS │ • Error de conexión a BD             │    IP al servidor   │          │
│            │ • Pérdida de datos verificada        │    origen           │          │
│            │ • Rendimiento inaceptable            │ 2. Restaurar BD en  │          │
│            │                                      │    origen desde     │          │
│            │                                      │    backup           │          │
│            │                                      │ 3. Iniciar servicio │          │
│            │                                      │    en origen        │          │
│            │                                      │                     │          │
│  E2        │ • Los videos no se reproducen        │ 1. Revertir rutas   │ 15 min   │
│  CDN       │ • Tiempo de carga excesivo           │    en BD a rutas    │          │
│            │ • Archivos corruptos en CDN          │    locales          │          │
│            │                                      │ 2. UPDATE peliculas │          │
│            │                                      │    SET ruta_pel =   │          │
│            │                                      │    valor_anterior   │          │
│            │                                      │                     │          │
│  E3/E4     │ • Incompatibilidad de dependencias   │ 1. Reinstalar       │ 20 min   │
│  Versión   │ • Funcionalidades críticas rotas     │    versión anterior │          │
│            │                                      │ 2. Restaurar        │          │
│            │                                      │    package.json     │          │
│            │                                      │    desde backup     │          │
│            │                                      │ 3. npm install      │          │
│            │                                      │                     │          │
│  E5        │ • Equipo nuevo no cumple requisitos  │ 1. Volver al equipo │ 10 min   │
│  Equipo    │ • Controladores incompatibles        │    anterior         │          │
│            │                                      │ 2. Re-evaluar       │          │
│            │                                      │    requisitos       │          │
│            │                                      │                     │          │
└────────────┴──────────────────────────────────────┴─────────────────────┴──────────┘
```

### Procedimiento de Rollback General

```
┌────────────────────────────────────────────────────────────────────────────┐
│                 PROCEDIMIENTO DE ROLLBACK — PASO A PASO                     │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  PASO 1: DETECTAR                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Identificar la condición que activa el rollback.                    │   │
│  │ Registrar el incidente y la hora exacta.                            │   │
│  │ Notificar al administrador del sistema.                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              ▼                                              │
│  PASO 2: DECIDIR                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ¿Rollback completo o parcial?                                       │   │
│  │ • Completo: volver al entorno origen al 100%                        │   │
│  │ • Parcial: revertir solo el componente que falló (BD, código, conf) │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              ▼                                              │
│  PASO 3: EJECUTAR                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Según la decisión:                                                   │   │
│  │ • Restaurar BD desde backup: mysql -u root stream_pro < backup.sql  │   │
│  │ • Restaurar archivos desde backup                                   │   │
│  │ • Revertir cambios de configuración                                 │   │
│  │ • Volver a apuntar DNS/IP al servidor origen                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              ▼                                              │
│  PASO 4: VERIFICAR                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ • La app funciona en el entorno original?                           │   │
│  │ • Los datos están completos?                                        │   │
│  │ • Los usuarios pueden acceder normalmente?                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              ▼                                              │
│  PASO 5: DOCUMENTAR                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Registrar en el acta:                                               │   │
│  │ • Causa del rollback                                                │   │
│  │ • Hora de inicio y fin del rollback                                 │   │
│  │ • Impacto en usuarios                                               │   │
│  │ • Lecciones aprendidas                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## ACTA DE CIERRE DE MIGRACIÓN

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                  ACTA DE MIGRACIÓN — STREAMPRO                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Escenario:  E1 / E2 / E3 / E4 / E5                                         ║
║  Fecha:      ______________________________                                  ║
║  Duración:   ________ horas                                                  ║
║                                                                              ║
║  Origen:     ______________________________________________                  ║
║  Destino:    ______________________________________________                  ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  FASES COMPLETADAS:                                                          ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ FASE 1 — Pre-Migración:       Completada  ✔  /  No completada  ✘      │ ║
║  │ FASE 2 — Respaldo de Datos:   Completada  ✔  /  No completada  ✘      │ ║
║  │ FASE 3 — Ejecución:           Completada  ✔  /  No completada  ✘      │ ║
║  │ FASE 4 — Post-Migración:      Completada  ✔  /  No completada  ✘      │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  MODIFICACIONES REALIZADAS:                                                  ║
║  1. _________________________________________________________________       ║
║  2. _________________________________________________________________       ║
║  3. _________________________________________________________________       ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  RESULTADO:                                                                  ║
║  [  ] Migración exitosa — sin observaciones                                  ║
║  [  ] Migración exitosa — con observaciones menores                         ║
║  [  ] Migración fallida — se ejecutó rollback                                ║
║                                                                              ║
║  Observaciones: ____________________________________________________        ║
║  _______________________________________________________________            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  FIRMAS:                                                                     ║
║                                                                              ║
║  Administrador: ___________________________  Fecha: ________                 ║
║  Desarrollador: ___________________________  Fecha: ________                 ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## REFERENCIAS BIBLIOGRÁFICAS

1. **ISO/IEC/IEEE 14764:2022.** (2022). *Ingeniería de software — Procesos del ciclo de vida del software — Mantenimiento* (3.ª ed.). Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/80710.html

2. **ISO/IEC/IEEE 12207:2017.** (2017). *Ingeniería de sistemas y software — Procesos del ciclo de vida del software*. Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/63712.html

3. **ISO 25000:2014.** (2014). *Ingeniería de software — Requisitos y evaluación de la calidad del producto de software (SQuaRE) — Guía para SQuaRE*. Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/64764.html

4. **PMI — Project Management Institute.** (2021). *Guía de los Fundamentos para la Dirección de Proyectos (PMBOK Guide)* (7.ª ed.). Project Management Institute, Inc.

5. **Pressman, R. S.** (2010). *Ingeniería del software: Un enfoque práctico* (7.ª ed.). McGraw-Hill Education.

6. **Node.js Foundation.** (2026). *Guía de migración de Node.js*. Recuperado de https://nodejs.org/es/docs/guides/migration/

7. **MySQL, Oracle Corporation.** (2026). *Manual de referencia de MySQL 8.4 — Migración*. Recuperado de https://dev.mysql.com/doc/refman/8.4/en/migration.html

8. **Mercado Pago Developers.** (2026). *Documentación para desarrolladores — Integración de pagos*. Recuperado de https://www.mercadopago.com.co/developers

9. **NIST — National Institute of Standards and Technology.** (2024). *NIST Special Publication 800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations*. U.S. Department of Commerce.

10. **OWASP Foundation.** (2026). *OWASP Cheat Sheet Series — Data Protection*. Recuperado de https://cheatsheetseries.owasp.org/

11. **SENA — Servicio Nacional de Aprendizaje.** (2026). *Material de formación: Análisis y Desarrollo de Software — Mantenimiento de Software*. Centro de Gestión de Mercados, Logística y Tecnologías de la Información, Regional Distrito Capital, Bogotá, Colombia.

12. **Express.js.** (2026). *Express — Mejores prácticas de seguridad en producción*. Recuperado de https://expressjs.com/en/advanced/best-practice-security.html

13. **DigitalOcean.** (2026). *How to Migrate a Node.js Application from Windows to Ubuntu*. Recuperado de https://www.digitalocean.com/community/tutorials

---

*Documento elaborado como evidencia de aprendizaje para el componente formativo de Mantenimiento y Soporte de Software.*

*Guía Procedural de Migración — StreamPro*

*SENA — Servicio Nacional de Aprendizaje, Colombia — 2026*
