# PLAN DE MANTENIMIENTO Y SOPORTE DE SOFTWARE — STREAMPRO

**Basado en la norma ISO/IEC/IEEE 14764:2022**

---

&nbsp;

**Evidencia:** GA10-220501097-AA8-EV01 — Diseñar plan de mantenimiento y soporte del software

**Programa:** Análisis y Desarrollo de Software

**Centro de Formación:** Centro de Gestión de Mercados, Logística y Tecnologías de la Información

**Regional:** Distrito Capital

**SENA — Servicio Nacional de Aprendizaje**

**Año:** 2026

&nbsp;

&nbsp;

&nbsp;

---

## TABLA DE CONTENIDO

1. [Introducción](#introducción)
2. [Objetivos](#objetivos)
3. [Descripción del Sistema](#descripción-del-sistema)
4. [Marco Normativo: ISO/IEC 14764](#marco-normativo-isoiec-14764)
5. [Tipos de Mantenimiento de Software](#tipos-de-mantenimiento-de-software)
6. [Proceso de Implementación](#proceso-de-implementación)
7. [Análisis de Modificación y Problemas](#análisis-de-modificación-y-problemas)
8. [Implementación de la Modificación](#implementación-de-la-modificación)
9. [Aceptación y Revisión del Mantenimiento](#aceptación-y-revisión-del-mantenimiento)
10. [Migración](#migración)
11. [Retiro](#retiro)
12. [Cronograma de Mantenimiento](#cronograma-de-mantenimiento)
13. [Matriz de Responsabilidades](#matriz-de-responsabilidades)
14. [Indicadores de Gestión de Mantenimiento](#indicadores-de-gestión-de-mantenimiento)
15. [Conclusiones](#conclusiones)
16. [Referencias Bibliográficas](#referencias-bibliográficas)

---

## INTRODUCCIÓN

El mantenimiento de software es una de las etapas más extensas y costosas dentro del ciclo de vida de cualquier producto de software. Según la norma ISO/IEC/IEEE 14764:2022, el mantenimiento comprende el conjunto de actividades y tareas necesarias para modificar un producto de software existente, preservando al mismo tiempo su integridad y funcionalidad. Esta etapa puede representar entre el 60% y el 80% del costo total del ciclo de vida de un sistema.

La presente evidencia de aprendizaje tiene como objetivo diseñar un plan de mantenimiento y soporte para la aplicación **StreamPro**, una plataforma de streaming de contenido audiovisual desarrollada como proyecto formativo del programa Análisis y Desarrollo de Software del SENA. El plan se estructura siguiendo las actividades definidas en la norma ISO/IEC/IEEE 14764:2022, abarcando tanto el mantenimiento preventivo como el correctivo, e incluyendo los procesos de migración y retiro del software.

El documento contempla los siguientes apartados fundamentales: descripción del sistema, proceso de implementación, análisis de modificación y problemas, implementación de la modificación, aceptación y revisión del mantenimiento, migración y retiro. Adicionalmente, se incluye un cronograma detallado de actividades de mantenimiento con sus respectivas frecuencias, duraciones y responsables asignados.

---

## OBJETIVOS

### Objetivo General

Establecer un plan de mantenimiento y soporte para la aplicación StreamPro, alineado con la norma ISO/IEC/IEEE 14764:2022, que permita gestionar de manera eficiente las actividades de mantenimiento preventivo y correctivo durante todo el ciclo de vida del software.

### Objetivos Específicos

1. Definir los procesos de implementación del mantenimiento, incluyendo políticas, roles, herramientas y recursos necesarios para StreamPro.

2. Establecer un procedimiento estructurado para el análisis y registro de problemas y modificaciones, con criterios de priorización claramente definidos.

3. Diseñar el flujo de trabajo para la implementación de modificaciones, desde la solicitud hasta el despliegue en producción.

4. Definir los criterios de aceptación y revisión para validar que las modificaciones realizadas cumplen con los estándares de calidad establecidos.

5. Planificar los procedimientos de migración y retiro del software, garantizando la continuidad del servicio y la integridad de los datos.

6. Elaborar un cronograma de mantenimiento preventivo y correctivo con frecuencias, duraciones y responsables asignados.

---

## DESCRIPCIÓN DEL SISTEMA

### Identificación del Software

| Atributo | Descripción |
|----------|-------------|
| **Nombre** | StreamPro |
| **Tipo** | Plataforma de streaming de contenido audiovisual |
| **Versión** | 1.0.0 |
| **Autor** | David Caicedo |
| **Programa** | Análisis y Desarrollo de Software — SENA |

### Funcionalidades Principales

StreamPro es una aplicación web de tipo plataforma de streaming inspirada en servicios como Netflix. Sus funcionalidades principales son:

- **Página de aterrizaje (Landing Page):** Presentación del servicio con sección de características, planes y preguntas frecuentes (FAQ).
- **Registro de usuarios:** Creación de cuentas con validación de datos y encriptación de contraseñas mediante bcrypt.
- **Inicio de sesión:** Autenticación diferenciada para usuarios y administradores con manejo de sesiones.
- **Dashboard principal:** Interfaz tipo Netflix con catálogo de películas y series organizadas por categorías.
- **Reproductor de video:** Reproducción de películas y episodios de series directamente en el navegador (HTML5 Video).
- **Gestión de contenido (CRUD):** Panel de administración para crear, leer, actualizar y eliminar películas, series, temporadas y capítulos.
- **Suscripciones y pagos:** Integración con MercadoPago para procesamiento de pagos con plan premium.
- **Recuperación de contraseñas:** Sistema de recuperación mediante tokens enviados por correo electrónico vía SMTP.

### Arquitectura Tecnológica

| Componente | Tecnología | Versión |
|------------|-----------|---------|
| Entorno de ejecución | Node.js | 22.x |
| Framework web | Express | 5.1.0 |
| Motor de vistas | EJS | 3.1.10 |
| Base de datos | MySQL (vía XAMPP) | 8.x |
| Driver de BD | mysql2 | 3.15.3 |
| Encriptación | bcrypt | 6.0.0 |
| Pasarela de pagos | MercadoPago SDK | 2.12.0 |
| Envío de correos | Nodemailer | 8.0.5 |
| Sesiones | express-session | 1.18.2 |
| Generación de UUID | uuid | 13.0.0 |

### Estructura del Proyecto

```
StreamPro/
├── app.js                      (Archivo principal — servidor Express)
├── package.json                (Configuración y dependencias)
├── config/
│   ├── conexion.js             (Conexión a MySQL)
│   ├── correo.js               (Configuración SMTP)
│   ├── link.js                 (URL base)
│   └── mercadopago.js          (Configuración de pagos)
├── rutas/
│   ├── index.js                (Ruta raíz)
│   ├── login.js                (Autenticación)
│   ├── registerUser.js         (Registro)
│   ├── home.js                 (Dashboard y CRUD)
│   ├── suscripcion.js          (Pagos y suscripciones)
│   ├── home1.js                (Rutas auxiliares)
│   └── recuperarPassword.js    (Recuperación de contraseña)
├── views/                      (Plantillas EJS)
├── public/
│   ├── css/                    (Estilos)
│   ├── js/                     (Scripts cliente)
│   ├── img/                    (Imágenes)
│   ├── portadas/               (Portadas de contenido)
│   └── video/                  (Archivos MP4)
└── database/
    └── stream_pro_schema.sql   (Esquema de base de datos)
```

### Base de Datos

La base de datos `stream_pro` en MySQL 8+ está compuesta por 8 tablas:

| Tabla | Propósito |
|-------|-----------|
| `administradores` | Credenciales del equipo administrativo |
| `usuarios` | Cuentas de usuarios registrados |
| `peliculas` | Catálogo de películas |
| `series` | Catálogo de series |
| `temporadas` | Temporadas asociadas a cada serie |
| `capitulos` | Episodios por temporada |
| `suscripciones` | Registro de suscripciones y pagos |
| `tokens_recuperacion` | Tokens para recuperación de contraseñas |

### Usuarios Proyectados

La aplicación está proyectada para atender aproximadamente **250 usuarios activos no concurrentes**, con un estimado de 25 a 50 usuarios simultáneos en horas pico y de 5 a 15 reproducciones de video concurrentes.

---

## MARCO NORMATIVO: ISO/IEC 14764

### Acerca de la Norma

La norma **ISO/IEC/IEEE 14764:2022** — *Software Engineering — Software Life Cycle Processes — Maintenance* es el estándar internacional que proporciona orientación para el mantenimiento de software. Esta norma es una evolución de la ISO/IEC 14764:2006 y se basa en el proceso de mantenimiento definido en la norma ISO/IEC/IEEE 12207:2017.

### Actividades del Proceso de Mantenimiento

Según la norma, el proceso de mantenimiento de software comprende las siguientes actividades:

1. **Process Implementation (Implementación del Proceso):** Establecer las políticas, planes, recursos y procedimientos para ejecutar el mantenimiento.

2. **Problem and Modification Analysis (Análisis de Problemas y Modificaciones):** Analizar las solicitudes de modificación y los reportes de problemas, evaluar su impacto y determinar la acción a tomar.

3. **Modification Implementation (Implementación de la Modificación):** Ejecutar los cambios necesarios en el código, documentación y base de datos.

4. **Maintenance Review/Acceptance (Revisión y Aceptación del Mantenimiento):** Verificar que las modificaciones realizadas cumplen con los requisitos y no introducen nuevos problemas.

5. **Migration (Migración):** Trasladar el software a un nuevo entorno operativo o plataforma.

6. **Retirement (Retiro):** Retirar el software de operación de manera controlada.

### Tipos de Mantenimiento Definidos

La norma ISO/IEC 14764 clasifica el mantenimiento en cuatro categorías:

| Tipo | Categoría | Descripción |
|------|-----------|-------------|
| **Correctivo** | Reactivo | Modificación realizada para corregir un problema o defecto descubierto después de la entrega |
| **Preventivo** | Proactivo | Modificación realizada para prevenir la ocurrencia de fallos potenciales |
| **Adaptativo** | Reactivo | Modificación para adaptar el software a cambios en el entorno operativo |
| **Perfectivo** | Proactivo | Modificación para mejorar el rendimiento, la mantenibilidad u otros atributos de calidad |

---

## TIPOS DE MANTENIMIENTO DE SOFTWARE

### Mantenimiento Preventivo (Proactivo)

El mantenimiento preventivo consiste en modificaciones proactivas realizadas en el software para prevenir la ocurrencia de fallos potenciales antes de que estos se materialicen. Se realiza de manera planificada y periódica.

**Actividades preventivas para StreamPro:**

| Actividad | Descripción | Frecuencia |
|-----------|-------------|------------|
| Respaldo de base de datos | Copia de seguridad completa de la BD `stream_pro` | Diaria |
| Monitoreo de logs | Revisión de logs de aplicación y errores del servidor | Diaria |
| Auditoría de dependencias | Ejecución de `npm audit` para detectar vulnerabilidades | Semanal |
| Verificación de almacenamiento | Control de espacio en disco para videos y portadas | Semanal |
| Revisión de rendimiento | Monitoreo de CPU, RAM y tiempo de respuesta del servidor | Quincenal |
| Actualización de dependencias | Actualización de paquetes npm a versiones estables | Mensual |
| Pruebas de regresión | Ejecución de pruebas funcionales completas | Mensual |
| Optimización de consultas SQL | Revisión y mejora de consultas lentas en MySQL | Trimestral |
| Simulacro de restauración | Prueba de recuperación de base de datos desde backup | Trimestral |
| Revisión de seguridad | Análisis de vulnerabilidades en configuración y código | Semestral |

### Mantenimiento Correctivo (Reactivo)

El mantenimiento correctivo consiste en modificaciones reactivas realizadas para corregir problemas o defectos identificados en el software después de su puesta en producción.

**Posibles escenarios correctivos para StreamPro:**

| Escenario | Síntoma | Causa raíz probable | Prioridad |
|-----------|---------|-------------------|-----------|
| Fallo en inicio de sesión | Error 500 al autenticar usuario | Error en consulta SQL o bcrypt | Crítica |
| Webhook de pago no procesa | Las suscripciones no se activan después del pago | Error en firma de integración con MercadoPago | Crítica |
| Video no carga en reproductor | Pantalla en negro al reproducir | Ruta de archivo incorrecta o archivo corrupto | Alta |
| Error en envío de correo | Tokens de recuperación no se envían | Fallo de conexión SMTP o credenciales incorrectas | Alta |
| CRUD de contenido no actualiza | Las modificaciones no se reflejan en BD | Error en consulta UPDATE o enlace de formulario | Media |
| Página de inicio lenta | Tiempo de carga superior a 5 segundos | Consultas SQL no optimizadas o falta de índice | Media |
| Estilos CSS no cargan | Interfaz sin formato visual | Ruta de archivo estático incorrecta | Baja |
| Error de sesión expirada | Usuario es desconectado antes de tiempo | Configuración incorrecta de express-session | Baja |

### Mantenimiento Adaptativo

El mantenimiento adaptativo responde a cambios en el entorno donde opera el software.

**Escenarios adaptativos para StreamPro:**

| Cambio en el entorno | Acción requerida |
|----------------------|------------------|
| Actualización de Express 5.x | Verificar compatibilidad de middleware y rutas |
| Cambio en API de MercadoPago | Actualizar integración y endpoints del SDK |
| Migración de MySQL 8 a 9 | Verificar compatibilidad de tipos de datos y funciones |
| Cambio en Gmail SMTP | Actualizar configuración de autenticación OAuth2 |
| Nueva versión de Node.js 24.x | Verificar compatibilidad de dependencias nativas |

### Mantenimiento Perfectivo

El mantenimiento perfectivo busca mejorar atributos de calidad del software sin cambiar sus requisitos funcionales.

**Oportunidades de mejora para StreamPro:**

| Mejora | Beneficio | Esfuerzo estimado |
|--------|-----------|-------------------|
| Migrar sesiones a Redis | Escalabilidad horizontal y persistencia de sesiones | 8 horas |
| Implementar CDN para videos | Reducir carga del servidor y mejorar velocidad de streaming | 16 horas |
| Caching de consultas frecuentes | Reducir tiempo de carga del dashboard | 4 horas |
| Refactorizar rutas con middleware | Mejorar mantenibilidad del código | 6 horas |
| Agregar pruebas automatizadas | Detectar regresiones tempranamente | 20 horas |

---

## PROCESO DE IMPLEMENTACIÓN

### Políticas de Mantenimiento

1. **Ventana de mantenimiento programado:** Se realizará los días domingos de 2:00 AM a 6:00 AM (hora local), con notificación anticipada mínima de 48 horas a los usuarios.

2. **Mantenimiento de emergencia:** Para incidentes críticos, se podrá realizar mantenimiento fuera de la ventana programada, previa autorización del administrador del sistema.

3. **Control de cambios:** Toda modificación debe registrarse en el sistema de seguimiento de incidencias antes de su implementación.

4. **Pruebas obligatorias:** Ningún cambio puede pasar a producción sin haber superado las pruebas de regresión correspondientes.

5. **Documentación:** Toda modificación debe actualizar la documentación asociada (código, diagramas, manuales).

### Roles y Responsabilidades

| Rol | Responsable | Funciones |
|-----|-------------|-----------|
| **Administrador del Sistema** | Propietario del proyecto | Autorizar cambios críticos, gestionar ventanas de mantenimiento, supervisar backups, escalar incidentes |
| **Desarrollador de Mantenimiento** | Programador asignado | Implementar modificaciones, actualizar documentación, ejecutar pruebas unitarias, mantener dependencias |
| **Tester/Validador** | Evaluador designado | Ejecutar pruebas de regresión, verificar criterios de aceptación, reportar no conformidades |
| **Usuario Reportante** | Usuario final o administrador | Reportar incidentes, validar la corrección en el entorno de pruebas |

### Herramientas de Soporte

| Herramienta | Propósito |
|-------------|-----------|
| **Git + GitHub** | Control de versiones y gestión de ramas |
| **GitHub Issues** | Registro y seguimiento de incidencias |
| **PM2** | Gestión de procesos Node.js en producción |
| **Prometheus + Grafana** | Monitoreo de métricas del servidor |
| **MySQL Workbench / phpMyAdmin** | Administración de base de datos |
| **npm audit** | Auditoría de seguridad de dependencias |
| **Postman / Insomnia** | Pruebas de endpoints API |
| **Nodemailer** | Verificación de envío de correos |

### Gestión de Configuración

- **Ramas en Git:**
  - `main`: Código en producción
  - `develop`: Integración de cambios
  - `fix/*`: Corrección de bugs
  - `preventive/*`: Mantenimiento preventivo
  - `feature/*`: Nuevas funcionalidades (perfectivo/adaptativo)

- **Versionado:** Se utilizará versionado semántico (MAJOR.MINOR.PATCH):
  - PATCH: Mantenimiento correctivo
  - MINOR: Mantenimiento perfectivo/adaptativo
  - MAJOR: Cambios que rompen compatibilidad

---

## ANÁLISIS DE MODIFICACIÓN Y PROBLEMAS

### Registro de Incidentes

Cada incidencia de mantenimiento debe registrarse en GitHub Issues con la siguiente estructura:

```
Título: [TIPO] Descripción breve del problema
Tipo: Correctivo | Preventivo | Adaptativo | Perfectivo
Prioridad: Crítica | Alta | Media | Baja
Estado: Reportado | En análisis | En implementación | En pruebas | Resuelto | Cerrado
Reportado por: [Nombre]
Asignado a: [Nombre]
Fecha de reporte: DD/MM/AAAA
Descripción:
  [Descripción detallada del problema o mejora]
Pasos para reproducir (correctivo):
  1. Ir a [ruta]
  2. Realizar [acción]
  3. Observar [resultado actual vs esperado]
Entorno:
  - Navegador: Chrome/Firefox/Edge
  - Sistema operativo: Windows 10/11
  - URL: http://localhost:3000/[ruta]
```

### Matriz de Priorización

| Prioridad | Definición | Tiempo de respuesta | Tiempo de resolución |
|-----------|------------|--------------------|----------------------|
| **Crítica** | El sistema no funciona o un proceso core está caído (login, pagos, reproductor) | 1 hora | 4 horas |
| **Alta** | Funcionalidad importante no disponible o con rendimiento degradado significativamente | 4 horas | 24 horas |
| **Media** | Funcionalidad no crítica afectada o error que no impide la operación normal | 24 horas | 72 horas |
| **Baja** | Problema cosmético, sugerencia de mejora o documentación | 72 horas | 1 semana |

### Análisis de Causa Raíz

Para incidentes correctivos de prioridad Crítica o Alta, se aplicará la técnica de los **5 Porqués (5 Whys)** para identificar la causa raíz del problema:

1. **¿Qué ocurrió?** — Descripción del síntoma
2. **¿Por qué ocurrió?** — Causa inmediata
3. **¿Por qué esa causa?** — Causa subyacente
4. **¿Por qué?** — Causa estructural
5. **¿Por qué?** — Causa raíz

**Herramientas de diagnóstico para StreamPro:**

| Problema | Herramienta de diagnóstico |
|----------|---------------------------|
| Error en petición HTTP | Logs de Express en consola, estado de respuesta |
| Error en base de datos | MySQL error log, phpMyAdmin |
| Error en integración MercadoPago | Logs de webhook, dashboard de MercadoPago |
| Error en envío de correos | Logs de Nodemailer, verificar credenciales SMTP |
| Error en carga de recursos estáticos | Consola del navegador (F12 → Network tab) |
| Error en sesiones | Revisar configuración de express-session |

---

## IMPLEMENTACIÓN DE LA MODIFICACIÓN

### Flujo de Trabajo

El proceso de implementación de una modificación sigue un flujo estructurado de 10 pasos:

```
1. REPORTE               2. REGISTRO              3. ASIGNACIÓN
   [Usuario/Admin]   →   [GitHub Issues]      →   [Desarrollador]
                                                         ↓
                                              4. RAMA GIT
                                          fix/descripcion-corta
                                                         ↓
                                              5. IMPLEMENTACIÓN
                                          [Código + Documentación]
                                                         ↓
                                              6. PRUEBAS LOCALES
                                          [Unitarias + Funcionales]
                                                         ↓
                                         ┌─────────────────────┐
                                         7. PULL REQUEST       │
                                         │  Code Review        │
                                         └─────────────────────┘
                                                         ↓
                                              8. DESPLIEGUE
                                          [Ventana de mantto.]
                                                         ↓
                                              9. VERIFICACIÓN
                                          [Pruebas post-despliegue]
                                                         ↓
                                              10. CIERRE
                                          [Issue resuelto + Acta]
```

### Procedimiento Detallado

#### Paso 1: Reporte
El reporte de un problema o solicitud de modificación puede ser realizado por cualquier usuario o administrador a través del sistema de tickets (GitHub Issues) o comunicación directa con el equipo de mantenimiento.

#### Paso 2: Registro
Se crea un issue en GitHub con la plantilla establecida, especificando tipo, prioridad y descripción detallada.

#### Paso 3: Asignación
El administrador del sistema revisa el issue, confirma la prioridad y asigna el caso al desarrollador correspondiente.

#### Paso 4: Creación de Rama Git
El desarrollador crea una rama a partir de `develop` con la convención:
- `fix/descripcion-corta` — para correctivo
- `preventive/descripcion-corta` — para preventivo
- `perf/descripcion-corta` — para perfectivo
- `adapt/descripcion-corta` — para adaptativo

#### Paso 5: Implementación
El desarrollador realiza los cambios necesarios en el código fuente, vistas, rutas, configuración o base de datos. Se debe actualizar la documentación afectada.

#### Paso 6: Pruebas Locales
Se ejecutan pruebas locales para verificar:
- Funcionamiento correcto del cambio
- No regresión en funcionalidades existentes
- Conexión a base de datos
- Integración con servicios externos (MercadoPago, correo)

#### Paso 7: Pull Request y Code Review
Se crea un Pull Request hacia `develop`. El administrador del sistema o un par revisa el código antes de la integración.

#### Paso 8: Despliegue
Se programa el despliegue en la ventana de mantenimiento correspondiente. El procedimiento de despliegue es:
```bash
git checkout main
git pull origin main
git merge develop
npm install
node app.js
```

#### Paso 9: Verificación Post-Despliegue
Se ejecuta una prueba de humo para verificar:
- Inicio de sesión (usuario y admin)
- Carga del dashboard y catálogo
- Reproducción de video
- Funcionalidad corregida específicamente

#### Paso 10: Cierre
Se actualiza el issue en GitHub, se registra el tiempo empleado y se genera el acta de cierre.

---

## ACEPTACIÓN Y REVISIÓN DEL MANTENIMIENTO

### Criterios de Aceptación

Una modificación se considera aceptada cuando cumple con todos los siguientes criterios:

1. **Funcionalidad:** La modificación resuelve el problema reportado o implementa la mejora solicitada según los requisitos definidos.

2. **No regresión:** Todas las funcionalidades existentes continúan operando correctamente. Se verifica especialmente:
   - Registro e inicio de sesión de usuarios
   - CRUD de películas, series, temporadas y capítulos
   - Integración con MercadoPago (crear suscripción y webhook)
   - Envío y verificación de tokens de recuperación
   - Reproducción de video

3. **Estabilidad:** El servidor no presenta errores inesperados en los logs después del despliegue.

4. **Documentación:** La documentación asociada ha sido actualizada (código comentado, diagramas, este plan si aplica).

5. **Pruebas:** Las pruebas definidas han sido ejecutadas y aprobadas.

### Pruebas de Regresión

| Módulo | Prueba | Resultado esperado |
|--------|--------|--------------------|
| Autenticación | Iniciar sesión como usuario | Redirección a /home |
| Autenticación | Iniciar sesión como administrador | Redirección a /home con opciones admin |
| Autenticación | Registro de nuevo usuario | Creación en BD y redirección |
| Catálogo | Cargar dashboard | Películas y series visibles por categoría |
| Catálogo | Buscar película por título | Resultados filtrados correctamente |
| Contenido | CRUD: crear película | Registro insertado en BD |
| Contenido | CRUD: actualizar serie | Cambios reflejados en BD |
| Contenido | CRUD: eliminar temporada | Borrado en cascada |
| Pagos | Crear preferencia de pago | Redirección a MercadoPago |
| Pagos | Webhook de notificación | Actualización de estado en suscripciones |
| Correo | Enviar token de recuperación | Correo recibido con token de 8 dígitos |
| Correo | Verificar token válido | Redirección a cambio de contraseña |
| Video | Reproducir película | Video carga y reproduce correctamente |

### Acta de Aceptación

Al finalizar cada mantenimiento, se debe generar un acta de cierre que contenga:

```
ACTA DE ACEPTACIÓN DE MANTENIMIENTO
=====================================
ID del Issue: #[número]
Título: [título del issue]
Tipo: [Correctivo | Preventivo | Adaptativo | Perfectivo]
Fecha de ejecución: DD/MM/AAAA
Duración: [horas]
Desarrollador: [nombre]

Cambios realizados:
- [Archivo modificado 1]: [descripción del cambio]
- [Archivo modificado 2]: [descripción del cambio]
- [Base de datos]: [cambio en BD si aplica]

Pruebas ejecutadas:
- [Prueba 1]: [Aprobada / Rechazada]
- [Prueba 2]: [Aprobada / Rechazada]

Resultado: [APROBADO / RECHAZADO]
Observaciones: [notas adicionales]

Firma Administrador: _________________________
Firma Desarrollador: _________________________
```

---

## MIGRACIÓN

### Escenarios de Migración

La migración del software consiste en trasladar el producto de software a un entorno operativo diferente. Para StreamPro se contemplan los siguientes escenarios:

#### Escenario 1: Migración de Entorno Local a Producción (VPS/Cloud)

**Origen:** Servidor local (Windows + XAMPP)
**Destino:** Servidor VPS con Ubuntu Server 24.04 LTS

**Procedimiento:**

1. **Preparación del servidor destino:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install nodejs npm mysql-server -y
   node --version   # Verificar v22.x
   mysql --version  # Verificar 8.x
   ```

2. **Configuración de MySQL en destino:**
   ```bash
   sudo mysql -u root -p
   CREATE DATABASE stream_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   ```

3. **Respaldo y restauración de base de datos:**
   ```bash
   # En origen (Windows - XAMPP)
   mysqldump -u root stream_pro > stream_pro_backup.sql

   # En destino (Ubuntu)
   mysql -u root -p stream_pro < stream_pro_backup.sql
   ```

4. **Transferencia de archivos:**
   ```bash
   scp -r C:\Stream\StreamPro user@vps:/var/www/streampro
   ```

5. **Instalación de dependencias y configuración:**
   ```bash
   cd /var/www/streampro
   npm install
   # Configurar conexion.js con nuevas credenciales
   ```

6. **Configuración de PM2 para gestión del proceso:**
   ```bash
   npm install -g pm2
   pm2 start app.js --name streampro
   pm2 save
   pm2 startup
   ```

7. **Configuración de Nginx como proxy inverso:**
   ```nginx
   server {
       listen 80;
       server_name streampro.domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Configuración de HTTPS con Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d streampro.domain.com
   ```

9. **Pruebas en producción:**
   - Verificar acceso vía dominio
   - Probar login, registro y reproducción de video
   - Verificar webhook de MercadoPago

10. **Corte definitivo:**
    - Redirigir tráfico del entorno local al nuevo servidor
    - Monitorear logs durante las primeras 24 horas

#### Escenario 2: Migración de Almacenamiento de Video a CDN

**Origen:** Archivos locales en `public/video/`
**Destino:** Amazon S3 + CloudFront (CDN)

**Procedimiento:**

1. Crear bucket S3 y configurar permisos públicos para lectura.
2. Subir archivos MP4 al bucket mediante AWS CLI.
3. Configurar distribución CloudFront con el bucket como origen.
4. Actualizar las rutas de video en la base de datos (`ruta_pel`, `ruta_cap`) para apuntar a la URL de CloudFront.
5. Actualizar la lógica de reproducción en las vistas EJS.
6. Realizar pruebas de reproducción y rendimiento.

### Plan de Rollback

Para cada migración, se debe definir un plan de reversión:

| Escenario | Acción de rollback |
|-----------|-------------------|
| Migración de servidor | Restaurar DNS al servidor anterior, restaurar BD desde backup |
| Migración de almacenamiento | Revertir rutas en BD a rutas locales |
| Migración de base de datos | Ejecutar script de reversión, restaurar desde backup |

---

## RETIRO

### Condiciones para el Retiro

El retiro del software es la actividad final del proceso de mantenimiento. Se considera el retiro de StreamPro cuando ocurra alguna de las siguientes condiciones:

1. Fin del ciclo de vida del producto por obsolescencia tecnológica.
2. Reemplazo por una nueva versión mayor (StreamPro 2.0) que requiera arquitectura diferente.
3. Cese de operaciones del servicio por decisión administrativa.
4. Migración a una plataforma comercial que hace innecesario el desarrollo propio.

### Procedimiento de Retiro

**Fase 1 — Planificación (30 días antes):**

1. Notificar a todos los usuarios registrados sobre el cese del servicio, indicando la fecha definitiva de término.
2. Informar sobre el proceso de exportación de datos personales disponible para los usuarios.
3. Establecer la fecha de corte y el cronograma de las actividades de retiro.

**Fase 2 — Exportación de Datos (15 días antes):**

1. Habilitar funcionalidad de exportación de datos de usuarios (nombre, correo, historial de suscripciones):
   ```sql
   SELECT correo_user, nombre_user, fecha_regis_user
   FROM usuarios
   INTO OUTFILE '/backups/streampro_usuarios.csv'
   FIELDS TERMINATED BY ',' ENCLOSED BY '"'
   LINES TERMINATED BY '\n';
   ```
2. Entregar los datos exportados a los usuarios que lo soliciten.

**Fase 3 — Backup Final (1 día antes):**

1. Realizar backup completo de la base de datos:
   ```bash
   mysqldump -u root -p stream_pro > stream_pro_retiro_final.sql
   ```
2. Comprimir y archivar los archivos del proyecto, incluyendo videos y portadas:
   ```bash
   tar -czf stream_pro_archivo_final.tar.gz C:\Stream\StreamPro
   ```
3. Almacenar los backups en almacenamiento externo (disco duro externo + nube) por un período mínimo de 1 año.

**Fase 4 — Baja del Servicio (día del retiro):**

1. Detener el servidor de aplicaciones:
   ```bash
   pm2 stop streampro
   pm2 delete streampro
   ```
2. Detener el servicio de MySQL (XAMPP): `apache_stop` y `mysql_stop`.
3. Respaldar logs finales del sistema.
4. Registrar la finalización en el sistema de seguimiento.

**Fase 5 — Archivado (post-retiro):**

1. Archivar el repositorio en GitHub como repositorio privado de solo lectura.
2. Almacenar la documentación completa del proyecto (incluyendo este plan de mantenimiento).
3. Enviar comunicado final a los usuarios confirmando el cierre del servicio.

---

## CRONOGRAMA DE MANTENIMIENTO

### Cronograma de Mantenimiento Preventivo

| ID | Actividad | Tipo | Frecuencia | Duración | Responsable | Recursos necesarios |
|----|-----------|------|------------|----------|-------------|-------------------|
| MP-01 | Respaldo automático de base de datos | Preventivo | Diaria | 15 min | Admin sistema | mysqldump, script automatizado |
| MP-02 | Revisión de logs de aplicación y errores | Preventivo | Diaria | 30 min | Admin sistema | Consola, archivos de log |
| MP-03 | Verificación de conectividad con servicios externos (MercadoPago, SMTP) | Preventivo | Diaria | 15 min | Admin sistema | Postman, logs |
| MP-04 | Auditoría de dependencias (`npm audit`) | Preventivo | Semanal | 30 min | Desarrollador | npm CLI |
| MP-05 | Verificación de espacio en disco | Preventivo | Semanal | 15 min | Admin sistema | df -h, Administrador de tareas |
| MP-06 | Revisión de salud del servidor (uptime, procesos) | Preventivo | Semanal | 30 min | Admin sistema | PM2 monit, Administrador de tareas |
| MP-07 | Monitoreo de rendimiento (CPU, RAM, tiempo de respuesta) | Preventivo | Quincenal | 1 hora | Admin sistema | Prometheus, Grafana, Task Manager |
| MP-08 | Análisis de consultas lentas en MySQL | Preventivo | Quincenal | 1 hora | Desarrollador | MySQL slow query log, phpMyAdmin |
| MP-09 | Actualización de dependencias npm | Preventivo | Mensual | 2 horas | Desarrollador | npm update, pruebas de regresión |
| MP-10 | Pruebas de regresión completas | Preventivo | Mensual | 4 horas | Tester | Postman, navegador, checklist |
| MP-11 | Limpieza de archivos temporales y logs antiguos | Preventivo | Mensual | 30 min | Admin sistema | Script de limpieza |
| MP-12 | Optimización de consultas SQL | Preventivo | Trimestral | 3 horas | Desarrollador | MySQL Workbench, EXPLAIN |
| MP-13 | Simulacro de restauración de backup | Preventivo | Trimestral | 2 horas | Admin sistema | mysqldump, mysql restore |
| MP-14 | Revisión de seguridad y vulnerabilidades | Preventivo | Semestral | 4 horas | Desarrollador | npm audit, OWASP checklist |
| MP-15 | Evaluación de desempeño general del sistema | Preventivo | Semestral | 4 horas | Todo el equipo | Reportes, métricas, encuestas |

### Cronograma de Mantenimiento Correctivo

| ID | Actividad | Tipo | Frecuencia | Duración máxima | Responsable |
|----|-----------|------|------------|-----------------|-------------|
| MC-01 | Atención de incidentes críticos (prioridad Crítica) | Correctivo | Según ocurrencia | 4 horas | Desarrollador + Admin |
| MC-02 | Atención de incidentes de prioridad Alta | Correctivo | Según ocurrencia | 24 horas | Desarrollador |
| MC-03 | Atención de incidentes de prioridad Media | Correctivo | Según ocurrencia | 72 horas | Desarrollador |
| MC-04 | Atención de incidentes de prioridad Baja | Correctivo | Según ocurrencia | 1 semana | Desarrollador |

### Cronograma Anual (Vista General)

```
LEYENDA:
D = Diaria   S = Semanal   Q = Quincenal   M = Mensual
T = Trimestral   SM = Semestral   A = Anual   E = Eventual

ACTIVIDAD                    ENE  FEB  MAR  ABR  MAY  JUN  JUL  AGO  SEP  OCT  NOV  DIC
─────────────────────────────────────────────────────────────────────────────────────────
PREVENTIVO
Respaldo BD (D)              ████ ████ ████ ████ ████ ████ ████ ████ ████ ████ ████ ████
Revisión logs (D)            ████ ████ ████ ████ ████ ████ ████ ████ ████ ████ ████ ████
npm audit (S)                ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓
Espacio disco (S)            ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓ ▓▓▓▓
Rendimiento (Q)              ░░   ░░   ░░   ░░   ░░   ░░   ░░   ░░   ░░   ░░   ░░   ░░
Actualizar deps (M)          ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒
Pruebas regresión (M)        ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒    ▒
Optimizar SQL (T)            ░         ░         ░         ░         ░
Simulacro backup (T)              ░         ░         ░         ░
Seguridad (SM)               ▓▓                   ▓▓                   ▓▓
Evaluación general (SM)           ▓▓                   ▓▓                   ▓▓

CORRECTIVO
Incidentes críticos (E)      ◆    ◆         ◆         ◆    ◆              ◆      ◆
Incidentes altos (E)              ◆    ◆    ◆    ◆    ◆    ◆    ◆    ◆    ◆    ◆    ◆
Incidentes medios (E)         ◆   ◆   ◆   ◆   ◆   ◆   ◆   ◆   ◆   ◆   ◆   ◆   ◆   ◆
```

---

## MATRIZ DE RESPONSABILIDADES

### Matriz RACI

| Actividad | Admin Sistema | Desarrollador | Tester | Usuario Reportante |
|-----------|:------------:|:-------------:|:------:|:------------------:|
| Definir políticas de mantenimiento | **R** | C | I | I |
| Registrar incidente | I | I | I | **R** |
| Clasificar y priorizar incidente | **R** | C | C | — |
| Analizar causa raíz | A | **R** | C | — |
| Implementar modificación | I | **R** | — | — |
| Ejecutar pruebas unitarias | I | **R** | C | — |
| Ejecutar pruebas de regresión | I | C | **R** | — |
| Aprobar pase a producción | **R** | C | C | — |
| Desplegar en producción | A | **R** | — | — |
| Verificar post-despliegue | **R** | C | C | C |
| Cerrar incidente | **R** | I | I | I |
| Realizar backup de BD | **R** | I | — | — |
| Actualizar documentación | I | **R** | — | — |
| Realizar migración | **R** | C | C | — |
| Ejecutar retiro del software | **R** | C | I | I |

**Leyenda:** R = Responsable, A = Aprueba, C = Consultado, I = Informado

---

## INDICADORES DE GESTIÓN DE MANTENIMIENTO

### Métricas de Mantenimiento

Para evaluar la efectividad del plan de mantenimiento, se definen los siguientes indicadores:

| Indicador | Fórmula | Meta | Frecuencia de medición |
|-----------|---------|------|------------------------|
| **Disponibilidad del sistema** | (Tiempo total - Tiempo de inactividad) / Tiempo total × 100 | ≥ 99.5% | Mensual |
| **Tiempo promedio de resolución (MTTR)** | Tiempo total de resolución / Número de incidentes resueltos | Crítico: ≤ 4 h, Alto: ≤ 24 h | Mensual |
| **Tiempo promedio entre fallos (MTBF)** | Tiempo total de operación / Número de fallos | ≥ 720 horas (30 días) | Trimestral |
| **Porcentaje de incidentes correctivos vs preventivos** | Incidentes correctivos / Total de incidentes × 100 | ≤ 40% | Trimestral |
| **Índice de cumplimiento del cronograma** | Actividades preventivas ejecutadas / Actividades preventivas planificadas × 100 | ≥ 90% | Mensual |
| **Cobertura de pruebas de regresión** | Pruebas aprobadas / Total de pruebas ejecutadas × 100 | ≥ 95% | Por cada mantenimiento |
| **Tasa de reapertura de incidentes** | Incidentes reabiertos / Total de incidentes cerrados × 100 | ≤ 5% | Mensual |

---

## CONCLUSIONES

1. El plan de mantenimiento y soporte para StreamPro, fundamentado en la norma ISO/IEC/IEEE 14764:2022, proporciona un marco estructurado que cubre todas las actividades del proceso de mantenimiento: implementación del proceso, análisis de problemas y modificaciones, implementación de modificaciones, revisión y aceptación, migración y retiro.

2. La distinción clara entre mantenimiento preventivo (15 actividades planificadas con frecuencias definidas) y correctivo (4 categorías de prioridad con tiempos de respuesta establecidos) permite asignar recursos de manera eficiente, reduciendo el tiempo de inactividad del sistema y mejorando la experiencia del usuario.

3. El flujo de trabajo de 10 pasos para la implementación de modificaciones, desde el reporte hasta el cierre, garantiza que todos los cambios sean debidamente documentados, probados y aprobados antes de su paso a producción, minimizando el riesgo de regresiones.

4. La matriz RACI definida asigna claramente las responsabilidades de cada rol (administrador del sistema, desarrollador, tester, usuario reportante) en cada actividad del proceso de mantenimiento, eliminando ambigüedades en la ejecución.

5. Los indicadores de gestión propuestos (disponibilidad, MTTR, MTBF, cumplimiento del cronograma, entre otros) permiten medir objetivamente la efectividad del plan de mantenimiento y realizar ajustes continuos para mejorar la calidad del servicio.

6. Los procedimientos de migración documentados (local a VPS, almacenamiento a CDN) y el plan de retiro garantizan que cualquier transición del software se realice de manera controlada, preservando la integridad de los datos y minimizando el impacto en los usuarios.

---

## REFERENCIAS BIBLIOGRÁFICAS

1. **ISO/IEC/IEEE 14764:2022.** (2022). *Ingeniería de software — Procesos del ciclo de vida del software — Mantenimiento* (3.ª ed.). Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/80710.html

2. **ISO/IEC/IEEE 12207:2017.** (2017). *Ingeniería de sistemas y software — Procesos del ciclo de vida del software*. Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/63712.html

3. **IEEE.** (2021). *Estándar Internacional ISO/IEC/IEEE — Ingeniería de software — Procesos del ciclo de vida del software — Mantenimiento*. IEEE Std 14764-2021. Recuperado de https://ieeexplore.ieee.org/document/9690131/

4. **Node.js Foundation.** (2026). *Documentación oficial de Node.js*. Recuperado de https://nodejs.org/es/docs/

5. **Express.js.** (2026). *Express — Framework web rápido, sin opiniones y minimalista para Node.js*. Recuperado de https://expressjs.com/

6. **MySQL, Oracle Corporation.** (2026). *Manual de referencia de MySQL 8.4*. Recuperado de https://dev.mysql.com/doc/refman/8.4/en/

7. **Mercado Pago Developers.** (2026). *Documentación para desarrolladores — Integración de pagos en Latinoamérica*. Mercado Libre Colombia. Recuperado de https://www.mercadopago.com.co/developers

8. **Nodemailer.** (2026). *Nodemailer — Envío de correos electrónicos con Node.js*. Recuperado de https://nodemailer.com/

9. **PM2.** (2026). *PM2 — Gestor de procesos avanzado para Node.js*. Recuperado de https://pm2.keymetrics.io/

10. **ISO 31000:2018.** (2018). *Gestión del riesgo — Directrices*. Organización Internacional de Normalización.

11. **SENA — Servicio Nacional de Aprendizaje.** (2026). *Material de formación: Análisis y Desarrollo de Software — Mantenimiento de Software. Programa de formación: Tecnólogo en Análisis y Desarrollo de Software*. Centro de Gestión de Mercados, Logística y Tecnologías de la Información, Regional Distrito Capital, Bogotá, Colombia.

12. **Pressman, R. S.** (2010). *Ingeniería del software: Un enfoque práctico* (7.ª ed.). Traducido al español. McGraw-Hill Education.

13. **ISO 25000.** (2023). *Ingeniería de software — Requisitos y evaluación de la calidad del producto de software (SQuaRE)*. Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/64764.html

14. **Google Cloud.** (2026). *Guía de migración a la nube para aplicaciones Node.js*. Recuperado de https://cloud.google.com/nodejs/docs/migration

15. **Mozilla Developer Network (MDN).** (2026). *Tecnología HTML5 Video — Reproducción de video en navegadores web*. Recuperado de https://developer.mozilla.org/es/docs/Web/HTML/Element/video

---

*Documento elaborado como evidencia de aprendizaje para el componente formativo de Mantenimiento y Soporte de Software.*

*SENA — Servicio Nacional de Aprendizaje, Colombia — 2026*
