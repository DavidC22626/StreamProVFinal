# PLAN DE MIGRACIÓN Y RESPALDO DE DATOS — STREAMPRO

**Listas de Chequeo para el Proceso de Migración de Software y Revisión de Modificaciones**

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
2. [Objetivos](#objetivos)
3. [Descripción del Sistema](#descripción-del-sistema)
4. [Instrucciones de Uso de las Listas de Chequeo](#instrucciones-de-uso-de-las-listas-de-chequeo)
5. [Lista de Chequeo 1: Proceso de Migración de Software](#lista-de-chequeo-1-proceso-de-migración-de-software)
   - 5.1 Fase de Pre-Migración
   - 5.2 Fase de Respaldo de Datos
   - 5.3 Fase de Ejecución de la Migración
   - 5.4 Fase de Post-Migración y Verificación
6. [Lista de Chequeo 2: Revisión de Modificaciones y Adaptaciones](#lista-de-chequeo-2-revisión-de-modificaciones-y-adaptaciones)
   - 6.1 Análisis de Cambios Realizados
   - 6.2 Documentación Asociada
   - 6.3 Pruebas y Validación
   - 6.4 Cumplimiento Normativo y Seguridad
7. [Conclusiones](#conclusiones)
8. [Referencias Bibliográficas](#referencias-bibliográficas)

---

## INTRODUCCIÓN

La migración de software es un proceso crítico dentro del ciclo de vida de cualquier producto tecnológico. Consiste en trasladar un sistema funcional desde un entorno operativo original hacia una nueva plataforma, infraestructura o versión, garantizando la integridad, disponibilidad y continuidad de los datos y servicios. Una migración mal planificada puede ocasionar pérdida de información, tiempos de inactividad prolongados, degradación del rendimiento y experiencias negativas para los usuarios finales.

El presente documento tiene como objetivo proporcionar un instrumento estructurado de verificación —en formato de listas de chequeo— para el proceso de migración y respaldo de datos de la aplicación **StreamPro**, una plataforma de streaming de contenido audiovisual desarrollada como proyecto formativo del programa Análisis y Desarrollo de Software del SENA.

Se presentan dos listas de chequeo complementarias:

1. **Lista de Chequeo de Migración de Software:** Cubre las fases de pre-migración, respaldo de datos, ejecución de la migración y post-migración, asegurando que cada paso se realice de manera controlada y verificable.

2. **Lista de Chequeo de Revisión de Modificaciones:** Permite evaluar y documentar las adaptaciones realizadas durante el proceso de migración, garantizando que los cambios en código, configuración, base de datos e infraestructura sean correctos, seguros y estén debidamente documentados.

Ambos instrumentos están diseñados específicamente para el contexto tecnológico de StreamPro, considerando su arquitectura basada en Node.js + Express, su base de datos MySQL gestionada a través de XAMPP, y sus integraciones con servicios externos como MercadoPago y Gmail SMTP.

---

## OBJETIVOS

### Objetivo General

Diseñar listas de chequeo que permitan documentar, controlar y verificar de manera sistemática el proceso de migración de software y las adaptaciones realizadas en la aplicación StreamPro, asegurando la integridad de los datos, la continuidad del servicio y la trazabilidad de los cambios.

### Objetivos Específicos

1. Definir los criterios de verificación para cada fase del proceso de migración (pre-migración, respaldo, ejecución y post-migración) adaptados a la arquitectura tecnológica de StreamPro.

2. Establecer un instrumento de revisión que permita evaluar las modificaciones realizadas durante la migración en términos de corrección técnica, integridad de datos, seguridad y documentación.

3. Proveer una herramienta de auditoría que facilite la identificación temprana de desviaciones, riesgos y no conformidades durante el proceso de migración.

4. Garantizar la trazabilidad de cada actividad realizada, asignando responsables y registrando observaciones para cada ítem verificado.

---

## DESCRIPCIÓN DEL SISTEMA

### Identificación del Software

| Atributo | Descripción |
|----------|-------------|
| **Nombre** | StreamPro |
| **Tipo** | Plataforma de streaming de contenido audiovisual |
| **Versión** | 1.0.0 |
| **Arquitectura** | Node.js + Express 5 + MySQL 8 (XAMPP) |
| **Autor** | David Caicedo |
| **Programa** | Análisis y Desarrollo de Software — SENA |

### Stack Tecnológico

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

### Estructura de la Base de Datos

La base de datos `stream_pro` está compuesta por 8 tablas:

| Tabla | Propósito | Registros típicos |
|-------|-----------|-------------------|
| `administradores` | Credenciales del equipo administrativo | 1-5 |
| `usuarios` | Cuentas de usuarios registrados | 0-250 |
| `peliculas` | Catálogo de películas | 0-100 |
| `series` | Catálogo de series | 0-50 |
| `temporadas` | Temporadas asociadas a cada serie | 0-200 |
| `capitulos` | Episodios por temporada | 0-1000 |
| `suscripciones` | Registro de suscripciones y pagos | 0-250 |
| `tokens_recuperacion` | Tokens para recuperación de contraseñas | Variable |

### Escenarios de Migración Contemplados

Las listas de chequeo están diseñadas para cubrir los siguientes escenarios de migración aplicables a StreamPro:

| Escenario | Origen | Destino | Tipo |
|-----------|--------|---------|------|
| E1: Local a VPS | Windows + XAMPP (local) | Ubuntu Server + MySQL nativo | Infraestructura |
| E2: Almacenamiento a CDN | Archivos locales `public/video/` | Amazon S3 + CloudFront | Almacenamiento |
| E3: Cambio de versión de Node.js | Node.js 22.x | Node.js 24.x | Plataforma |
| E4: Cambio de versión de MySQL | MySQL 8 (XAMPP) | MySQL 9 | Base de datos |
| E5: Migración de entorno de desarrollo | PC local | PC de reemplazo | Equipo |

---

## INSTRUCCIONES DE USO DE LAS LISTAS DE CHEQUEO

### Formato de los Campos

Cada ítem de las listas de chequeo contiene los siguientes campos:

| Campo | Descripción |
|-------|-------------|
| **ID** | Identificador único del ítem (prefijo según fase) |
| **Actividad / Aspecto a Verificar** | Descripción clara de lo que se debe revisar o ejecutar |
| **Criterio de Aceptación** | Condición que debe cumplirse para dar el ítem por verificado |
| **Estado** | Marcar con **Sí** (cumple), **No** (no cumple) o **N/A** (no aplica) |
| **Responsable** | Persona encargada de ejecutar o verificar la actividad |
| **Observaciones** | Espacio para notas, evidencia o referencias |

### Escala de Verificación

- **Sí:** El ítem cumple completamente con el criterio de aceptación. Se ha verificado y documentado.
- **No:** El ítem no cumple con el criterio de aceptación. Se requiere acción correctiva antes de continuar.
- **N/A:** El ítem no aplica para el escenario de migración específico que se está ejecutando.

### Condiciones para la Ejecución

- Cada lista de chequeo debe ser diligenciada por el responsable asignado y revisada por el administrador del sistema.
- Los ítems marcados como **No** deben resolverse antes de avanzar a la siguiente fase.
- Al finalizar cada lista, se debe calcular el porcentaje de cumplimiento y adjuntar el documento firmado al acta de migración.

---

## LISTA DE CHEQUEO 1: PROCESO DE MIGRACIÓN DE SOFTWARE

**Propósito:** Verificar de manera sistemática cada fase del proceso de migración de la aplicación StreamPro, desde la planificación inicial hasta la validación final en el entorno destino.

**Instrucciones:** Diligenciar en orden secuencial. No avanzar a la siguiente fase hasta que todos los ítems de la fase actual estén marcados como **Sí** o **N/A**.

### Datos Generales de la Migración

| Campo | Valor |
|-------|-------|
| **Fecha de inicio** | |
| **Fecha de finalización** | |
| **Escenario de migración** | E1 / E2 / E3 / E4 / E5 |
| **Origen** | |
| **Destino** | |
| **Administrador responsable** | |
| **Desarrollador ejecutor** | |
| **Número de acta / ticket** | |

---

### 5.1 Fase de Pre-Migración

| ID | Actividad / Aspecto a Verificar | Criterio de Aceptación | Estado (Sí/No/N/A) | Responsable | Observaciones |
|----|-------------------------------|------------------------|--------------------|-------------|---------------|
| PRE-01 | Realizar inventario completo del entorno origen | Se listan: versión de Node.js, versión de MySQL, dependencias npm, archivos de configuración, rutas de almacenamiento, servicios externos consumidos | | | |
| PRE-02 | Verificar versiones de software en el entorno origen | `node -v` >= 22.x; `npm -v` >= 10.x; `mysql --version` >= 8.x; verificar versión de Express en `package.json` | | | |
| PRE-03 | Identificar todas las dependencias del proyecto | Ejecutar `npm list --depth=0` y verificar que todas las dependencias en `package.json` están instaladas correctamente | | | |
| PRE-04 | Documentar la configuración actual de servicios externos | Registrar claves/credenciales de MercadoPago (access_token, public_key), configuración SMTP (host, puerto, usuario), URL base en `config/link.js` | | | |
| PRE-05 | Verificar espacio en disco disponible en el entorno destino | Espacio libre >= 10 GB para aplicación, BD y archivos multimedia | | | |
| PRE-06 | Instalar y configurar software base en el entorno destino | Node.js, npm, MySQL, PM2 (si aplica) instalados y verificados con `--version` | | | |
| PRE-07 | Verificar conectividad de red entre origen y destino | Prueba de ping, puertos abiertos (MySQL 3306, HTTP 80/443, SSH 22), latencia aceptable | | | |
| PRE-08 | Crear base de datos vacía en el entorno destino | `CREATE DATABASE stream_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;` ejecutado exitosamente | | | |
| PRE-09 | Elaborar plan de contingencia y rollback | Documento firmado con procedimiento de reversión paso a paso para cada componente (BD, archivos, configuración) | | | |
| PRE-10 | Notificar a los usuarios sobre la ventana de migración | Comunicado enviado con fecha, hora estimada de inicio, duración esperada y servicios que estarán no disponibles | | | |
| PRE-11 | Preparar entorno de pruebas en destino | Directorio del proyecto creado, dependencias instaladas con `npm install`, configuración base establecida | | | |

**Subtotal Pre-Migración:** Sí: ___ / No: ___ / N/A: ___

**¿Autorizado para continuar a la fase de respaldo?** Sí ___ No ___

**Firma del administrador:** _________________________

---

### 5.2 Fase de Respaldo de Datos

| ID | Actividad / Aspecto a Verificar | Criterio de Aceptación | Estado (Sí/No/N/A) | Responsable | Observaciones |
|----|-------------------------------|------------------------|--------------------|-------------|---------------|
| BKP-01 | Realizar backup completo de la base de datos MySQL | Ejecutar `mysqldump -u root stream_pro > stream_pro_backup_[YYYYMMDD].sql` sin errores; archivo generado con peso > 0 KB | | | |
| BKP-02 | Verificar la integridad del backup de BD | Intentar restaurar el backup en una BD temporal (`mysql -u root stream_pro_temp < stream_pro_backup.sql`) y verificar que las 8 tablas se crean sin errores | | | |
| BKP-03 | Realizar backup de archivos de configuración sensibles | Copiar archivos: `config/conexion.js`, `config/correo.js`, `config/mercadopago.js`, `config/link.js`. Verificar que contienen las credenciales correctas en el backup | | | |
| BKP-04 | Realizar backup de archivos multimedia | Copiar directorios `public/video/` y `public/portadas/`; verificar integridad de archivos MP4 e imágenes (no corruptos) | | | |
| BKP-05 | Realizar backup de archivos de código fuente | Copiar `app.js`, `rutas/`, `views/`, `public/css/`, `public/js/`, `package.json`, `package-lock.json` | | | |
| BKP-06 | Verificar suma de verificación (checksum) de los backups | Generar `sha256sum` o `md5sum` de cada archivo de backup y registrar en el acta | | | |
| BKP-07 | Almacenar los backups en ubicación segura externa | Backups copiados a: (1) disco externo, (2) almacenamiento en nube. Verificar que ambas copias son accesibles y legibles | | | |
| BKP-08 | Documentar la estructura de directorios respaldada | Listar el árbol de directorios completo del proyecto (`tree /F` en Windows o `find . -type f` en Linux) y adjuntar al acta | | | |
| BKP-09 | Verificar backup de la configuración de servicios externos | Confirmar que se respaldaron: access_token de MercadoPago, credenciales SMTP, secret de session, URL base | | | |
| BKP-10 | Registrar las credenciales de acceso en gestor de contraseñas seguro | Las credenciales de BD (usuario, contraseña, host, puerto) están almacenadas en un gestor de contraseñas (no en texto plano) | | | |

**Subtotal Respaldo:** Sí: ___ / No: ___ / N/A: ___

**¿Autorizado para continuar a la fase de ejecución?** Sí ___ No ___

**Firma del administrador:** _________________________

---

### 5.3 Fase de Ejecución de la Migración

| ID | Actividad / Aspecto a Verificar | Criterio de Aceptación | Estado (Sí/No/N/A) | Responsable | Observaciones |
|----|-------------------------------|------------------------|--------------------|-------------|---------------|
| MIG-01 | Detener el servicio de la aplicación en el entorno origen | Ejecutar `Ctrl + C` o `pm2 stop streampro`; verificar que `http://localhost:3000` ya no responde | | | |
| MIG-02 | Transferir los archivos del proyecto al entorno destino | Usar SCP, rsync o copia por red: verificar que todos los archivos se transfirieron sin errores (comparar count de archivos origen vs destino) | | | |
| MIG-03 | Restaurar la base de datos en el entorno destino | Ejecutar `mysql -u root -p stream_pro < stream_pro_backup.sql` sin errores; verificar que las 8 tablas existen con `SHOW TABLES;` | | | |
| MIG-04 | Verificar la integridad de los datos restaurados en BD | Ejecutar `SELECT COUNT(*)` en cada tabla y comparar con los registros del origen; verificar que los conteos coinciden | | | |
| MIG-05 | Restaurar archivos multimedia en el entorno destino | Copiar `public/video/` y `public/portadas/` a las rutas correspondientes; verificar pesos de archivos coinciden con origen | | | |
| MIG-06 | Configurar la conexión a base de datos en el entorno destino | Editar `config/conexion.js` con las credenciales del nuevo entorno; verificar conectividad con `node -e "require('./config/conexion')"` | | | |
| MIG-07 | Configurar servicios externos en el entorno destino | Editar `config/mercadopago.js`, `config/correo.js`, `config/link.js` según corresponda; verificar que no hay credenciales hardcodeadas del entorno origen | | | |
| MIG-08 | Instalar dependencias en el entorno destino | Ejecutar `npm install` sin errores; verificar que `node_modules/` se creó correctamente con `npm list --depth=0` | | | |
| MIG-09 | Configurar variables de entorno del sistema destino | Establecer NODE_ENV=production (si aplica); configurar PATH; verificar puertos disponibles (3000 para app, 3306 para MySQL) | | | |
| MIG-10 | Iniciar la aplicación en el entorno destino | Ejecutar `node app.js` y verificar que aparecen los mensajes "conexion exitosa" y "http://localhost:3000" | | | |
| MIG-11 | Configurar PM2 para gestión del proceso (si aplica) | Ejecutar `pm2 start app.js --name streampro`, `pm2 save`, `pm2 startup`; verificar que el proceso se reinicia automáticamente | | | |
| MIG-12 | Configurar proxy inverso y dominio (si aplica) | Nginx o Apache configurado para redirigir tráfico a `localhost:3000`; certificado SSL instalado y verificado | | | |

**Subtotal Ejecución:** Sí: ___ / No: ___ / N/A: ___

**¿Autorizado para continuar a la fase de post-migración?** Sí ___ No ___

**Firma del administrador:** _________________________

---

### 5.4 Fase de Post-Migración y Verificación

| ID | Actividad / Aspecto a Verificar | Criterio de Aceptación | Estado (Sí/No/N/A) | Responsable | Observaciones |
|----|-------------------------------|------------------------|--------------------|-------------|---------------|
| POST-01 | Verificar acceso a la página principal | Navegar a `http://localhost:3000` (o dominio configurado); la Landing Page de StreamPro carga completamente sin errores 404/500 en consola | | | |
| POST-02 | Verificar funcionalidad de inicio de sesión | Probar login de usuario y administrador; ambos redirigen correctamente a `/home` sin errores | | | |
| POST-03 | Verificar funcionalidad de registro de usuarios | Crear un nuevo usuario; verificar que se inserta en la tabla `usuarios` en BD y se redirige correctamente | | | |
| POST-04 | Verificar carga del dashboard y catálogo | El dashboard muestra películas y series organizadas por categorías; las imágenes de portada se cargan correctamente | | | |
| POST-05 | Verificar reproducción de video | Seleccionar una película y un capítulo de serie; ambos inician reproducción sin errores, el audio y video son correctos | | | |
| POST-06 | Verificar funcionalidad de búsqueda | Ejecutar búsqueda por título de película; los resultados se filtran correctamente y son precisos | | | |
| POST-07 | Verificar CRUD de películas | Crear, leer, actualizar y eliminar una película de prueba; todas las operaciones se reflejan en BD sin errores | | | |
| POST-08 | Verificar CRUD de series | Crear, leer, actualizar y eliminar una serie de prueba; verificar que al eliminar una serie se eliminan en cascada temporadas y capítulos | | | |
| POST-09 | Verificar CRUD de temporadas y capítulos | Crear temporada y capítulo asociados a una serie; verificar relaciones FK en BD | | | |
| POST-10 | Verificar integración con MercadoPago | Crear preferencia de pago; verificar redirección a la pasarela de pagos; probar webhook de notificación | | | |
| POST-11 | Verificar envío de correos de recuperación | Solicitar recuperación de contraseña; verificar que el token de 8 dígitos llega al correo registrado; probar verificación de token y cambio de contraseña | | | |
| POST-12 | Verificar manejo de sesiones | Iniciar sesión y navegar por 5 páginas distintas; la sesión se mantiene activa; cerrar sesión y verificar que no se puede acceder a `/home` | | | |
| POST-13 | Verificar rutas de archivos estáticos | CSS, JS e imágenes del directorio `public/` se cargan correctamente (verificar pestaña Network en navegador) | | | |
| POST-14 | Verificar logs del servidor | Revisar la consola de Node.js en busca de errores, warnings o excepciones no capturadas durante las pruebas | | | |
| POST-15 | Verificar rendimiento básico | Tiempo de carga de página principal < 3 segundos; tiempo de respuesta de API < 500 ms; uso de CPU < 70% durante reproducción de video | | | |
| POST-16 | Verificar conectividad con servicios externos | MercadoPago responde (código 200), servidor SMTP responde, las APIs externas están accesibles | | | |
| POST-17 | Verificar plan de rollback | Simular el procedimiento de rollback documentado en PRE-09; confirmar que el sistema puede restaurarse al estado original en menos del tiempo estipulado | | | |
| POST-18 | Monitorear el sistema durante 24 horas post-migración | Revisar logs cada 4 horas; no deben aparecer errores críticos; documentar cualquier anomalía | | | |

**Subtotal Post-Migración:** Sí: ___ / No: ___ / N/A: ___

**¿Migración completada exitosamente?** Sí ___ No ___

**Firma del administrador:** _________________________

---

### Resumen de la Lista de Chequeo 1

| Fase | Total ítems | Sí | No | N/A | % Cumplimiento |
|------|-------------|:--:|:--:|:---:|:--------------:|
| PRE — Pre-Migración | 11 | | | | |
| BKP — Respaldo de Datos | 10 | | | | |
| MIG — Ejecución de Migración | 12 | | | | |
| POST — Post-Migración | 18 | | | | |
| **Total general** | **51** | | | | |

**% Cumplimiento General:** ___ %

**Observaciones finales:**

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

---

## LISTA DE CHEQUEO 2: REVISIÓN DE MODIFICACIONES Y ADAPTACIONES

**Propósito:** Verificar y documentar todas las modificaciones y adaptaciones realizadas durante el proceso de migración de StreamPro, asegurando que los cambios en el código, la configuración, la base de datos y la infraestructura sean correctos, seguros y estén debidamente documentados.

**Instrucciones:** Esta lista debe diligenciarse al finalizar la migración, antes del cierre formal del proceso. Cada ítem debe ser verificado por el desarrollador y aprobado por el administrador del sistema.

### Datos Generales de la Revisión

| Campo | Valor |
|-------|-------|
| **Fecha de revisión** | |
| **Migración asociada** | E1 / E2 / E3 / E4 / E5 |
| **Revisor (desarrollador)** | |
| **Aprueba (administrador)** | |
| **Número de acta / ticket** | |

---

### 6.1 Análisis de Cambios Realizados

| ID | Aspecto a Revisar | Criterio de Aceptación | Estado (Sí/No/N/A) | Responsable | Observaciones |
|----|-------------------|------------------------|--------------------|-------------|---------------|
| CAM-01 | Los archivos de configuración fueron modificados según el nuevo entorno | `conexion.js`, `correo.js`, `mercadopago.js`, `link.js` actualizados con los valores correctos del entorno destino | | | |
| CAM-02 | No quedaron credenciales del entorno origen en los archivos de configuración | Verificar string de conexión, access_token, SMTP user/pass — no contienen valores del entorno anterior | | | |
| CAM-03 | Las rutas de archivos estáticos y multimedia fueron actualizadas | Verificar que `ruta_pel`, `ruta_cap`, `ruta_img_pel`, `ruta_img_ser` en BD apuntan a las rutas correctas del nuevo entorno | | | |
| CAM-04 | Las rutas de las vistas EJS no requirieron modificación | Verificar que los enlaces a CSS, JS e imágenes en las plantillas `.ejs` funcionan en el nuevo entorno | | | |
| CAM-05 | El archivo `package.json` no fue modificado innecesariamente | Si se modificó, justificar el cambio (ej: nuevas dependencias requeridas por el entorno destino) | | | |
| CAM-06 | Las rutas de los controladores (archivos en `rutas/`) no presentan cambios no planificados | Comparar con la versión respaldada; documentar cualquier diferencia | | | |
| CAM-07 | Los archivos de la base de datos (`database/stream_pro_schema.sql`) reflejan la estructura actual | El script SQL en el proyecto coincide con la estructura de tablas en la BD del entorno destino | | | |
| CAM-08 | Los cambios realizados están registrados en el sistema de control de versiones | Git: commits creados con mensajes descriptivos; rama creada según convención (`migrate/*`); cambios commiteados antes de la migración | | | |
| CAM-09 | Se validó que no hay archivos temporales o de prueba en el entorno destino | Verificar ausencia de archivos `.log`, `.tmp`, `node_modules` obsoletos, archivos de prueba no relevantes | | | |
| CAM-10 | Las dependencias fueron actualizadas a versiones compatibles con el nuevo entorno | `npm outdated` ejecutado; dependencias actualizadas con `npm update` según necesidad; cambios registrados en `package.json` | | | |

**Subtotal Análisis de Cambios:** Sí: ___ / No: ___ / N/A: ___

**Firma del desarrollador:** _________________________

---

### 6.2 Documentación Asociada

| ID | Aspecto a Revisar | Criterio de Aceptación | Estado (Sí/No/N/A) | Responsable | Observaciones |
|----|-------------------|------------------------|--------------------|-------------|---------------|
| DOC-01 | La documentación de conexión a BD fue actualizada | Archivo `config/conexion.js` documentado con comentarios sobre los parámetros del nuevo entorno | | | |
| DOC-02 | El diagrama de arquitectura refleja el nuevo entorno | Si la migración cambió la topología (ej: se agregó Nginx, CDN, balanceador), el diagrama fue actualizado | | | |
| DOC-03 | Las credenciales de servicios externos están documentadas de forma segura | Las credenciales están en un gestor de contraseñas (no en el código ni en documentos compartidos sin protección) | | | |
| DOC-04 | Se actualizó el manual de instalación/despliegue | El procedimiento de instalación en el nuevo entorno fue documentado con los pasos específicos ejecutados | | | |
| DOC-05 | Se documentaron los cambios en variables de entorno | Lista completa de variables de entorno requeridas, sus valores y descripción de cada una | | | |
| DOC-06 | Se actualizó la matriz de dependencias y versiones | Tabla con tecnologías, versiones instaladas en el nuevo entorno y fecha de actualización | | | |
| DOC-07 | Se documentaron los procedimientos de backup y restauración para el nuevo entorno | Comandos y scripts de backup/restore actualizados según las herramientas disponibles en el destino | | | |
| DOC-08 | El plan de rollback fue actualizado según el nuevo entorno | Los pasos de reversión reflejan la configuración actual del sistema migrado | | | |

**Subtotal Documentación:** Sí: ___ / No: ___ / N/A: ___

**Firma del desarrollador:** _________________________

---

### 6.3 Pruebas y Validación

| ID | Aspecto a Revisar | Criterio de Aceptación | Estado (Sí/No/N/A) | Responsable | Observaciones |
|----|-------------------|------------------------|--------------------|-------------|---------------|
| PRU-01 | Prueba de funcionamiento: Página principal (Landing Page) | Carga completa sin errores en consola; todas las secciones visibles (hero, características, FAQ, footer) | | | |
| PRU-02 | Prueba de funcionamiento: Autenticación | Login usuario exitoso → redirección a `/home`; login admin exitoso → `/home` con panel admin; login fallido → mensaje de error | | | |
| PRU-03 | Prueba de funcionamiento: Registro de usuario | Registro con datos válidos → inserción en BD; registro con correo duplicado → mensaje de error; registro con campos vacíos → validación | | | |
| PRU-04 | Prueba de funcionamiento: Dashboard y catálogo | Películas y series visibles por categoría; imágenes de portada cargan; texto descriptivo visible | | | |
| PRU-05 | Prueba de funcionamiento: Reproducción de video | Video MP4 se reproduce; controles de reproducción funcionan (play, pause, volumen, pantalla completa) | | | |
| PRU-06 | Prueba de funcionamiento: CRUD películas | Crear, editar y eliminar una película; cambios se reflejan en BD inmediatamente | | | |
| PRU-07 | Prueba de funcionamiento: CRUD series con cascada | Crear serie → temporada → capítulo; eliminar serie → verificar que temporada y capítulo se eliminan en cascada | | | |
| PRU-08 | Prueba de funcionamiento: Suscripción MercadoPago | Crear preferencia de pago; redirección a MercadoPago; webhook procesa notificación; estado se actualiza en `suscripciones` | | | |
| PRU-09 | Prueba de funcionamiento: Recuperación de contraseña | Token de 8 dígitos generado; correo enviado vía SMTP; token verificado; contraseña actualizada en BD | | | |
| PRU-10 | Prueba de funcionamiento: Sesiones | Sesión persiste durante navegación; timeout funciona; cierre de sesión destruye la sesión correctamente | | | |
| PRU-11 | Prueba de integración: Conexión BD | Consultas SELECT, INSERT, UPDATE, DELETE funcionan en las 8 tablas sin errores MySQL | | | |
| PRU-12 | Prueba de integración: API REST | Endpoints GET, POST, PUT, DELETE responden con códigos HTTP correctos (200, 201, 404, 500) | | | |
| PRU-13 | Prueba de regresión: Funcionalidades pre-existentes | Las funcionalidades que no fueron modificadas directamente funcionan igual que antes de la migración | | | |
| PRU-14 | Prueba de seguridad: Exposición de información sensible | Verificar que no se muestran stack traces, credenciales o rutas internas en respuestas de error | | | |
| PRU-15 | Prueba de rendimiento: Tiempos de respuesta | Página principal < 3s; API < 500ms; reproducción de video sin buffering excesivo | | | |

**Subtotal Pruebas:** Sí: ___ / No: ___ / N/A: ___

**Firma del desarrollador:** _________________________

---

### 6.4 Cumplimiento Normativo y Seguridad

| ID | Aspecto a Revisar | Criterio de Aceptación | Estado (Sí/No/N/A) | Responsable | Observaciones |
|----|-------------------|------------------------|--------------------|-------------|---------------|
| SEG-01 | Las contraseñas de usuarios están encriptadas con bcrypt | Verificar que el campo `passw_user` en tabla `usuarios` contiene hash de bcrypt (inicia con `$2b$` o `$2a$`) | | | |
| SEG-02 | La conexión a la base de datos usa credenciales seguras | La contraseña de MySQL no está vacía (en producción); se cambió la contraseña por defecto de root | | | |
| SEG-03 | Las claves de API de MercadoPago están protegidas | No están expuestas en el frontend; se usan variables de entorno o archivos de configuración fuera del repositorio público | | | |
| SEG-04 | Las sesiones tienen configuración segura | `express-session` configurado con `httpOnly: true`, `secure: true` (HTTPS), `sameSite: 'strict'`; secret actualizado | | | |
| SEG-05 | Los archivos de configuración con credenciales no están en el repositorio público | Verificar que `.gitignore` excluye `config/conexion.js`, `config/mercadopago.js`, `config/correo.js` o archivos `.env` | | | |
| SEG-06 | El servidor no expone información de versión en headers HTTP | Verificar con curl que headers `X-Powered-By` no revelan versiones de Express o Node.js | | | |
| SEG-07 | Se ejecutó auditoría de dependencias | `npm audit` reporta 0 vulnerabilidades críticas o altas; las vulnerabilidades medias/bajas están documentadas con plan de mitigación | | | |
| SEG-08 | Los archivos de respaldo están cifrados o protegidos | Los backups almacenados en nube o disco externo están cifrados con AES-256 o protegidos por contraseña | | | |
| SEG-09 | Se verificaron los permisos de archivos en el entorno destino | Archivos de configuración con permisos restringidos (0600 en Linux); directorio `public/` con permisos de lectura (0755) | | | |
| SEG-10 | Cumplimiento con la política de protección de datos | Los datos personales de usuarios (correo, nombre, teléfono) están protegidos; no se almacenan datos sensibles no necesarios | | | |

**Subtotal Seguridad:** Sí: ___ / No: ___ / N/A: ___

**Firma del administrador:** _________________________

---

### Resumen de la Lista de Chequeo 2

| Sección | Total ítems | Sí | No | N/A | % Cumplimiento |
|---------|-------------|:--:|:--:|:---:|:--------------:|
| CAM — Análisis de Cambios | 10 | | | | |
| DOC — Documentación Asociada | 8 | | | | |
| PRU — Pruebas y Validación | 15 | | | | |
| SEG — Cumplimiento y Seguridad | 10 | | | | |
| **Total general** | **43** | | | | |

**% Cumplimiento General:** ___ %

### Resultado de la Revisión

| Resultado | Condición |
|-----------|-----------|
| **APROBADO** | Todos los ítems marcados Sí o N/A; no hay ítems No sin plan de acción |
| **APROBADO CON OBSERVACIONES** | Máximo 3 ítems No con plan de acción documentado y fechado |
| **RECHAZADO** | Más de 3 ítems No; o al menos un ítem de seguridad marcado No |

**Resultado final:** [APROBADO] / [APROBADO CON OBSERVACIONES] / [RECHAZADO]

**Observaciones y plan de acción para ítems No:**

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

| Firma del Desarrollador | Firma del Administrador | Fecha |
|:-----------------------:|:-----------------------:|:-----:|
| | | |

---

## CONCLUSIONES

1. Las listas de chequeo presentadas en este documento constituyen un instrumento sistemático y trazable para gestionar el proceso de migración de StreamPro, cubriendo desde la planificación inicial (PRE), pasando por el respaldo de datos (BKP), la ejecución de la migración (MIG), hasta la verificación post-migración (POST), totalizando 51 ítems de verificación distribuidos en 4 fases.

2. La Lista de Chequeo 2 (Revisión de Modificaciones) complementa a la primera al enfocarse en la calidad y seguridad de las adaptaciones realizadas, evaluando 43 aspectos distribuidos en análisis de cambios, documentación, pruebas funcionales y cumplimiento normativo, incluyendo verificación de seguridad como encriptación de contraseñas, protección de credenciales y auditoría de dependencias.

3. Ambas listas están diseñadas específicamente para el contexto tecnológico de StreamPro, considerando su stack Node.js + Express + MySQL, sus 8 tablas de base de datos, sus integraciones con MercadoPago y Gmail SMTP, y los escenarios de migración más probables (local a VPS, almacenamiento a CDN, cambios de versión).

4. El formato de verificación con estados (Sí/No/N/A), responsables asignados y campo de observaciones permite mantener trazabilidad completa de cada actividad, facilitando auditorías posteriores y la identificación de áreas de mejora en futuros procesos de migración.

5. La inclusión de criterios de aceptación medibles para cada ítem elimina la subjetividad en la evaluación, permitiendo que diferentes evaluadores obtengan resultados consistentes al aplicar las listas de chequeo.

6. Los procedimientos de contingencia y rollback considerados en la fase de pre-migración (PRE-09, POST-17) garantizan que, ante cualquier eventualidad durante el proceso, el sistema puede ser restaurado a su estado original, minimizando el riesgo de pérdida de datos o interrupción prolongada del servicio.

---

## REFERENCIAS BIBLIOGRÁFICAS

1. **ISO/IEC/IEEE 14764:2022.** (2022). *Ingeniería de software — Procesos del ciclo de vida del software — Mantenimiento* (3.ª ed.). Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/80710.html

2. **ISO/IEC/IEEE 12207:2017.** (2017). *Ingeniería de sistemas y software — Procesos del ciclo de vida del software*. Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/63712.html

3. **ISO 25000:2014.** (2014). *Ingeniería de software — Requisitos y evaluación de la calidad del producto de software (SQuaRE) — Guía para SQuaRE*. Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/64764.html

4. **PMI — Project Management Institute.** (2021). *Guía de los Fundamentos para la Dirección de Proyectos (PMBOK Guide)* (7.ª ed.). Project Management Institute, Inc.

5. **Pressman, R. S.** (2010). *Ingeniería del software: Un enfoque práctico* (7.ª ed.). McGraw-Hill Education.

6. **Node.js Foundation.** (2026). *Guía de migración de Node.js*. Recuperado de https://nodejs.org/es/docs/guides/migration/

7. **MySQL, Oracle Corporation.** (2026). *Manual de referencia de MySQL 8.4 — Migración*. Recuperado de https://dev.mysql.com/doc/refman/8.4/en/migration.html

8. **Amazon Web Services.** (2026). *Guía de migración a la nube para aplicaciones Node.js*. Recuperado de https://aws.amazon.com/es/cloud-migration/

9. **Mercado Pago Developers.** (2026). *Documentación para desarrolladores — Integración de pagos*. Recuperado de https://www.mercadopago.com.co/developers

10. **NIST — National Institute of Standards and Technology.** (2024). *NIST Special Publication 800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations*. U.S. Department of Commerce.

11. **OWASP Foundation.** (2026). *OWASP Cheat Sheet Series — Data Protection*. Recuperado de https://cheatsheetseries.owasp.org/

12. **SENA — Servicio Nacional de Aprendizaje.** (2026). *Material de formación: Análisis y Desarrollo de Software — Mantenimiento de Software. Programa de formación: Tecnólogo en Análisis y Desarrollo de Software*. Centro de Gestión de Mercados, Logística y Tecnologías de la Información, Regional Distrito Capital, Bogotá, Colombia.

13. **Google Cloud.** (2026). *Migration to Google Cloud: Transfer Appliance and Storage Transfer Service*. Recuperado de https://cloud.google.com/transfer/

14. **Express.js.** (2026). *Express — Mejores prácticas de seguridad en producción*. Recuperado de https://expressjs.com/en/advanced/best-practice-security.html

15. **DigitalOcean.** (2026). *How to Migrate a Node.js Application from Windows to Ubuntu*. Recuperado de https://www.digitalocean.com/community/tutorials

---

*Documento elaborado como evidencia de aprendizaje para el componente formativo de Mantenimiento y Soporte de Software.*

*Instrumento: Listas de chequeo para proceso de migración de software y revisión de modificaciones.*

*SENA — Servicio Nacional de Aprendizaje, Colombia — 2026*
