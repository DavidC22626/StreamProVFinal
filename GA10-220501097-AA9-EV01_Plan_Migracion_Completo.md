# PLAN DE MIGRACIÓN Y RESPALDO DE DATOS — STREAMPRO

## Guía Procedural con Listas de Verificación Integradas

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

1. [Introducción](#1-introducción)
2. [Objetivos y Alcance](#2-objetivos-y-alcance)
3. [Descripción del Sistema](#3-descripción-del-sistema)
4. [Evaluación de la Infraestructura Actual](#4-evaluación-de-la-infraestructura-actual)
5. [Roles y Responsabilidades del Equipo](#5-roles-y-responsabilidades-del-equipo)
6. [Escenarios de Migración](#6-escenarios-de-migración)
7. [Visión General del Proceso](#7-visión-general-del-proceso)
8. [Cronograma de Implementación](#8-cronograma-de-implementación)
9. [Fase 1: Pre-Migración](#9-fase-1-pre-migración)
10. [Fase 2: Respaldo de Datos](#10-fase-2-respaldo-de-datos)
11. [Fase 3: Ejecución de la Migración](#11-fase-3-ejecución-de-la-migración)
12. [Fase 4: Post-Migración y Verificación](#12-fase-4-post-migración-y-verificación)
13. [Revisión de Modificaciones y Seguridad](#13-revisión-de-modificaciones-y-seguridad)
14. [Procedimientos de Rollback](#14-procedimientos-de-rollback)
15. [Acta de Cierre](#15-acta-de-cierre)
16. [Referencias Bibliográficas](#16-referencias-bibliográficas)

---

## 1. INTRODUCCIÓN

La migración de un sistema de software es un proceso crítico que implica trasladar una aplicación funcional desde un entorno operativo a otro, preservando la integridad de los datos, la continuidad del servicio y la seguridad de la información. Una migración mal ejecutada puede resultar en pérdida de datos, tiempos de inactividad prolongados y una mala experiencia para los usuarios.

El presente documento constituye el **Plan de Migración y Respaldo de Datos** para la aplicación **StreamPro**, una plataforma de streaming de contenido audiovisual desarrollada como proyecto formativo del programa Análisis y Desarrollo de Software del SENA.

Este plan integra tres enfoques complementarios:

- **Guía procedural:** Describe paso a paso cada fase del proceso con diagramas de flujo, matrices de decisión y procedimientos detallados.
- **Listas de verificación (checklists):** Proporciona instrumentos de control con ítems verificables (Sí/No/N/A) para auditar cada actividad durante la migración.
- **Marco normativo:** Incorpora los lineamientos de la norma ISO/IEC/IEEE 14764:2022 para procesos de mantenimiento y migración de software.

El documento está diseñado para que cualquier desarrollador o administrador pueda ejecutar una migración de StreamPro de manera controlada, trazable y segura, garantizando la integridad de los datos, la continuidad del servicio y la documentación completa de todas las modificaciones realizadas.

---

## 2. OBJETIVOS Y ALCANCE

### 2.1 Objetivo Principal

Migrar los datos y la aplicación StreamPro a un nuevo sistema de forma segura, eficiente y controlada, garantizando la integridad y disponibilidad de la información durante la transición.

### 2.2 Objetivos Específicos

1. Definir un procedimiento estructurado para la evaluación de la infraestructura actual, incluyendo volumen de datos, disponibilidad del servicio y riesgos de seguridad.
2. Establecer un sistema de respaldo regular que proteja los datos contra errores o fallos durante la migración.
3. Ejecutar la migración de datos y configuración mediante fases controladas: copia a entorno de prueba, migración a producción y verificación de integridad.
4. Validar la migración mediante pruebas unitarias, de integración y de carga para asegurar el correcto funcionamiento del sistema en el nuevo entorno.
5. Definir procedimientos detallados de recuperación ante desastres o pérdida de información.
6. Documentar todas las modificaciones realizadas durante el proceso y garantizar la seguridad de los datos migrados.

### 2.3 Alcance

Este plan abarca todos los datos y componentes del software StreamPro:

| Componente | Descripción | Volumen estimado |
|------------|-------------|:----------------:|
| Base de datos MySQL | 8 tablas: administradores, usuarios, peliculas, series, temporadas, capitulos, suscripciones, tokens_recuperacion | 1 - 50 MB |
| Archivos de configuración | conexion.js, mercadopago.js, correo.js, link.js | < 10 KB |
| Código fuente | app.js, rutas/, views/, public/css/, public/js/ | < 5 MB |
| Archivos multimedia | Videos MP4 en public/video/, portadas en public/portadas/ | 100 MB - 5 GB |
| Registros del sistema | Logs de aplicación, errores del servidor | Variable |

---

## 3. DESCRIPCIÓN DEL SISTEMA

### 3.1 Ficha Técnica de StreamPro

| Atributo | Valor |
|----------|-------|
| **Nombre** | StreamPro |
| **Versión** | 1.0.0 |
| **Tipo** | Plataforma de streaming audiovisual |
| **Autor** | David Caicedo — SENA |

### 3.2 Stack Tecnológico

```
┌────────────────────────────────────────────────────────────┐
│                   STACK TECNOLÓGICO STREAMPRO              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  FRONTEND                    BACKEND                       │
│  ┌────────────────────┐     ┌─────────────────────────┐   │
│  │  EJS               │     │  Node.js 22.x           │   │
│  │  CSS3              │     │  Express 5.1.0          │   │
│  │  JavaScript        │     │  express-session 1.18.2 │   │
│  │  HTML5 Video       │     │  bcrypt 6.0.0           │   │
│  └────────────────────┘     │  mysql2 3.15.3          │   │
│                              │  uuid 13.0.0            │   │
│  SERVICIOS EXTERNOS          │  cors 2.8.5             │   │
│  ┌────────────────────┐     └─────────────────────────┘   │
│  │  MercadoPago SDK   │                                    │
│  │  Gmail SMTP        │     BASE DE DATOS                  │
│  │  (Nodemailer)      │     ┌─────────────────────────┐   │
│  └────────────────────┘     │  MySQL 8.x (XAMPP)      │   │
│                              │  BD: stream_pro         │   │
│                              │  8 tablas               │   │
│                              └─────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

### 3.3 Archivos Críticos del Proyecto

| Archivo | Propósito | ¿Requiere modificación en migración? |
|---------|-----------|:-----------------------------------:|
| `app.js` | Punto de entrada del servidor | Solo si cambia puerto |
| `config/conexion.js` | Conexión a MySQL | **Sí** — nuevas credenciales |
| `config/mercadopago.js` | Configuración de pagos | **Sí** — nuevos tokens |
| `config/correo.js` | Configuración SMTP | **Sí** — nuevo servidor |
| `config/link.js` | URL base de la app | **Sí** — nuevo dominio |
| `package.json` | Dependencias | Solo si cambian versiones |
| `database/stream_pro_schema.sql` | Esquema de BD | Rara vez |

---

## 4. EVALUACIÓN DE LA INFRAESTRUCTURA ACTUAL

Antes de iniciar cualquier migración, es necesario evaluar tres aspectos fundamentales del entorno origen para dimensionar correctamente el esfuerzo, los riesgos y los recursos necesarios.

### 4.1 Volumen de Datos

| Componente | Ubicación | Método de medición | Tamaño típico |
|------------|-----------|-------------------|:-------------:|
| Base de datos MySQL | MySQL (XAMPP) | `SELECT COUNT(*) FROM cada_tabla` + peso del archivo mysqldump | 1 MB - 50 MB |
| Videos MP4 | `public/video/` | Propiedades de carpeta / `du -sh` | 100 MB - 5 GB |
| Portadas e imágenes | `public/portadas/` | Propiedades de carpeta / `du -sh` | 10 MB - 500 MB |
| Código fuente | `app.js`, `rutas/`, `views/`, `public/css/`, `public/js/` | Propiedades de carpeta | < 5 MB |
| Configuración | `config/` | Propiedades de carpeta | < 10 KB |
| **Total estimado** | | | **111 MB - 5.5 GB** |

**Comandos para medir:**
- **Windows:** Click derecho en carpeta → Propiedades, o `dir` en PowerShell
- **Linux:** `du -sh /ruta/de/la/carpeta`
- **MySQL:** `SELECT table_schema "BD", ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) "Tamaño MB" FROM information_schema.tables WHERE table_schema = 'stream_pro' GROUP BY table_schema;`

### 4.2 Disponibilidad y Tiempo de Inactividad

| Factor | Pregunta clave | Impacto |
|--------|---------------|---------|
| Ventana de migración | ¿Cuánto tiempo puede estar el servicio caído? | Define si la migración debe ser nocturna o en fin de semana |
| Usuarios activos | ¿Hay usuarios usando la app 24/7? | Determina la necesidad de notificar con antelación |
| Servicios externos | ¿MercadoPago, SMTP, CDN dependen de IP fija? | Puede requerir coordinación con terceros |
| Tolerancia a pérdida | ¿Cuántos datos se pueden perder como máximo? | Define la frecuencia de backups durante la migración |

**Criterio para StreamPro:** Máximo **4 horas** de inactividad permitida, en horario de baja actividad (domingo 2:00 AM - 6:00 AM).

### 4.3 Seguridad

| Riesgo | Probabilidad | Impacto | Medida de mitigación |
|--------|:-----------:|:-------:|----------------------|
| Interceptación de datos durante la transferencia | Baja | Alto | Usar SCP, SFTP o HTTPS; evitar FTP plano |
| Exposición de credenciales en archivos de configuración | Media | Alto | No incluir `config/*.js` en repositorios públicos; usar `.gitignore` |
| Acceso no autorizado a backups | Media | Alto | Cifrar backups con AES-256; almacenar en ubicación segura |
| Pérdida de datos por backup corrupto | Baja | Crítico | Verificar checksums; mantener 2 copias en diferentes ubicaciones |
| Fuga de datos personales de usuarios | Baja | Crítico | Minimizar datos exportados; anonimizar si es posible |

### 4.4 Lista de Verificación de Evaluación Inicial

| ID | Actividad | Criterio de aceptación | Estado | Responsable |
|----|-----------|------------------------|--------|-------------|
| EV-01 | Medir volumen total de datos a migrar | Registro documentado del tamaño de cada componente (BD, video, código, config) | ☐ Sí ☐ No | Administrador |
| EV-02 | Definir ventana de inactividad permitida | Ventana definida y documentada (máx. 4 horas) | ☐ Sí ☐ No | Administrador |
| EV-03 | Identificar usuarios activos y notificar | Lista de usuarios afectados y medio de notificación definido | ☐ Sí ☐ No | Administrador |
| EV-04 | Evaluar riesgos de seguridad | Matriz de riesgos diligenciada con medidas de mitigación | ☐ Sí ☐ No | Equipo Seguridad |
| EV-05 | Verificar conectividad con servicios externos | MercadoPago, SMTP y CDN accesibles desde el entorno destino | ☐ Sí ☐ No | Desarrollador |

---

## 5. ROLES Y RESPONSABILIDADES DEL EQUIPO

Toda migración debe contar con un equipo con roles claramente definidos. Para StreamPro se establecen los siguientes:

### 5.1 Asignación de Roles

| Rol | Responsable por defecto | Función principal |
|-----|------------------------|-------------------|
| **Administrador de Datos** | Propietario del proyecto / Líder técnico | Supervisar la migración de datos y la integridad de los respaldos. Autorizar el pase a producción. |
| **Desarrollador de Software** | Programador asignado | Adaptar el software al nuevo sistema, modificar configuraciones, ejecutar pruebas de integración. |
| **Equipo de Seguridad** | Administrador del sistema | Garantizar la seguridad de los datos durante la migración y el almacenamiento. Verificar cifrado, accesos y cumplimiento. |

### 5.2 Matriz de Responsabilidades (RACI)

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

## 6. ESCENARIOS DE MIGRACIÓN

### 6.1 Matriz de Escenarios

```
┌────────────┬────────────────────────────────┬──────────────────────────┬──────────────────┐
│ ESCENARIO  │            ORIGEN              │         DESTINO          │  RIESGO ESTIMADO │
├────────────┼────────────────────────────────┼──────────────────────────┼──────────────────┤
│            │                                │                          │                  │
│  E1        │ Windows + XAMPP (MySQL)        │ Ubuntu Server + MySQL    │    ●●●●○ Alto    │
│  Local→VPS │ Node.js localhost:3000         │ PM2 + Nginx proxy inverso│                  │
│            │                                │                          │                  │
│  E2        │ Archivos en disco local        │ Amazon S3 + CloudFront   │    ●●●○○ Medio   │
│  CDN       │ public/video/ public/portadas/ │ URLs públicas CDN        │                  │
│            │                                │                          │                  │
│  E3        │ Node.js 22.x                   │ Node.js 24.x             │    ●●○○○ Bajo   │
│  Versión   │                                │                          │                  │
│  Node      │                                │                          │                  │
│            │                                │                          │                  │
│  E4        │ MySQL 8 (XAMPP)                │ MySQL 9                  │    ●●●○○ Medio   │
│  Versión   │                                │                          │                  │
│  MySQL     │                                │                          │                  │
│            │                                │                          │                  │
│  E5        │ PC personal del desarrollador  │ PC de reemplazo          │    ●●○○○ Bajo   │
│  Equipo    │                                │                          │                  │
└────────────┴────────────────────────────────┴──────────────────────────┴──────────────────┘
```

### 6.2 Navegación Rápida por Escenario

| Si tu migración es... | Comienza en... | Saltos recomendados |
|-----------------------|----------------|---------------------|
| Local (Windows/XAMPP) → Servidor en la nube | **Fase 1 (PRE)** completa | Todas las fases aplican |
| Solo cambiar almacenamiento de videos a CDN | **Fase 2 (BKP)** | PRE parcial, MIG parcial, POST parcial |
| Actualizar Node.js a nueva versión | **Fase 1** (PRE parcial) | BKP no aplica, MIG parcial, POST funcional |
| Cambiar de PC de desarrollo | **Fase 2** completa + **Fase 3** | Procedimiento estándar |

---

## 7. VISIÓN GENERAL DEL PROCESO

### 7.1 Diagrama de Flujo General

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
          │         │   ¿Todo listo?               │         │
          │         └──────────────┬───────────────┘         │
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
          │                   Sí   │   No
          │                        ▼
          │         ┌──────────────────────────────┐
          │         │  FASE 3: EJECUCIÓN           │
          │         │  • Detener servicio origen   │
          │         │  • Transferir archivos       │
          │         │  • Restaurar BD en destino   │
          │         │  • Configurar entorno        │
          │         │  • Iniciar servicio destino  │
          │         └──────────────┬───────────────┘
          │                        │
          │                        ▼
          │         ┌──────────────────────────────┐
          │         │   FASE 4: POST-MIGRACIÓN     │
          │         │  • Pruebas funcionales       │
          │         │  • Pruebas de integración    │
          │         │  • Pruebas de carga          │
          │         │  • Monitoreo 24h             │
          │         └──────────────┬───────────────┘
          │                        │
          │                        ▼
          │         ┌──────────────────────────────┐
          │         │  ¿Resultados exitosos?        │
          │         └──────────────┬───────────────┘
          │                   Sí   │   No
          │                        ▼
          │         ┌──────────────────────────────┐
          │         │   MIGRACIÓN COMPLETADA       │
          │         │   Generar acta de cierre     │
          │         └──────────────────────────────┘
          │
          └──────────────────────────────────────────┘
                     (Volver a fase que falló)
```

### 7.2 Estructura de cada Fase en este Documento

Cada fase del proceso (Fases 1 a 4) se presenta con la siguiente estructura:

1. **Diagrama de flujo** — Visualización del proceso
2. **Procedimiento detallado** — Pasos a seguir con comandos y ejemplos
3. **Lista de verificación (checklist)** — Ítems con estado Sí/No/N/A para auditar la ejecución
4. **Decisión de continuación** — Criterios para avanzar a la siguiente fase

---

## 8. CRONOGRAMA DE IMPLEMENTACIÓN

### 8.1 Diagrama de Fases del Cronograma

```
DÍA     1    2    3    4    5    6    7    8    9    10
       ──── ──── ──── ──── ──── ──── ──── ──── ──── ────
       ○  PLANIFICACIÓN  ○  ○   DESARROLLO   ○  ○  PRUEBAS ○  IMPLE.
       
F1:    ████████████
       • Definir alcance y objetivos
       • Evaluar infraestructura (volumen, disponibilidad, seguridad)
       • Seleccionar escenario de migración (E1-E5)
       • Asignar roles al equipo
       • Elaborar plan de contingencia
       • Notificar a usuarios
       ▶ Entregable: Plan aprobado

F2:               ████████████████
                  • Instalar software en destino
                  • Backup completo (BD, config, multimedia, código)
                  • Verificar integridad de backups
                  • Almacenar en ubicación segura (2 copias)
                  • Transferir archivos al destino
                  • Configurar conexiones y dependencias
                  ▶ Entregable: Entorno destino listo

F3:                             ████████████
                                • Pruebas unitarias
                                • Pruebas de integración
                                • Pruebas de carga
                                • Pruebas de seguridad
                                • Pruebas de regresión
                                ▶ Entregable: Informe APROBADO

F4:                                        ████████████
                                           • Corte final
                                           • Iniciar app en destino
                                           • Activar nuevo entorno
                                           • Monitoreo 24h
                                           ▶ Entregable: Acta de cierre
```

### 8.2 Tabla de Tiempos

| Fase | Días | Duración | Responsable principal | Hito |
|------|:----:|:--------:|-----------------------|------|
| **Planificación** | 1-3 | 3 días | Administrador de Datos | Plan aprobado |
| **Desarrollo** | 4-6 | 3 días | Desarrollador de Software | Entorno destino listo |
| **Pruebas** | 7-8 | 2 días | Desarrollador + Seguridad | Informe aprobado |
| **Implementación** | 9-10 | 2 días | Administrador de Datos | Acta de cierre |
| **Total** | **1-10** | **10 días** | | |

### 8.3 Hitos Clave

| Hito | Fecha | Criterio de éxito |
|------|:----:|-------------------|
| H1: Plan aprobado | Día 3 | Plan firmado por Administrador de Datos |
| H2: Backups verificados | Día 6 | Restauración de prueba exitosa + checksums |
| H3: Pruebas superadas | Día 8 | 100% pruebas unitarias, integración y carga aprobadas |
| H4: Migración completada | Día 10 | App funcionando en destino + acta firmada |

### 8.4 Plan de Contingencia del Cronograma

| Riesgo | Impacto | Acción |
|--------|---------|--------|
| Falla de hardware en destino | Retraso 2-3 días | Solicitar nuevo VPS; extender cronograma |
| Incompatibilidad de dependencias | Retraso 1-2 días | Revertir versión anterior y documentar |
| Pérdida de datos durante transferencia | Retraso 1 día | Restaurar desde backup y reintentar |
| Ausencia del responsable clave | Retraso 2-5 días | Activar rol secundario |

---

## 9. FASE 1: PRE-MIGRACIÓN

### 9.1 Diagrama de Flujo

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
│  │ servicios    │    │ conectividad │    │                      │  │
│  └──────────────┘    └──────────────┘    └──────────────────────┘  │
│                                                                     │
│  RESULTADO: ✔ Línea base documentada  ✔ Entorno destino listo      │
│             ✔ Plan de contingencia   ✔ Usuarios informados          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.2 Procedimiento Detallado

| # | Actividad | Herramienta / Comando | Responsable | Tiempo |
|---|-----------|----------------------|-------------|:------:|
| 1 | Verificar versión de Node.js en origen | `node -v` (debe ser ≥ 22.x) | Desarrollador | 5 min |
| 2 | Verificar versión de MySQL en origen | `mysql --version` (debe ser ≥ 8.x) | Desarrollador | 5 min |
| 3 | Listar dependencias instaladas | `npm list --depth=0` | Desarrollador | 5 min |
| 4 | Documentar configuración actual | Capturar credenciales MP, SMTP, URL en documento seguro | Desarrollador | 15 min |
| 5 | Verificar espacio en disco destino | `df -h` (Linux) / Administrador de tareas (Win) — mínimo 10 GB libres | Administrador | 5 min |
| 6 | Instalar software base en destino | Node.js, MySQL/Cliente, PM2 | Administrador | 30 min |
| 7 | Verificar conectividad de red | `ping`, `telnet` a puertos 3306, 22, 80/443 | Administrador | 10 min |
| 8 | Crear BD vacía en destino | `CREATE DATABASE stream_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;` | Administrador | 5 min |
| 9 | Elaborar plan de rollback | Documento con pasos de reversión firmado | Administrador | 30 min |
| 10 | Notificar a usuarios | Correo con fecha, hora y duración estimada de la migración | Administrador | 15 min |
| 11 | Preparar entorno de pruebas en destino | `npm install` en el directorio destino | Desarrollador | 15 min |

### 9.3 Lista de Verificación de Pre-Migración

| ID | Actividad | Criterio de aceptación | Estado | Responsable | Observaciones |
|----|-----------|------------------------|--------|-------------|---------------|
| PRE-01 | Realizar inventario completo del entorno origen | Se listan: versión Node, MySQL, dependencias npm, archivos de configuración, rutas de almacenamiento, servicios externos | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| PRE-02 | Verificar versiones de software en origen | `node -v` ≥ 22.x; `npm -v` ≥ 10.x; `mysql --version` ≥ 8.x | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| PRE-03 | Identificar todas las dependencias del proyecto | `npm list --depth=0` sin errores | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| PRE-04 | Documentar configuración de servicios externos | Credenciales MP, SMTP, URL registradas en gestor de contraseñas | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| PRE-05 | Verificar espacio en disco en destino | ≥ 10 GB libres para app + BD + multimedia | ☐ Sí ☐ No ☐ N/A | Administrador | |
| PRE-06 | Instalar y configurar software base en destino | Node.js, npm, MySQL, PM2 instalados y verificados | ☐ Sí ☐ No ☐ N/A | Administrador | |
| PRE-07 | Verificar conectividad de red entre origen y destino | Ping y puertos 3306, 22, 80/443 accesibles | ☐ Sí ☐ No ☐ N/A | Administrador | |
| PRE-08 | Crear base de datos vacía en destino | `CREATE DATABASE stream_pro ...` ejecutado sin errores | ☐ Sí ☐ No ☐ N/A | Administrador | |
| PRE-09 | Elaborar plan de contingencia y rollback | Documento firmado con procedimiento de reversión paso a paso | ☐ Sí ☐ No ☐ N/A | Administrador | |
| PRE-10 | Notificar a usuarios sobre la ventana de migración | Comunicado enviado con fecha, hora y duración | ☐ Sí ☐ No ☐ N/A | Administrador | |
| PRE-11 | Preparar entorno de pruebas en destino | Directorio creado, `npm install` ejecutado, configuraciones base establecidas | ☐ Sí ☐ No ☐ N/A | Desarrollador | |

### 9.4 Decisión de Continuación

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Puedo pasar a la Fase 2 (Respaldo)?                           │
├─────────────────────────────────────────────────────────────────┤
│  ✔ SÍ — cuando todos los ítems PRE-01 a PRE-11 están            │
│         completados y no hay bloqueantes                         │
│  ✘ NO — si hay algún ítem crítico pendiente:                    │
│         • Falta de espacio en disco destino                      │
│         • Software base no instalado en destino                  │
│         • Sin plan de rollback                                   │
│         • Sin conectividad de red                                │
└─────────────────────────────────────────────────────────────────┘
```

**Subtotal Fase 1:** Sí: ___ / No: ___ / N/A: ___

**Firma del Administrador:** _________________________

---

## 10. FASE 2: RESPALDO DE DATOS

### 10.1 Diagrama de Flujo

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

### 10.2 Mapa de Archivos a Respaldar

```
┌─────────────────────────────────────────────────────────────────────────────┐
│               MAPA DE RESPALDO — STREAMPRO                                   │
├──────────────┬──────────────────────┬───────────────────┬───────────────────┤
│  COMPONENTE  │  UBICACIÓN ORIGEN    │  COMANDO / MÉTODO │  TAMAÑO ESTIMADO  │
├──────────────┼──────────────────────┼───────────────────┼───────────────────┤
│  Base de     │ MySQL (XAMPP)        │ mysqldump -u root │   1 MB - 50 MB    │
│  datos       │ BD: stream_pro       │ stream_pro >      │                   │
│              │                      │ backup.sql        │                   │
│  Config.     │ config/conexion.js   │ Copia directa     │   < 10 KB         │
│  aplicación  │ config/mercadopago.js│ (Ctrl+C / cp)     │                   │
│              │ config/correo.js     │                   │                   │
│              │ config/link.js       │                   │                   │
│  Videos      │ public/video/        │ Copia directa     │   Variable        │
│              │                      │                   │   (100 MB - 5 GB) │
│  Portadas    │ public/portadas/     │ Copia directa     │   10 MB - 500 MB  │
│  Código      │ app.js, rutas/,      │ Git push /        │   < 5 MB          │
│  fuente      │ views/, public/css/, │ Copia directa     │                   │
│              │ public/js/,          │                   │                   │
│              │ package.json         │                   │                   │
└──────────────┴──────────────────────┴───────────────────┴───────────────────┘
```

### 10.3 Lista de Verificación de Respaldo

| ID | Actividad | Criterio de aceptación | Estado | Responsable | Observaciones |
|----|-----------|------------------------|--------|-------------|---------------|
| BKP-01 | Realizar backup completo de la base de datos MySQL | `mysqldump -u root stream_pro > stream_pro_backup_[YYYYMMDD].sql` sin errores; archivo > 0 KB | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| BKP-02 | Verificar la integridad del backup de BD | Restaurar en BD temporal y verificar 8 tablas creadas sin errores | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| BKP-03 | Realizar backup de archivos de configuración | Copiar: conexion.js, correo.js, mercadopago.js, link.js | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| BKP-04 | Realizar backup de archivos multimedia | Copiar `public/video/` y `public/portadas/`; verificar integridad de archivos | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| BKP-05 | Realizar backup de código fuente | Copiar app.js, rutas/, views/, public/css/, public/js/, package.json | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| BKP-06 | Verificar suma de verificación (checksum) | SHA256 de cada archivo de backup registrado en acta | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| BKP-07 | Almacenar backups en ubicación segura externa | 2 copias: disco externo + nube; ambas accesibles y legibles | ☐ Sí ☐ No ☐ N/A | Administrador | |
| BKP-08 | Documentar estructura de directorios respaldada | Árbol de directorios completo adjunto al acta | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| BKP-09 | Verificar backup de configuración de servicios externos | Access_token MP, credenciales SMTP, session secret respaldados | ☐ Sí ☐ No ☐ N/A | Administrador | |
| BKP-10 | Registrar credenciales en gestor de contraseñas seguro | Credenciales de BD almacenadas en gestor (no en texto plano) | ☐ Sí ☐ No ☐ N/A | Administrador | |

### 10.4 Decisión de Continuación

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Puedo pasar a la Fase 3 (Ejecución)?                          │
├─────────────────────────────────────────────────────────────────┤
│  ✔ SÍ — cuando:                                                 │
│     • Backup de BD verificado (restauración de prueba exitosa)  │
│     • Backups almacenados en 2 ubicaciones                      │
│     • Checksums registrados                                     │
│  ✘ NO — si:                                                     │
│     • El backup de BD tiene errores                             │
│     • No hay almacenamiento externo disponible                  │
│     • Faltan archivos críticos en el backup                     │
└─────────────────────────────────────────────────────────────────┘
```

**Subtotal Fase 2:** Sí: ___ / No: ___ / N/A: ___

**Firma del Administrador:** _________________________

---

## 11. FASE 3: EJECUCIÓN DE LA MIGRACIÓN

### 11.1 Diagrama de Flujo

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
│                ▼                                                           │
│  ┌──────────────────────────────┐                                          │
│  │  2. TRANSFERIR ARCHIVOS      │                                          │
│  │  SCP / rsync / USB / copia   │                                          │
│  │  red → todo el proyecto      │                                          │
│  └─────────────┬────────────────┘                                          │
│                ▼                                                           │
│  ┌──────────────────────────────┐    ┌──────────────────────────────────┐  │
│  │  3. RESTAURAR BD EN DESTINO  │    │  4. CONFIGURAR ENTORNO DESTINO   │  │
│  │  mysql -u root stream_pro    │    │  • conexion.js (nuevas creds)    │  │
│  │  < backup.sql                │    │  • mercadopago.js                │  │
│  │  Verificar: SHOW TABLES (8)  │    │  • correo.js, link.js            │  │
│  └─────────────┬────────────────┘    │  • npm install                   │  │
│                │                     └──────────────┬───────────────────┘  │
│                └────────────────┬───────────────────┘                      │
│                                 ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  5. INICIAR SERVICIO EN DESTINO                                      │  │
│  │  node app.js → "conexion exitosa" + "http://localhost:3000"         │  │
│  │  (Opcional) PM2 + Nginx + SSL                                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  RESULTADO: ✔ Aplicación corriendo en el nuevo entorno                    │
│             ✔ Base de datos conectada y operativa                         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 11.2 Procedimiento Detallado

| # | Actividad | Comando / Procedimiento | Responsable | Tiempo |
|---|-----------|------------------------|-------------|:------:|
| 1 | Detener servicio en origen | `Ctrl+C` o `pm2 stop streampro`; verificar que `localhost:3000` no responde | Desarrollador | 2 min |
| 2 | Transferir archivos al destino | `scp -r "C:\Stream\StreamPro" usuario@vps:/var/www/streampro` o rsync | Desarrollador | 30-60 min |
| 3 | Restaurar BD en destino | `mysql -u streampro -p stream_pro < /ruta/backup.sql` | Desarrollador | 10 min |
| 4 | Verificar tablas restauradas | `mysql -u streampro -p stream_pro -e "SHOW TABLES;"` → 8 tablas | Desarrollador | 5 min |
| 5 | Configurar conexion.js | Editar host, user, password para el nuevo entorno | Desarrollador | 5 min |
| 6 | Configurar mercadopago.js | Actualizar access_token si cambia a producción | Desarrollador | 5 min |
| 7 | Configurar correo.js | Actualizar credenciales SMTP del nuevo entorno | Desarrollador | 5 min |
| 8 | Configurar link.js | Actualizar URL base (dominio o IP) | Desarrollador | 5 min |
| 9 | Instalar dependencias | `npm install` (eliminar node_modules primero si hay cambios de versión) | Desarrollador | 10 min |
| 10 | Iniciar app en destino | `node app.js` → verificar "conexion exitosa" y "http://localhost:3000" | Desarrollador | 2 min |
| 11 | Configurar PM2 (si aplica) | `pm2 start app.js --name streampro`, `pm2 save`, `pm2 startup` | Administrador | 10 min |
| 12 | Configurar Nginx + SSL (si aplica) | Configurar proxy inverso y certificado SSL con Let's Encrypt | Administrador | 30 min |

### 11.3 Lista de Verificación de Ejecución

| ID | Actividad | Criterio de aceptación | Estado | Responsable | Observaciones |
|----|-----------|------------------------|--------|-------------|---------------|
| MIG-01 | Detener servicio en origen | `http://localhost:3000` ya no responde | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-02 | Transferir archivos al destino | Todos los archivos transferidos sin errores (comparar count) | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-03 | Restaurar BD en destino | `mysql ... < backup.sql` sin errores | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-04 | Verificar integridad de datos restaurados | `SELECT COUNT(*)` de cada tabla coincide con origen | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-05 | Restaurar archivos multimedia en destino | Archivos en `public/video/` y `public/portadas/` con pesos coincidentes | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-06 | Configurar conexión a BD en destino | `node -e "require('./config/conexion')"` → conexión exitosa | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-07 | Configurar servicios externos en destino | MP, correo, link.js configurados; sin credenciales del entorno anterior | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-08 | Instalar dependencias | `npm install` sin errores; `node_modules` creado | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-09 | Configurar variables de entorno | NODE_ENV, PATH, puertos configurados correctamente | ☐ Sí ☐ No ☐ N/A | Administrador | |
| MIG-10 | Iniciar app en destino | `node app.js` muestra "conexion exitosa" y "http://localhost:3000" | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| MIG-11 | Configurar PM2 (si aplica) | `pm2 list` muestra streampro como "online" | ☐ Sí ☐ No ☐ N/A | Administrador | |
| MIG-12 | Configurar proxy inverso y SSL (si aplica) | Nginx configurado + certificado SSL verificado | ☐ Sí ☐ No ☐ N/A | Administrador | |

### 11.4 Decisión de Continuación

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Puedo pasar a la Fase 4 (Post-Migración)?                     │
├─────────────────────────────────────────────────────────────────┤
│  ✔ SÍ — cuando:                                                 │
│     • node app.js muestra "conexion exitosa"                    │
│     • node app.js muestra "http://localhost:3000"               │
│     • El navegador carga la página principal sin errores        │
│  ✘ NO — si:                                                     │
│     • Error de conexión a base de datos                         │
│     • Puerto en uso o bloqueado                                 │
│     • Dependencias faltantes                                    │
│     • Rutas de multimedia no coinciden                          │
└─────────────────────────────────────────────────────────────────┘
```

**Subtotal Fase 3:** Sí: ___ / No: ___ / N/A: ___

**Firma del Administrador:** _________________________

---

## 12. FASE 4: POST-MIGRACIÓN Y VERIFICACIÓN

### 12.1 Mapa de Pruebas por Módulo

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                  MAPA DE PRUEBAS — STREAMPRO                                  │
├──────────────┬──────────────────────┬───────────────────┬────────────────────┤
│  MÓDULO      │  QUÉ PROBAR          │  CÓMO PROBARLO    │  RESULTADO ESPERADO│
├──────────────┼──────────────────────┼───────────────────┼────────────────────┤
│  Landing     │ Carga de página      │ Navegar a /       │ Página completa,   │
│  Page        │ principal            │                   │ sin errores 404    │
│  Login       │ Autenticación        │ POST /login       │ Redirección a      │
│              │ usuario y admin      │ con credenciales  │ /home              │
│  Registro    │ Crear cuenta nueva   │ POST              │ Registro en BD +   │
│              │                      │ /registerUser     │ redirección        │
│  Dashboard   │ Catálogo visible     │ GET /home         │ Películas/series   │
│              │                      │ (autenticado)     │ por categorías     │
│  Reproductor │ Video MP4 funciona   │ Clic en película  │ Video se reproduce │
│  de video    │                      │ o capítulo        │ sin errores        │
│  CRUD        │ Crear/Leer/Actualizar│ Endpoints API     │ BD refleja cambios │
│  Películas   │ Eliminar             │ CRUD              │                    │
│  CRUD Series │ CRUD + cascada       │ Endpoints API     │ Al eliminar serie, │
│              │                      │ CRUD              │ temp y caps se     │
│              │                      │                   │ borran             │
│  MercadoPago │ Crear preferencia    │ POST              │ Redirección a MP   │
│              │ Webhook              │ /crear-suscripcion│ Estado actualizado  │
│  Correo      │ Enviar token         │ POST /enviar-token│ Correo recibido    │
│              │ Verificar token      │                   │ con token 8 dígitos│
│              │ Cambiar password     │                   │                    │
│  Sesiones    │ Persistencia         │ Navegar 5 páginas │ Sesión se mantiene │
│              │ Cierre de sesión     │ Cerrar sesión     │ /home bloqueado    │
│  Carga       │ Alto volumen de      │ 10 pestañas       │ Sin errores 500,   │
│  (Stress)    │ usuarios simulados   │ simultáneas +     │ 503, ni timeout    │
│              │                      │ 5 videos en       │                    │
│              │                      │ reproducción      │                    │
└──────────────┴──────────────────────┴───────────────────┴────────────────────┘
```

### 12.2 Matriz de Pruebas de Rendimiento y Carga

| Prueba | Herramienta | Criterio de aceptación |
|--------|-------------|------------------------|
| Tiempo de carga de página principal | Navegador (F12 → Network) | < 3 segundos |
| Tiempo de respuesta de API (GET) | Postman / curl | < 500 ms |
| Reproducción de video | Navegador | Sin buffering excesivo (> 5s) |
| Uso de CPU durante reproducción | Administrador de tareas / `top` | < 70% |
| Consumo de RAM | Administrador de tareas / `top` | < 512 MB |
| Conexiones concurrentes | Múltiples pestañas | Sin errores 503 |
| Prueba de carga (10 usuarios simultáneos) | Pestañas + monitoreo de logs | Sin errores 500/503/504; respuesta < 2s |
| Pico de estrés (5 videos en paralelo) | 5 pestañas reproduciendo video | CPU < 85%, RAM < 1 GB, sin cortes |

### 12.3 Lista de Verificación de Post-Migración

| ID | Actividad | Criterio de aceptación | Estado | Responsable | Observaciones |
|----|-----------|------------------------|--------|-------------|---------------|
| POST-01 | Verificar acceso a página principal | Landing Page carga sin errores 404/500 | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-02 | Verificar inicio de sesión | Login usuario y admin redirigen a `/home` | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-03 | Verificar registro de usuarios | Nuevo usuario insertado en BD | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-04 | Verificar carga del dashboard | Películas y series visibles por categorías | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-05 | Verificar reproducción de video | Video MP4 inicia reproducción sin errores | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-06 | Verificar búsqueda | Búsqueda por título filtra resultados correctamente | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-07 | Verificar CRUD de películas | Crear, leer, actualizar, eliminar — todos reflejados en BD | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-08 | Verificar CRUD de series con cascada | Eliminar serie → temporadas y capítulos se borran | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-09 | Verificar CRUD de temporadas/capítulos | Crear temporada y capítulo asociados; verificar FK | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-10 | Verificar integración MercadoPago | Preferencia de pago creada; webhook procesa notificación | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-11 | Verificar envío de correos | Token de 8 dígitos enviado; verificación y cambio de password funcionan | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-12 | Verificar manejo de sesiones | Sesión persiste; cierre destruye la sesión | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-13 | Verificar archivos estáticos | CSS, JS, imágenes cargan (F12 → Network) | ☐ Sí ☐ No ☐ N/A | Desarrollador | |
| POST-14 | Verificar logs del servidor | Sin errores, warnings o excepciones no capturadas | ☐ Sí ☐ No ☐ N/A | Administrador | |
| POST-15 | Verificar rendimiento básico | Carga < 3s, API < 500ms, CPU < 70% | ☐ Sí ☐ No ☐ N/A | Administrador | |
| POST-16 | Verificar conectividad servicios externos | MP responde 200, SMTP responde, CDN accesible | ☐ Sí ☐ No ☐ N/A | Administrador | |
| POST-17 | Verificar plan de rollback | Procedimiento simulado; sistema restaurable en tiempo estipulado | ☐ Sí ☐ No ☐ N/A | Administrador | |
| POST-18 | Monitorear sistema 24h post-migración | Logs revisados cada 4h; sin errores críticos | ☐ Sí ☐ No ☐ N/A | Administrador | |

### 12.4 Ventana de Monitoreo Post-Migración (24 Horas)

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
│ Servicios   │    ✔     │    ✔     │    ✔     │    ✔     │    ✔     │   ✔   │
│ externos    │          │          │          │          │          │       │
│ (MP, SMTP)  │          │          │          │          │          │       │
│ Uso de      │    ✔     │    ✔     │          │    ✔     │          │   ✔   │
│ recursos    │          │          │          │          │          │       │
│ (CPU/RAM)   │          │          │          │          │          │       │
│ Tiempo de   │    ✔     │          │    ✔     │          │    ✔     │   ✔   │
│ respuesta   │          │          │          │          │          │       │
└─────────────┴──────────┴──────────┴──────────┴──────────┴──────────┴───────┘
```

### 12.5 Decisión de Finalización

```
┌─────────────────────────────────────────────────────────────────┐
│  ¿Migración completada exitosamente?                             │
├─────────────────────────────────────────────────────────────────┤
│  ✔ SÍ — cuando:                                                 │
│     • Todos los POST-01 a POST-18 están en SÍ o N/A            │
│     • Las pruebas de carga pasaron sin errores                  │
│     • Monitoreo de 24h sin incidentes críticos                  │
│  ✘ NO — ejecutar rollback si:                                   │
│     • Funcionalidades críticas no funcionan (login, video,      │
│       pagos)                                                     │
│     • Hay pérdida de datos verificada                           │
│     • El rendimiento es inaceptable                             │
└─────────────────────────────────────────────────────────────────┘
```

**Subtotal Fase 4:** Sí: ___ / No: ___ / N/A: ___

**Firma del Administrador:** _________________________

---

## 13. REVISIÓN DE MODIFICACIONES Y SEGURIDAD

### 13.1 Matriz de Cambios Realizados

```
┌───────────────────────────────────────────────────────────────────────────────┐
│              REGISTRO DE MODIFICACIONES DURANTE LA MIGRACIÓN                  │
├──────────────┬────────────┬──────────────┬──────────┬────────────┬───────────┤
│  ARCHIVO     │  CAMBIO    │  JUSTIFICACIÓN│  ANTES   │  DESPUÉS   │  APROBADO │
│              │  REALIZADO │              │          │            │           │
├──────────────┼────────────┼──────────────┼──────────┼────────────┼───────────┤
│ config/      │ Nuevas     │ Nueva BD en  │ host:    │ host:      │  ✔ / ✘   │
│ conexion.js  │ credenciales│ servidor     │ localhost│ [nuevo]    │           │
│              │            │ destino      │ user:    │ user:      │           │
│              │            │              │ root     │ [nuevo]    │           │
│ config/      │ Nuevo token │ Cambio a     │ token    │ token      │  ✔ / ✘   │
│ mercadopago  │             │ entorno de   │ test     │ producción │           │
│ .js          │             │ producción   │          │            │           │
│ config/      │ Nueva       │ Nuevo        │ user:    │ user:      │  ✔ / ✘   │
│ correo.js    │ conf. SMTP  │ servidor     | [anterior]│ [nuevo]   │           │
│              │             │ de correo    │          │            │           │
│ config/      │ Nueva URL   │ Nuevo        │ http://  │ https://   │  ✔ / ✘   │
│ link.js      │ base        │ dominio      │ localhost│ [dominio]  │           │
│              │             │              │ :3000    │            │           │
└──────────────┴────────────┴──────────────┴──────────┴────────────┴───────────┘
```

### 13.2 Lista de Verificación de Seguridad

| ID | Verificación | Criterio | Estado | Responsable |
|----|-------------|----------|--------|-------------|
| SEG-01 | Contraseñas en BD encriptadas con bcrypt | Campo `passw_user` inicia con `$2b$` o `$2a$` | ☐ Sí ☐ No ☐ N/A | Desarrollador |
| SEG-02 | MySQL con contraseña segura (no vacía) en producción | `mysql -u root -p` requiere contraseña | ☐ Sí ☐ No ☐ N/A | Administrador |
| SEG-03 | Claves de MercadoPago no expuestas en frontend | Revisar vistas .ejs y JS público | ☐ Sí ☐ No ☐ N/A | Desarrollador |
| SEG-04 | express-session con httpOnly, secure, sameSite | Verificar configuración en app.js | ☐ Sí ☐ No ☐ N/A | Desarrollador |
| SEG-05 | .gitignore excluye archivos de configuración | `config/*.js` o `.env` en .gitignore | ☐ Sí ☐ No ☐ N/A | Desarrollador |
| SEG-06 | Servidor no expone versión en headers | `curl -I` no muestra X-Powered-By con versión | ☐ Sí ☐ No ☐ N/A | Administrador |
| SEG-07 | Auditoría de dependencias ejecutada | `npm audit` → 0 vulnerabilidades críticas/altas | ☐ Sí ☐ No ☐ N/A | Desarrollador |
| SEG-08 | Backups cifrados o protegidos | Cifrado AES-256 o protección por contraseña | ☐ Sí ☐ No ☐ N/A | Administrador |
| SEG-09 | Permisos de archivos restrictivos en destino | Config: 0600; Public: 0755 | ☐ Sí ☐ No ☐ N/A | Administrador |
| SEG-10 | Datos personales protegidos | Solo datos necesarios en tabla usuarios | ☐ Sí ☐ No ☐ N/A | Administrador |

### 13.3 Resumen de Modificaciones

| Total ítems revisados | Sí | No | N/A | % Cumplimiento |
|:--------------------:|:--:|:--:|:---:|:--------------:|
| 10 | | | | |

**Resultado de la revisión:**

☐ **APROBADO** — Todos los ítems marcados Sí o N/A

☐ **APROBADO CON OBSERVACIONES** — Máximo 3 ítems No con plan de acción documentado

☐ **RECHAZADO** — Más de 3 ítems No o al menos un ítem de seguridad crítico marcado No

**Observaciones:**

_______________________________________________________________________________

**Firma del Administrador:** _________________________

---

## 14. PROCEDIMIENTOS DE ROLLBACK

### 14.1 Matriz de Rollback por Escenario

| Escenario | Condición que activa rollback | Acción de rollback | Tiempo estimado |
|-----------|------------------------------|-------------------|:---------------:|
| **E1** Local→VPS | • App no inicia en destino<br>• Error de conexión a BD<br>• Pérdida de datos<br>• Rendimiento inaceptable | 1. Restaurar DNS/IP al servidor origen<br>2. Restaurar BD en origen desde backup<br>3. Iniciar servicio en origen | 30 min |
| **E2** CDN | • Videos no se reproducen<br>• Tiempo de carga excesivo<br>• Archivos corruptos en CDN | 1. Revertir rutas en BD a valores locales<br>2. `UPDATE peliculas SET ruta_pel = valor_anterior` | 15 min |
| **E3/E4** Versión | • Incompatibilidad de dependencias<br>• Funcionalidades críticas rotas | 1. Reinstalar versión anterior<br>2. Restaurar package.json desde backup<br>3. `npm install` | 20 min |
| **E5** Equipo | • PC nueva no cumple requisitos<br>• Controladores incompatibles | 1. Volver al equipo anterior<br>2. Re-evaluar requisitos | 10 min |

### 14.2 Procedimiento de Rollback General

```
┌────────────────────────────────────────────────────────────────────────────┐
│                 PROCEDIMIENTO DE ROLLBACK — PASO A PASO                     │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  PASO 1: DETECTAR                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Identificar la condición que activa el rollback.                    │   │
│  │ Registrar el incidente y la hora exacta.                            │   │
│  │ Notificar al administrador del sistema.                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  PASO 2: DECIDIR                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ¿Rollback completo o parcial?                                       │   │
│  │ • Completo: volver al entorno origen al 100%                        │   │
│  │ • Parcial: revertir solo el componente que falló (BD, código, conf) │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  PASO 3: EJECUTAR                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Según la decisión:                                                   │   │
│  │ • Restaurar BD desde backup: mysql -u root stream_pro < backup.sql  │   │
│  │ • Restaurar archivos desde backup                                    │   │
│  │ • Revertir cambios de configuración                                  │   │
│  │ • Volver a apuntar DNS/IP al servidor origen                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  PASO 4: VERIFICAR                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ • La app funciona en el entorno original?                           │   │
│  │ • Los datos están completos?                                        │   │
│  │ • Los usuarios pueden acceder normalmente?                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  PASO 5: DOCUMENTAR                                                        │
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

### 14.3 Lista de Verificación de Rollback

| ID | Actividad | Estado | Observaciones |
|----|-----------|--------|---------------|
| RB-01 | Causa del rollback identificada y registrada | ☐ Sí ☐ No | |
| RB-02 | Tipo de rollback definido (completo/parcial) | ☐ Sí ☐ No | |
| RB-03 | Backup disponible y verificado para restauración | ☐ Sí ☐ No | |
| RB-04 | Restauración de BD ejecutada sin errores | ☐ Sí ☐ No | |
| RB-05 | Archivos de código y configuración restaurados | ☐ Sí ☐ No | |
| RB-06 | Servicio iniciado en entorno original | ☐ Sí ☐ No | |
| RB-07 | Funcionalidad verificada en entorno original | ☐ Sí ☐ No | |
| RB-08 | Acta de rollback generada y firmada | ☐ Sí ☐ No | |

**Firma del Administrador:** _________________________

---

## 15. ACTA DE CIERRE

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                  ACTA DE MIGRACIÓN — STREAMPRO                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Escenario:  E1 / E2 / E3 / E4 / E5                                         ║
║  Fecha de inicio:  ___________________  Fecha de fin:  __________________    ║
║  Duración total:  ________ horas                                             ║
║                                                                              ║
║  Origen:  ________________________________________________________________   ║
║  Destino: ________________________________________________________________   ║
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
║  PRUEBAS DE CARGA:                                                           ║
║  ☐ Pruebas superadas — sistema estable bajo carga simulada                  ║
║  ☐ Pruebas no aplican para este escenario                                   ║
║  ☐ Pruebas fallidas — ver observaciones                                     ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  RESULTADO FINAL:                                                            ║
║  [  ] Migración exitosa — sin observaciones                                  ║
║  [  ] Migración exitosa — con observaciones menores                         ║
║  [  ] Migración fallida — se ejecutó rollback                                ║
║                                                                              ║
║  Observaciones: _____________________________________________________       ║
║  _______________________________________________________________            ║
║                                                                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  FIRMAS:                                                                     ║
║                                                                              ║
║  Administrador de Datos: ___________________________  Fecha: ________        ║
║  Desarrollador:          ___________________________  Fecha: ________        ║
║  Equipo de Seguridad:    ___________________________  Fecha: ________        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 16. REFERENCIAS BIBLIOGRÁFICAS

1. **ISO/IEC/IEEE 14764:2022.** (2022). *Ingeniería de software — Procesos del ciclo de vida del software — Mantenimiento* (3.ª ed.). Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/80710.html

2. **ISO/IEC/IEEE 12207:2017.** (2017). *Ingeniería de sistemas y software — Procesos del ciclo de vida del software*. Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/63712.html

3. **ISO 25000:2014.** (2014). *Ingeniería de software — Requisitos y evaluación de la calidad del producto de software (SQuaRE) — Guía para SQuaRE*. Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/64764.html

4. **PMI — Project Management Institute.** (2021). *Guía de los Fundamentos para la Dirección de Proyectos (PMBOK Guide)* (7.ª ed.). Project Management Institute, Inc.

5. **Pressman, R. S.** (2010). *Ingeniería del software: Un enfoque práctico* (7.ª ed.). McGraw-Hill Education.

6. **Node.js Foundation.** (2026). *Documentación oficial de Node.js — Guías de migración*. Recuperado de https://nodejs.org/es/docs/

7. **MySQL, Oracle Corporation.** (2026). *Manual de referencia de MySQL 8.4 — Migración*. Recuperado de https://dev.mysql.com/doc/refman/8.4/en/migration.html

8. **Mercado Pago Developers.** (2026). *Documentación para desarrolladores — Integración de pagos*. Recuperado de https://www.mercadopago.com.co/developers

9. **NIST — National Institute of Standards and Technology.** (2024). *NIST Special Publication 800-53 Rev. 5: Security and Privacy Controls*. U.S. Department of Commerce.

10. **OWASP Foundation.** (2026). *OWASP Cheat Sheet Series — Data Protection*. Recuperado de https://cheatsheetseries.owasp.org/

11. **Express.js.** (2026). *Express — Mejores prácticas de seguridad en producción*. Recuperado de https://expressjs.com/en/advanced/best-practice-security.html

12. **DigitalOcean.** (2026). *How to Migrate a Node.js Application from Windows to Ubuntu*. Recuperado de https://www.digitalocean.com/community/tutorials

13. **PM2.** (2026). *PM2 — Gestor de procesos avanzado para Node.js*. Recuperado de https://pm2.keymetrics.io/

14. **Nginx.** (2026). *Documentación oficial — Proxy inverso*. Recuperado de https://nginx.org/en/docs/

15. **SENA — Servicio Nacional de Aprendizaje.** (2026). *Material de formación: Análisis y Desarrollo de Software — Mantenimiento de Software*. Centro de Gestión de Mercados, Logística y Tecnologías de la Información, Regional Distrito Capital, Bogotá, Colombia.

---

*Documento elaborado como evidencia de aprendizaje para el componente formativo de Mantenimiento y Soporte de Software.*

*Plan de Migración y Respaldo de Datos — StreamPro*

*SENA — Servicio Nacional de Aprendizaje, Colombia — 2026*
