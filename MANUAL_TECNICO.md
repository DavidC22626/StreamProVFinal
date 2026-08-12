# MANUAL TÉCNICO Y DE OPERACIÓN — STREAMPRO

## Plataforma de Streaming de Contenido Audiovisual

---

&nbsp;

**Evidencia:** GA10-220501097-AA10-EV01 — Elaborar documentos técnicos y de usuario del software

**Programa:** Análisis y Desarrollo de Software

**Centro de Formación:** Centro de Gestión de Mercados, Logística y Tecnologías de la Información

**Regional:** Distrito Capital

**SENA — Servicio Nacional de Aprendizaje**

**Aprendiz:** David Camilo Caicedo

**Ficha:** 3070420

**Proyecto:** StreamPro — Plataforma de Streaming

**Versión:** 1.0.0

**Año:** 2026

&nbsp;

&nbsp;

---

## TABLA DE CONTENIDO

1. [Introducción](#1-introducción)
2. [Objetivos del Sistema](#2-objetivos-del-sistema)
3. [Diseño Técnico del Sistema de Información](#3-diseño-técnico-del-sistema-de-información)
    - 3.1 [Esquema o Modelo de Requerimientos](#31-esquema-o-modelo-de-requerimientos)
    - 3.2 [Software Base del Sistema y Prerrequisitos](#32-software-base-del-sistema-y-prerrequisitos)
    - 3.3 [Componentes y Estándares](#33-componentes-y-estándares)
    - 3.4 [Modelo de Datos](#34-modelo-de-datos)
    - 3.5 [Funcionalidad y Servicios Ofrecidos](#35-funcionalidad-y-servicios-ofrecidos)
4. [Despliegue y Configuración de Componentes](#4-despliegue-y-configuración-de-componentes)
    - 4.1 [Organización de Componentes](#41-organización-de-componentes)
    - 4.2 [Instalación](#42-instalación)
    - 4.3 [Configuración](#43-configuración)
    - 4.4 [Despliegue en Producción](#44-despliegue-en-producción)
5. [Resolución de Problemas](#5-resolución-de-problemas)
6. [Referencias Bibliográficas](#6-referencias-bibliográficas)

---

## 1. INTRODUCCIÓN

StreamPro es una aplicación web de tipo plataforma de streaming de contenido audiovisual (películas y series), desarrollada como proyecto formativo del programa Análisis y Desarrollo de Software del SENA. La plataforma está inspirada en servicios como Netflix y está diseñada para atender aproximadamente 250 usuarios activos no concurrentes.

La aplicación está construida sobre un stack tecnológico moderno basado en JavaScript, utilizando **Node.js** como entorno de ejecución del lado del servidor, **Express 5** como framework web, **EJS** como motor de plantillas para renderizado del lado del servidor y **MySQL 8** como sistema gestor de base de datos relacional.

### Arquitectura General

StreamPro sigue una arquitectura monolítica de tipo MVC (Modelo-Vista-Controlador) donde el servidor de aplicaciones y el servidor de base de datos pueden coexistir en la misma máquina. El cliente navegador se comunica con el servidor Express a través de HTTP/HTTPS, y el servidor a su vez se conecta a MySQL para la persistencia de datos y a servicios externos como MercadoPago (pasarela de pagos) y Gmail SMTP (envío de correos).

### Módulos del Sistema

| Módulo | Descripción |
|--------|-------------|
| **Landing Page** | Página de aterrizaje con presentación del servicio, características, planes y FAQ |
| **Autenticación** | Registro e inicio de sesión de usuarios y administradores con encriptación bcrypt |
| **Dashboard** | Interfaz tipo Netflix con catálogo organizado por categorías (Tendencias, Top 10, Acción, Comedia, Documentales) |
| **Reproductor de Video** | Reproducción de películas y episodios en el navegador mediante HTML5 Video |
| **CRUD de Contenido** | Panel de administración para gestionar películas, series, temporadas y capítulos |
| **Suscripciones** | Integración con MercadoPago para planes premium a COP 13.000/mes |
| **Recuperación de Contraseña** | Sistema de tokens de 8 dígitos enviados por correo electrónico |

---

## 2. OBJETIVOS DEL SISTEMA

### 2.1 Objetivo General

Desarrollar e implementar una plataforma web de streaming de contenido audiovisual que permita a los usuarios acceder a un catálogo de películas y series, gestionar sus suscripciones y administrar el contenido multimedia, garantizando seguridad, rendimiento y escalabilidad para hasta 250 usuarios activos.

### 2.2 Objetivos Específicos

1. Implementar un sistema de autenticación seguro con encriptación de contraseñas mediante bcrypt y manejo de sesiones con express-session.

2. Proporcionar un panel de administración con operaciones CRUD completas para la gestión de películas, series, temporadas y capítulos.

3. Integrar una pasarela de pagos (MercadoPago) para la gestión de suscripciones premium con plan mensual.

4. Implementar un sistema de recuperación de contraseñas mediante tokens de verificación enviados por correo electrónico.

5. Diseñar una interfaz de usuario intuitiva y responsive similar a plataformas de streaming comerciales.

6. Garantizar la disponibilidad del servicio mediante un plan de mantenimiento basado en la norma ISO/IEC/IEEE 14764:2022.

---

## 3. DISEÑO TÉCNICO DEL SISTEMA DE INFORMACIÓN

### 3.1 Esquema o Modelo de Requerimientos

#### 3.1.1 Reglas de Negocio

| ID | Regla de Negocio | Descripción |
|----|------------------|-------------|
| RN-01 | Suscripción premium | Solo los usuarios con suscripción activa pueden reproducir contenido multimedia |
| RN-02 | Encriptación de contraseñas | Todas las contraseñas deben almacenarse utilizando hash bcrypt con salt |
| RN-03 | Sesiones de usuario | La sesión del usuario expira después de 30 minutos de inactividad |
| RN-04 | Eliminación en cascada | Al eliminar una serie, se eliminan todas sus temporadas y capítulos asociados |
| RN-05 | Token de recuperación | Los tokens de recuperación de contraseña expiran después de 15 minutos |
| RN-06 | Roles diferenciados | Los administradores tienen acceso al panel de gestión CRUD; los usuarios solo al catálogo |

#### 3.1.2 Actores del Sistema

| Actor | Descripción | Casos de Uso Principales |
|-------|-------------|--------------------------|
| **Usuario** | Persona registrada en la plataforma | Registrarse, iniciar sesión, ver catálogo, reproducir video, suscribirse, recuperar contraseña |
| **Administrador** | Persona con permisos de gestión de contenido | Todos los del usuario + CRUD de películas, series, temporadas, capítulos |
| **Sistema** | Procesos automáticos de la plataforma | Enviar correos, procesar webhooks, gestionar sesiones, expirar tokens |

#### 3.1.3 Diagrama de Casos de Uso

```
-------------------------------------------------------------------
|                                                                  |
|                     [DIAGRAMA DE CASOS DE USO]                   |
|                                                                  |
|  Instrucción: Incluir aquí el diagrama de casos de uso del       |
|  sistema StreamPro mostrando los actores (Usuario, Administrador, |
|  Sistema) y sus interacciones con los casos de uso:              |
|  - Registrar usuario                                             |
|  - Iniciar sesión                                                |
|  - Ver catálogo                                                  |
|  - Reproducir video                                              |
|  - Gestionar películas (CRUD) — Admin                           |
|  - Gestionar series (CRUD) — Admin                              |
|  - Gestionar temporadas (CRUD) — Admin                          |
|  - Gestionar capítulos (CRUD) — Admin                           |
|  - Suscribirse al plan premium                                   |
|  - Recuperar contraseña                                          |
|  - Procesar pago (Sistema)                                       |
|  - Enviar correo (Sistema)                                       |
|                                                                  |
-------------------------------------------------------------------
```

#### 3.1.4 Atributos de Calidad

| Atributo | Descripción | Métrica |
|----------|-------------|---------|
| Disponibilidad | El sistema debe estar disponible el 99.5% del tiempo | Tiempo de inactividad ≤ 4h mensuales |
| Rendimiento | Tiempo de carga de página principal < 3 segundos | Medición con F12 → Network |
| Seguridad | Contraseñas encriptadas con bcrypt, sesiones seguras | `npm audit` sin vulnerabilidades críticas |
| Escalabilidad | Capacidad para 250 usuarios activos no concurrentes | Pruebas de carga con 10 usuarios simultáneos |
| Mantenibilidad | Código documentado y versionado con Git | Cobertura de pruebas de regresión ≥ 95% |

---

### 3.2 Software Base del Sistema y Prerrequisitos

#### 3.2.1 Requerimientos de Hardware

| Componente | Mínimo | Recomendado | Óptimo |
|------------|--------|-------------|--------|
| **CPU** | 2 núcleos, 2.0 GHz | 4 núcleos, 2.5 GHz+ | 6+ núcleos, 3.0 GHz+ |
| **RAM** | 4 GB DDR4 | 8 GB DDR4 | 16 GB DDR4+ |
| **Almacenamiento** | 20 GB SSD | 100 GB SSD | 500 GB - 1 TB NVMe |
| **Red** | 50 Mbps simétricos | 100 Mbps - 1 Gbps | 1 Gbps+ con CDN |

#### 3.2.2 Requerimientos de Software

| Software | Versión Requerida | Propósito |
|----------|------------------|-----------|
| **Sistema Operativo (Desarrollo)** | Windows 10/11 64-bit | Entorno de desarrollo local |
| **Sistema Operativo (Producción)** | Ubuntu Server 24.04 LTS 64-bit | Servidor de producción |
| **Node.js** | 22.x | Entorno de ejecución JavaScript |
| **npm** | 10.x o superior | Gestor de paquetes |
| **MySQL** | 8.x | Sistema gestor de base de datos |
| **XAMPP** | 8.1 o superior | Paquete Apache + MySQL + phpMyAdmin (solo desarrollo local) |

#### 3.2.3 Navegadores Compatibles

| Navegador | Versión Mínima |
|-----------|----------------|
| Google Chrome | 120+ |
| Mozilla Firefox | 115+ |
| Microsoft Edge | 120+ |
| Safari | 17+ |

#### 3.2.4 Lenguajes de Programación

| Lenguaje | Versión | Uso |
|----------|---------|-----|
| JavaScript (Node.js) | ECMAScript 2023 | Backend (rutas, controladores, configuración) |
| JavaScript (Cliente) | ECMAScript 2023 | Frontend (interactividad en vistas EJS) |
| SQL | MySQL 8.x | Consultas a la base de datos |
| HTML5 | W3C HTML5 | Estructura de vistas EJS |
| CSS3 | W3C CSS3 | Estilos y diseño responsive |

---

### 3.3 Componentes y Estándares

#### 3.3.1 Frameworks, Librerías y Dependencias

| Componente | Tecnología | Versión | Propósito |
|------------|-----------|---------|-----------|
| **Runtime** | Node.js | 22.x | Entorno de ejecución del servidor |
| **Framework Web** | Express | 5.1.0 | Manejo de rutas, middleware y servidor HTTP |
| **Motor de Plantillas** | EJS | 3.1.10 | Renderizado de vistas HTML dinámicas |
| **Driver MySQL** | mysql2 | 3.15.3 | Conexión y consultas a base de datos MySQL |
| **Encriptación** | bcrypt | 6.0.0 | Hash de contraseñas con salt |
| **Sesiones** | express-session | 1.18.2 | Manejo de sesiones de usuario |
| **Pasarela de Pagos** | mercadopago | 2.12.0 | SDK de integración con MercadoPago |
| **Correo Electrónico** | nodemailer | 8.0.5 | Envío de correos vía SMTP (Gmail) |
| **UUID** | uuid | 13.0.0 | Generación de identificadores únicos |
| **CORS** | cors | 2.8.5 | Middleware para peticiones entre dominios |

#### 3.3.2 Estándares de Codificación y Patrones de Diseño

| Estándar/Patrón | Descripción |
|-----------------|-------------|
| **MVC (Modelo-Vista-Controlador)** | Separación en capas: rutas (controladores), vistas (EJS), configuración/modelos |
| **REST API** | Endpoints HTTP con métodos GET, POST, PUT, DELETE para operaciones CRUD |
| **Convención de nomenclatura** | CamelCase para variables y funciones, snake_case para columnas en BD |
| **Versionado Semántico** | MAJOR.MINOR.PATCH para control de versiones |
| **Git Flow simplificado** | Ramas: main, develop, fix/*, feature/* |

#### 3.3.3 Puertos de Comunicación

| Puerto | Protocolo | Servicio | Uso |
|--------|-----------|---------|-----|
| 3000 | HTTP | Aplicación StreamPro | Servidor web de la aplicación |
| 3306 | TCP | MySQL | Conexión a base de datos |
| 587 | TCP | SMTP | Envío de correos (Nodemailer) |
| 80 | HTTP | Nginx (producción) | Proxy inverso HTTP |
| 443 | HTTPS | Nginx + SSL (producción) | Proxy inverso HTTPS |
| 22 | TCP | SSH | Acceso remoto al servidor |

#### 3.3.4 Protocolos de Seguridad

| Protocolo/Mecanismo | Aplicación |
|---------------------|------------|
| **HTTPS / TLS 1.3** | Comunicación cifrada entre cliente y servidor (producción) |
| **bcrypt** | Hash de contraseñas con factor de costo 10+ |
| **express-session** | Cookies HTTP-only, Secure (en HTTPS), SameSite |
| **UUID v4** | Identificadores únicos no predecibles para tokens |
| **CORS** | Restricción de orígenes cruzados |

---

### 3.4 Modelo de Datos

#### 3.4.1 Diagrama Entidad-Relación

```
-------------------------------------------------------------------
|                                                                  |
|                  [DIAGRAMA ENTIDAD-RELACIÓN]                     |
|                                                                  |
|  Instrucción: Incluir aquí el diagrama entidad-relación de la    |
|  base de datos stream_pro con las 8 tablas y sus relaciones:     |
|                                                                  |
|  administradores (independiente)                                 |
|  usuarios 1───* suscripciones                                    |
|  series 1───* temporadas 1───* capitulos                         |
|  peliculas (independiente)                                       |
|  tokens_recuperacion (independiente)                             |
|                                                                  |
|  Relaciones:                                                     |
|  - suscripciones.cod_user → usuarios.cod_user                    |
|  - temporadas.cod_serie_tem → series.cod_serie (ON DELETE CASCADE)|
|  - capitulos.cod_tem_cap → temporadas.cod_tem (ON DELETE CASCADE)|
|                                                                  |
-------------------------------------------------------------------
```

#### 3.4.2 Diccionario de Datos

##### Tabla: `administradores`

| Columna | Tipo | Longitud | PK | FK | Nulo | Descripción |
|---------|------|----------|----|----|------|-------------|
| cod_adm | INT | - | Sí | No | No | Código único del administrador (autoincremental) |
| nombre_adm | VARCHAR | 100 | No | No | No | Nombre completo del administrador |
| correo_adm | VARCHAR | 100 | No | No | No | Correo electrónico del administrador (único) |
| passw_adm | VARCHAR | 255 | No | No | No | Contraseña encriptada con bcrypt |

##### Tabla: `usuarios`

| Columna | Tipo | Longitud | PK | FK | Nulo | Descripción |
|---------|------|----------|----|----|------|-------------|
| cod_user | INT | - | Sí | No | No | Código único del usuario (autoincremental) |
| nombre_user | VARCHAR | 100 | No | No | No | Nombre completo del usuario |
| nacionalidad_user | VARCHAR | 50 | No | No | Sí | Nacionalidad del usuario |
| telefono_user | VARCHAR | 10 | No | No | Sí | Número de teléfono (10 dígitos) |
| correo_user | VARCHAR | 100 | No | No | No | Correo electrónico del usuario (único) |
| passw_user | VARCHAR | 255 | No | No | No | Contraseña encriptada con bcrypt |
| fecha_regis_user | DATETIME | - | No | No | Sí | Fecha y hora de registro del usuario |
| cod_scrip_user | INT | - | No | Sí | Sí | FK a cod_scrip de suscripciones |

##### Tabla: `peliculas`

| Columna | Tipo | Longitud | PK | FK | Nulo | Descripción |
|---------|------|----------|----|----|------|-------------|
| cod_pel | INT | - | Sí | No | No | Código único de la película (autoincremental) |
| titulo_pel | VARCHAR | 200 | No | No | No | Título de la película |
| descrip_pel | TEXT | - | No | No | Sí | Descripción o sinopsis de la película |
| duracion_pel | INT | - | No | No | Sí | Duración en minutos |
| clasifi_pel | VARCHAR | 20 | No | No | Sí | Clasificación (ATP, +13, +16, +18) |
| year_lanza_pel | INT | - | No | No | Sí | Año de lanzamiento |
| director_pel | VARCHAR | 100 | No | No | Sí | Nombre del director |
| ruta_pel | VARCHAR | 255 | No | No | Sí | Ruta del archivo de video MP4 |
| ruta_img_pel | VARCHAR | 255 | No | No | Sí | Ruta de la imagen de portada |

##### Tabla: `series`

| Columna | Tipo | Longitud | PK | FK | Nulo | Descripción |
|---------|------|----------|----|----|------|-------------|
| cod_serie | INT | - | Sí | No | No | Código único de la serie (autoincremental) |
| titulo_serie | VARCHAR | 200 | No | No | No | Título de la serie |
| clasifi_serie | VARCHAR | 20 | No | No | Sí | Clasificación (ATP, +13, +16, +18) |
| year_lanza_serie | INT | - | No | No | Sí | Año de lanzamiento |
| creador_serie | VARCHAR | 100 | No | No | Sí | Creador o showrunner de la serie |
| ruta_img_ser | VARCHAR | 255 | No | No | Sí | Ruta de la imagen de portada |
| descrip_serie | TEXT | - | No | No | Sí | Descripción o sinopsis de la serie |

##### Tabla: `temporadas`

| Columna | Tipo | Longitud | PK | FK | Nulo | Descripción |
|---------|------|----------|----|----|------|-------------|
| cod_tem | INT | - | Sí | No | No | Código único de la temporada (autoincremental) |
| cod_serie_tem | INT | - | No | Sí | No | FK a cod_serie de series (ON DELETE CASCADE) |
| titulo_tem | VARCHAR | 200 | No | No | Sí | Título de la temporada (ej: "Temporada 1") |
| year_lanza_tem | INT | - | No | No | Sí | Año de lanzamiento de la temporada |
| num_cap_tem | INT | - | No | No | Sí | Número de capítulos de la temporada |
| descrip_tem | TEXT | - | No | No | Sí | Descripción de la temporada |

##### Tabla: `capitulos`

| Columna | Tipo | Longitud | PK | FK | Nulo | Descripción |
|---------|------|----------|----|----|------|-------------|
| cod_cap | INT | - | Sí | No | No | Código único del capítulo (autoincremental) |
| cod_tem_cap | INT | - | No | Sí | No | FK a cod_tem de temporadas (ON DELETE CASCADE) |
| titulo_cap | VARCHAR | 200 | No | No | Sí | Título del capítulo o episodio |
| duracion_cap | INT | - | No | No | Sí | Duración en minutos |
| ruta_cap | VARCHAR | 255 | No | No | Sí | Ruta del archivo de video MP4 |
| descrip_cap | TEXT | - | No | No | Sí | Descripción del capítulo |

##### Tabla: `suscripciones`

| Columna | Tipo | Longitud | PK | FK | Nulo | Descripción |
|---------|------|----------|----|----|------|-------------|
| cod_scrip | INT | - | Sí | No | No | Código único de suscripción (autoincremental) |
| cod_user | INT | - | No | Sí | Sí | FK a cod_user de usuarios |
| id_mp | VARCHAR | 100 | No | No | Sí | ID de la preferencia de pago en MercadoPago |
| cod_plan_scrip | INT | - | No | No | Sí | Código del plan (1 = premium) |
| duracion_scrip | INT | - | No | No | Sí | Duración en días (30 = mensual) |
| estado | VARCHAR | 20 | No | No | Sí | Estado: pendiente, aprobado, rechazado |
| fecha_compra_scrip | DATETIME | - | No | No | Sí | Fecha de la transacción |
| fecha_inicio | DATETIME | - | No | No | Sí | Fecha de inicio de la suscripción activa |

##### Tabla: `tokens_recuperacion`

| Columna | Tipo | Longitud | PK | FK | Nulo | Descripción |
|---------|------|----------|----|----|------|-------------|
| id | INT | - | Sí | No | No | ID único del token (autoincremental) |
| token | VARCHAR | 8 | No | No | No | Token numérico de 8 dígitos para recuperación |
| correo | VARCHAR | 100 | No | No | No | Correo electrónico asociado al token |
| tabla | VARCHAR | 50 | No | No | No | Tabla origen (usuarios o administradores) |
| expiracion | DATETIME | - | No | No | No | Fecha y hora de expiración del token |
| usado | TINYINT | 1 | No | No | No | Indica si el token ya fue utilizado (0/1) |

---

### 3.5 Funcionalidad y Servicios Ofrecidos

#### 3.5.1 Mapa de Navegación

```
Landing Page (/) → Registro (/registerUser) → Login (/login)
                       ↓                           ↓
                  Dashboard (/home) ←────── Autenticación exitosa
                       ↓
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   Catálogo      Reproductor    Suscripción
   películas     de video       (/suscripcion)
   y series       (MP4)
                              Recuperación de
                              Contraseña
                              (/recuperarPassword)
```

#### 3.5.2 Diagrama de Servicios (Endpoints REST)

```
-------------------------------------------------------------------
|                                                                  |
|                  [DIAGRAMA DE SERVICIOS / ENDPOINTS]             |
|                                                                  |
|  Instrucción: Incluir aquí el diagrama de servicios expuestos    |
|  por el sistema, organizados por módulo:                         |
|                                                                  |
|  Autenticación:                                                  |
|    POST /login                                                    |
|    POST /registerUser                                             |
|                                                                  |
|  Películas (CRUD):                                               |
|    GET    /api/peliculas                                          |
|    POST   /api/agregar-pelicula                                   |
|    GET    /api/pelicula/:id                                       |
|    PUT    /api/actualizar-pelicula/:title                         |
|    DELETE /api/eliminar-pelicula/:id                              |
|    GET    /api/buscar-pelicula                                    |
|    GET    /api/buscar-pelicula-titulo                             |
|                                                                  |
|  Series (CRUD):                                                  |
|    GET    /api/series                                             |
|    POST   /api/agregar-serie                                      |
|    GET    /api/serie/:id                                          |
|    PUT    /api/actualizar-serie/:id                               |
|    DELETE /api/eliminar-serie/:id                                 |
|    GET    /api/buscar-serie-titulo                                |
|                                                                  |
|  Temporadas (CRUD):                                              |
|    GET    /api/serie/:serieId/temporadas                          |
|    POST   /api/serie/:serieId/agregar-temporada                   |
|    GET    /api/temporada/:id                                      |
|    PUT    /api/actualizar-temporada/:id                           |
|    DELETE /api/eliminar-temporada/:id                             |
|                                                                  |
|  Capítulos (CRUD):                                               |
|    GET    /api/temporada/:temporadaId/capitulos                   |
|    POST   /api/temporada/:temporadaId/agregar-capitulo            |
|    GET    /api/capitulo/:id                                       |
|    PUT    /api/actualizar-capitulo/:title                         |
|    DELETE /api/eliminar-capitulo/:id                              |
|                                                                  |
|  Suscripciones y Pagos:                                          |
|    POST   /crear-suscripcion                                      |
|    POST   /webhook                                                |
|    GET    /suscripcion-exitosa                                    |
|    GET    /suscripcion-pendiente                                  |
|    GET    /suscripcion-fallida                                    |
|    GET    /verificar-suscripcion                                  |
|                                                                  |
|  Recuperación de Contraseña:                                     |
|    POST   /enviar-token                                           |
|    POST   /verificar-token                                        |
|    POST   /cambiar-password                                       |
|                                                                  |
-------------------------------------------------------------------
```

#### 3.5.3 Descripción de Módulos

**Módulo de Autenticación**
- Registro de usuarios con validación de datos y encriptación de contraseña (bcrypt)
- Inicio de sesión diferenciado para usuarios y administradores
- Manejo de sesiones mediante express-session con almacenamiento en memoria (MemoryStore)
- Protección de rutas del dashboard mediante verificación de `req.session.login`

**Módulo de Catálogo y Reproducción**
- Visualización de películas y series organizadas por categorías (Tendencias, Top 10, Acción, Comedia, Documentales)
- Búsqueda de contenido por título
- Reproducción de video en formato MP4 mediante HTML5 Video Player
- Gestión de contenido multimedia almacenado localmente en `public/video/`

**Módulo de Administración (CRUD)**
- Creación, lectura, actualización y eliminación de películas
- Creación, lectura, actualización y eliminación de series
- Gestión de temporadas asociadas a cada serie
- Gestión de capítulos asociados a cada temporada
- Eliminación en cascada: al eliminar una serie, se eliminan sus temporadas y capítulos

**Módulo de Suscripciones y Pagos**
- Integración con MercadoPago SDK para procesamiento de pagos
- Plan premium a COP 13.000 mensuales
- Webhook para notificaciones de estado de pago
- Páginas de confirmación: exitosa, pendiente y fallida
- Verificación de estado de suscripción del usuario

**Módulo de Recuperación de Contraseña**
- Solicitud de recuperación mediante correo electrónico
- Generación de token numérico de 8 dígitos
- Envío de token vía SMTP (Gmail) mediante Nodemailer
- Verificación de token con expiración de 15 minutos
- Actualización segura de contraseña

---

## 4. DESPLIEGUE Y CONFIGURACIÓN DE COMPONENTES

### 4.1 Organización de Componentes

#### 4.1.1 Diagrama de Componentes

```
-------------------------------------------------------------------
|                                                                  |
|                  [DIAGRAMA DE COMPONENTES]                       |
|                                                                  |
|  Instrucción: Incluir aquí el diagrama de componentes del        |
|  sistema mostrando las capas y sus interacciones:                |
|                                                                  |
|  ┌──────────────┐                                                |
|  │  Navegador   │                                                |
|  │  Web (Cliente)│                                               |
|  └──────┬───────┘                                                |
|         │ HTTP/HTTPS                                             |
|         ▼                                                        |
|  ┌──────────────────────────────────────────────┐                |
|  │         SERVIDOR EXPRESS (Puerto 3000)         │              |
|  │  ┌─────────┐ ┌──────────┐ ┌────────────────┐  │              |
|  │  │  Rutas  │ │ Vistas   │ │ Archivos       │  │              |
|  │  │ (API)   │ │ (EJS)    │ │ Estáticos      │  │              |
|  │  └────┬────┘ └──────────┘ │ (/public)      │  │              |
|  │       │                   └────────────────┘  │              |
|  └───────┼───────────────────────────────────────┘              |
|          │                                                       |
|          ▼                                                       |
|  ┌──────────────────┐    ┌──────────────────────────┐           |
|  │  MySQL (3306)     │    │  Servicios Externos      │           |
|  │  BD: stream_pro   │    │  • MercadoPago (API)     │           |
|  │  8 tablas         │    │  • Gmail SMTP (587)      │           |
|  └──────────────────┘    └──────────────────────────┘           |
|                                                                  |
-------------------------------------------------------------------
```

#### 4.1.2 Diagrama de Clases (Modelos Principales)

```
-------------------------------------------------------------------
|                                                                  |
|                  [DIAGRAMA DE CLASES]                            |
|                                                                  |
|  Instrucción: Incluir aquí el diagrama de clases con los         |
|  modelos principales del dominio:                                |
|                                                                  |
|  Usuario: -cod_user, -nombre_user, -correo_user, -passw_user    |
|  Administrador: -cod_adm, -nombre_adm, -correo_adm, -passw_adm  |
|  Pelicula: -cod_pel, -titulo_pel, -ruta_pel, -ruta_img_pel     |
|  Serie: -cod_serie, -titulo_serie                               |
|  Temporada: -cod_tem, -cod_serie_tem, -titulo_tem               |
|  Capitulo: -cod_cap, -cod_tem_cap, -titulo_cap, -ruta_cap      |
|  Suscripcion: -cod_scrip, -cod_user, -estado                     |
|  TokenRecuperacion: -token, -correo, -expiracion                 |
|                                                                  |
-------------------------------------------------------------------
```

#### 4.1.3 Diagrama de Despliegue

```
-------------------------------------------------------------------
|                                                                  |
|                  [DIAGRAMA DE DESPLIEGUE]                        |
|                                                                  |
|  Instrucción: Incluir aquí el diagrama de despliegue del         |
|  sistema mostrando la topología de servidores:                   |
|                                                                  |
|  ENTORNO LOCAL (Desarrollo):                                     |
|  ┌─────────────────────────────────────────┐                     |
|  │  PC Windows 10/11                       │                     |
|  │  ┌────────────┐ ┌────────────┐          │                     |
|  │  │ Node.js    │ │ XAMPP      │          │                     |
|  │  │ Express    │ │ MySQL 8    │          │                     |
|  │  │ Puerto 3000│ │ Puerto 3306│          │                     |
|  │  └────────────┘ └────────────┘          │                     |
|  └─────────────────────────────────────────┘                     |
|                                                                  |
|  ENTORNO PRODUCCIÓN (VPS):                                       |
|  ┌─────────────────────────────────────────┐                     |
|  │  Ubuntu Server 24.04 LTS                │                     |
|  │  ┌──────────┐ ┌──────────┐ ┌─────────┐  │                     |
|  │  │ Nginx    │ │ PM2      │ │ MySQL   │  │                     |
|  │  │ :80/:443 │ │ Node.js  │ │ Nativo  │  │                     |
|  │  │ SSL      │ │ :3000    │ │ :3306   │  │                     |
|  │  └──────────┘ └──────────┘ └─────────┘  │                     |
|  └─────────────────────────────────────────┘                     |
|                                                                  |
-------------------------------------------------------------------
```

#### 4.1.4 Estructura de Directorios del Proyecto

```
C:\Stream\StreamPro\
├── app.js                      // Archivo principal — servidor Express
├── package.json                // Configuración del proyecto y dependencias
├── package-lock.json           // Bloqueo de versiones de dependencias
├── config/
│   ├── conexion.js             // Configuración de conexión a MySQL
│   ├── correo.js               // Configuración SMTP para Nodemailer
│   ├── link.js                 // URL base de la aplicación
│   └── mercadopago.js          // Configuración de MercadoPago
├── rutas/
│   ├── index.js                // Ruta de la página principal
│   ├── login.js                // Ruta de autenticación
│   ├── registerUser.js         // Ruta de registro de usuarios
│   ├── home.js                 // Rutas del dashboard y API CRUD
│   ├── home1.js                // Rutas auxiliares del dashboard
│   ├── suscripcion.js          // Rutas de suscripción y pagos
│   └── recuperarPassword.js    // Rutas de recuperación de contraseña
├── views/
│   ├── index.ejs               // Página de aterrizaje (Landing Page)
│   ├── login.ejs               // Página de inicio de sesión
│   ├── registerUser.ejs        // Página de registro
│   ├── home.ejs                // Dashboard principal
│   ├── home1.ejs               // Vista auxiliar del dashboard
│   ├── home2.ejs               // Vista auxiliar del dashboard
│   ├── suscripcion.ejs         // Página de suscripción
│   └── recuperarPassword.ejs   // Página de recuperación de contraseña
├── public/
│   ├── css/                    // Hojas de estilo CSS
│   ├── js/                     // Scripts del lado del cliente
│   ├── img/                    // Imágenes y logos
│   ├── portadas/               // Imágenes de portada de contenido
│   └── video/                  // Archivos de video MP4
└── database/
    └── stream_pro_schema.sql   // Script SQL con el esquema de base de datos
```

---

### 4.2 Instalación

#### 4.2.1 Prerrequisitos de Instalación

Antes de iniciar la instalación, asegurar que el sistema cumple con los siguientes requisitos:

| Requisito | Detalle |
|-----------|---------|
| Sistema Operativo | Windows 10/11 64-bit |
| XAMPP | Versión 8.1 o superior (incluye MySQL) |
| Node.js | Versión 22.x LTS |
| npm | Versión 10.x o superior (incluido con Node.js) |
| Espacio en disco | Mínimo 5 GB libres |
| Conexión a internet | Requerida para descarga de dependencias y servicios externos |
| Navegador web | Chrome 120+, Firefox 115+, Edge 120+ |

#### 4.2.2 Script de Instalación de la Base de Datos

Ejecutar el siguiente script SQL en phpMyAdmin (o mediante MySQL CLI) para crear la estructura completa de la base de datos `stream_pro`:

```sql
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS stream_pro
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE stream_pro;

-- Tabla de administradores
CREATE TABLE administradores (
    cod_adm INT AUTO_INCREMENT PRIMARY KEY,
    nombre_adm VARCHAR(100) NOT NULL,
    correo_adm VARCHAR(100) NOT NULL UNIQUE,
    passw_adm VARCHAR(255) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    cod_user INT AUTO_INCREMENT PRIMARY KEY,
    nombre_user VARCHAR(100) NOT NULL,
    nacionalidad_user VARCHAR(50),
    telefono_user VARCHAR(10),
    correo_user VARCHAR(100) NOT NULL UNIQUE,
    passw_user VARCHAR(255) NOT NULL,
    fecha_regis_user DATETIME,
    cod_scrip_user INT
);

-- Tabla de películas
CREATE TABLE peliculas (
    cod_pel INT AUTO_INCREMENT PRIMARY KEY,
    titulo_pel VARCHAR(200) NOT NULL,
    descrip_pel TEXT,
    duracion_pel INT,
    clasifi_pel VARCHAR(20),
    year_lanza_pel INT,
    director_pel VARCHAR(100),
    ruta_pel VARCHAR(255),
    ruta_img_pel VARCHAR(255)
);

-- Tabla de series
CREATE TABLE series (
    cod_serie INT AUTO_INCREMENT PRIMARY KEY,
    titulo_serie VARCHAR(200) NOT NULL,
    clasifi_serie VARCHAR(20),
    year_lanza_serie INT,
    creador_serie VARCHAR(100),
    ruta_img_ser VARCHAR(255),
    descrip_serie TEXT
);

-- Tabla de temporadas
CREATE TABLE temporadas (
    cod_tem INT AUTO_INCREMENT PRIMARY KEY,
    cod_serie_tem INT NOT NULL,
    titulo_tem VARCHAR(200),
    year_lanza_tem INT,
    num_cap_tem INT,
    descrip_tem TEXT,
    FOREIGN KEY (cod_serie_tem) REFERENCES series(cod_serie) ON DELETE CASCADE
);

-- Tabla de capítulos
CREATE TABLE capitulos (
    cod_cap INT AUTO_INCREMENT PRIMARY KEY,
    cod_tem_cap INT NOT NULL,
    titulo_cap VARCHAR(200),
    duracion_cap INT,
    ruta_cap VARCHAR(255),
    descrip_cap TEXT,
    FOREIGN KEY (cod_tem_cap) REFERENCES temporadas(cod_tem) ON DELETE CASCADE
);

-- Tabla de suscripciones
CREATE TABLE suscripciones (
    cod_scrip INT AUTO_INCREMENT PRIMARY KEY,
    cod_user INT,
    id_mp VARCHAR(100),
    cod_plan_scrip INT,
    duracion_scrip INT,
    estado VARCHAR(20),
    fecha_compra_scrip DATETIME,
    fecha_inicio DATETIME,
    FOREIGN KEY (cod_user) REFERENCES usuarios(cod_user)
);

-- Tabla de tokens de recuperación
CREATE TABLE tokens_recuperacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(8) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    tabla VARCHAR(50) NOT NULL,
    expiracion DATETIME NOT NULL,
    usado TINYINT(1) DEFAULT 0
);
```

#### 4.2.3 Paso a Paso para la Instalación

**Paso 1: Instalar XAMPP**

1. Descargar XAMPP desde https://www.apachefriends.org/es/download.html
2. Ejecutar el instalador y seguir el asistente (ruta recomendada: `C:\xampp`)
3. Abrir el Panel de Control de XAMPP
4. Hacer clic en **Start** junto al módulo **MySQL**
5. Verificar que el indicador cambie a verde (puerto 3306)

**Paso 2: Crear la Base de Datos**

1. Abrir el navegador en `http://localhost/phpmyadmin`
2. Hacer clic en **Nueva** (panel lateral izquierdo)
3. Nombre: `stream_pro`, Cotejamiento: `utf8mb4_general_ci`
4. Hacer clic en **Crear**
5. Ir a la pestaña **SQL** y ejecutar el script completo de la sección 4.2.2
6. Verificar que las 8 tablas se hayan creado correctamente

**Paso 3: Instalar Node.js**

1. Descargar Node.js 22.x LTS desde https://nodejs.org/es/download
2. Ejecutar el instalador, asegurando que la opción **Add to PATH** esté marcada
3. Verificar la instalación:
   ```bash
   node -v
   npm -v
   ```

**Paso 4: Preparar el Proyecto**

1. Ubicar la carpeta del proyecto en `C:\Stream\StreamPro`
2. Verificar que contiene la estructura de directorios completa

**Paso 5: Instalar Dependencias**

```bash
cd C:\Stream\StreamPro
npm install
```

Este comando instalará las siguientes dependencias (definidas en `package.json`):

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| express | 5.1.0 | Framework web |
| ejs | 3.1.10 | Motor de plantillas |
| mysql2 | 3.15.3 | Driver MySQL |
| bcrypt | 6.0.0 | Encriptación de contraseñas |
| express-session | 1.18.2 | Manejo de sesiones |
| mercadopago | 2.12.0 | SDK MercadoPago |
| nodemailer | 8.0.5 | Envío de correos |
| uuid | 13.0.0 | Generación de UUID |
| cors | 2.8.5 | Middleware CORS |

**Paso 6: Configurar Conexión a la Base de Datos**

Verificar el archivo `config/conexion.js`:

```javascript
const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "stream_pro"
});

conexion.connect((err) => {
    if(err){
        console.error("conexion fallida", err);
        return;
    }
    console.log("conexion exitosa");
});

module.exports = conexion;
```

**Paso 7: Iniciar el Servidor**

```bash
node app.js
```

La salida esperada en la terminal debe ser:
```
conexion exitosa
http://localhost:3000
```

**Paso 8: Verificar el Despliegue**

1. Abrir el navegador en `http://localhost:3000`
2. Verificar que la Landing Page de StreamPro carga correctamente
3. Navegar a `http://localhost:3000/login` para verificar el formulario de inicio de sesión
4. Navegar a `http://localhost:3000/registerUser` para verificar el formulario de registro

#### 4.2.4 Scripts de Instalación Automatizada

**Script para Windows (PowerShell):** `instalar_streampro.ps1`

```powershell
# Script de instalación automatizada de StreamPro
Write-Host "=== Instalación de StreamPro ===" -ForegroundColor Green

# Verificar Node.js
$nodeVersion = node -v
if ($nodeVersion -match "v22") {
    Write-Host "Node.js $nodeVersion detectado" -ForegroundColor Green
} else {
    Write-Host "ERROR: Se requiere Node.js 22.x" -ForegroundColor Red
    exit 1
}

# Verificar MySQL
$mysqlVersion = mysql --version
if ($mysqlVersion -match "8\\.") {
    Write-Host "MySQL $mysqlVersion detectado" -ForegroundColor Green
} else {
    Write-Host "ERROR: Se requiere MySQL 8.x" -ForegroundColor Red
    exit 1
}

# Navegar al directorio del proyecto
Set-Location "C:\Stream\StreamPro"

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
npm install

# Iniciar aplicación
Write-Host "Iniciando StreamPro..." -ForegroundColor Green
node app.js
```

---

### 4.3 Configuración

#### 4.3.1 Archivos de Configuración

**`config/conexion.js`** — Conexión a la base de datos MySQL

| Parámetro | Valor por defecto | Descripción |
|-----------|-------------------|-------------|
| host | localhost | Dirección del servidor MySQL |
| user | root | Usuario de MySQL |
| password | "" (vacío) | Contraseña de MySQL |
| database | stream_pro | Nombre de la base de datos |

**`config/mercadopago.js`** — Integración con MercadoPago

| Parámetro | Descripción |
|-----------|-------------|
| access_token | Token de acceso privado de MercadoPago |
| public_key | Clave pública para el frontend |

**`config/correo.js`** — Configuración SMTP para Nodemailer

| Parámetro | Valor por defecto | Descripción |
|-----------|-------------------|-------------|
| service | gmail | Servicio de correo |
| auth.user | (correo Gmail) | Usuario de autenticación |
| auth.pass | (contraseña) | Contraseña o app password |

**`config/link.js`** — URL base de la aplicación

| Entorno | Valor |
|---------|-------|
| Desarrollo | http://localhost:3000 |
| Producción | https://streampro.dominio.com |

**`app.js`** — Configuración principal del servidor

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| PORT | 3000 (o variable de entorno) | Puerto del servidor |
| session.secret | "acceso_app" | Secreto para firmar cookies de sesión |
| session.resave | false | No guardar sesión si no hay cambios |
| session.saveUninitialized | false | No guardar sesiones vacías |

#### 4.3.2 Variables de Entorno Recomendadas

Para entornos de producción, se recomienda utilizar variables de entorno en lugar de valores hardcodeados:

```
PORT=3000
DB_HOST=localhost
DB_USER=streampro
DB_PASSWORD=contraseña_segura
DB_NAME=stream_pro
SESSION_SECRET=clave_secreta_fuerte
MP_ACCESS_TOKEN=APP_USR-xxxxxxxx
MP_PUBLIC_KEY=APP_USR-yyyyyyyy
SMTP_USER=correo@streampro.com
SMTP_PASS=contraseña_app
BASE_URL=https://streampro.dominio.com
```

#### 4.3.3 Roles y Perfiles de Usuario

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Usuario** | Consumidor del catálogo | Ver catálogo, reproducir video, gestionar suscripción, recuperar contraseña |
| **Administrador** | Gestor de contenido | Todos los permisos de usuario + CRUD de películas, series, temporadas y capítulos |

La diferenciación de roles se implementa mediante el campo `req.session.tipo` que se establece durante el inicio de sesión. El valor `"admin"` otorga acceso al panel de administración.

---

### 4.4 Despliegue en Producción

#### 4.4.1 Preparación del Servidor (Ubuntu Server 24.04 LTS)

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesetup.sh
sudo bash nodesetup.sh
sudo apt install nodejs -y
node -v   # Debe mostrar v22.x.x

# Instalar MySQL 8
sudo apt install mysql-server -y
sudo mysql_secure_installation
mysql --version  # Debe mostrar 8.x
```

#### 4.4.2 Configuración con PM2 (Gestor de Procesos)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar la aplicación con PM2
pm2 start app.js --name streampro

# Guardar la configuración de PM2
pm2 save

# Configurar inicio automático al reiniciar el servidor
pm2 startup
```

#### 4.4.3 Configuración de Nginx (Proxy Inverso)

```nginx
server {
    listen 80;
    server_name streampro.dominio.com;

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

Habilitar el sitio y verificar la configuración:

```bash
sudo ln -s /etc/nginx/sites-available/streampro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4.4.4 Configuración de SSL con Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d streampro.dominio.com
```

Esto configurará automáticamente HTTPS con certificados SSL válidos por 90 días (renovación automática mediante el servicio `certbot.timer`).

#### 4.4.5 Configuración de Firewall (UFW)

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status verbose
```

#### 4.4.6 Resumen de Comandos de Despliegue

```bash
# Transferir el proyecto al servidor
scp -r "C:\Stream\StreamPro" usuario@vps:/var/www/streampro

# En el servidor
cd /var/www/streampro
npm install

# Configurar conexion.js con las credenciales de producción
nano config/conexion.js

# Iniciar con PM2
pm2 start app.js --name streampro
pm2 save
pm2 startup

# Verificar funcionamiento
curl http://localhost:3000
```

---

## 5. RESOLUCIÓN DE PROBLEMAS

### 5.1 Errores Técnicos Más Comunes y su Solución

| # | Error | Síntoma | Causa | Diagnóstico | Solución |
|---|-------|---------|-------|-------------|----------|
| 1 | **Conexión a BD fallida** | Mensaje "conexion fallida" en consola al ejecutar `node app.js` | MySQL no está en ejecución, credenciales incorrectas, o base de datos no creada | Verificar que MySQL esté corriendo (XAMPP panel verde), revisar `config/conexion.js` | 1. Iniciar MySQL desde XAMPP<br>2. Verificar host, user, password en conexion.js<br>3. Crear BD si no existe: `CREATE DATABASE stream_pro;` |
| 2 | **Puerto 3000 ocupado** | Error `EADDRINUSE` o `listen EACCES` al iniciar la app | Otra aplicación usando el puerto 3000 | `netstat -ano \| findstr :3000` (Windows) o `ss -tlnp \| grep 3000` (Linux) | Opción 1: `taskkill /PID [PID] /F` (Windows)<br>Opción 2: Usar variable de entorno: `SET PORT=3001 && node app.js` |
| 3 | **Video no carga** | Pantalla negra en el reproductor, mensaje "Video not found" | Ruta del archivo incorrecta en BD o archivo MP4 faltante/corrupto | F12 → Network → buscar solicitud de video, verificar código HTTP de respuesta | 1. Verificar `ruta_pel` o `ruta_cap` en la BD<br>2. Confirmar que el archivo existe en `public/video/`<br>3. Verificar integridad del archivo MP4 |
| 4 | **Webhook MercadoPago no procesa** | Suscripción no se activa después del pago, estado queda como "pendiente" | Firma de integración incorrecta, endpoint no accesible o error en procesamiento | Revisar logs de Node.js, verificar dashboard de MercadoPago, probar webhook con Postman | 1. Verificar `access_token` en `config/mercadopago.js`<br>2. Confirmar que el endpoint `/webhook` es accesible públicamente<br>3. Verificar que la ruta usa `express.raw()` |
| 5 | **Correo de recuperación no enviado** | Usuario solicita recuperación pero no recibe el correo | Credenciales SMTP incorrectas, bloqueo de Gmail, o configuración errónea | Verificar logs de Nodemailer, probar envío con script de prueba | 1. Actualizar credenciales en `config/correo.js`<br>2. Para Gmail: usar App Password (no contraseña normal)<br>3. Verificar que "Acceso de apps menos seguras" esté habilitado |
| 6 | **Sesión expira prematuramente** | Usuario es desconectado antes de los 30 minutos | Configuración de `maxAge` incorrecta o `saveUninitialized` mal configurado | Revisar configuración de `express-session` en `app.js` | 1. Verificar `cookie.maxAge` en milisegundos<br>2. Asegurar `resave: true` si se requiere persistencia<br>3. Verificar que `secret` no cambie entre reinicios |
| 7 | **Error 500 en login** | Al intentar iniciar sesión, el servidor devuelve error 500 | Error en consulta SQL, bcrypt falla, o sesión mal manejada | Revisar consola de Node.js, verificar stack trace del error | 1. Verificar que la tabla `usuarios` o `administradores` existe<br>2. Verificar que los campos en la consulta SQL coinciden con la BD<br>3. Verificar que bcrypt está correctamente importado |
| 8 | **Estilos CSS no cargan** | Página sin formato visual, solo HTML plano | Ruta de archivo estático incorrecta o archivo CSS faltante | F12 → Console → buscar errores 404 en archivos .css | 1. Verificar que `express.static("public")` está configurado en `app.js`<br>2. Verificar rutas en las vistas EJS: `<link rel="stylesheet" href="/css/estilos.css">` |
| 9 | **npm install falla** | Errores al instalar dependencias | Falta de conexión a internet, versiones incompatibles, permisos insuficientes | Revisar el mensaje de error completo en la terminal | 1. Verificar conexión a internet<br>2. Eliminar `node_modules` y `package-lock.json`, reintentar<br>3. Ejecutar como administrador (Windows) o con `sudo` (Linux) |
| 10 | **Base de datos corrupta** | Consultas SQL devuelven errores, tablas no accesibles | Corte de energía durante escritura, error en MySQL, cierre incorrecto | Revisar logs de MySQL (`\xampp\mysql\data\*.err`) | 1. Ejecutar `mysqlcheck -u root -p --auto-repair stream_pro`<br>2. Restaurar desde el último backup |

### 5.2 Comandos de Diagnóstico Rápido

```bash
# Verificar estado de Node.js y la aplicación
node -v
npm -v
pm2 status

# Verificar conexión a base de datos
mysql -u root -p -e "SHOW DATABASES;"
mysql -u root -p stream_pro -e "SHOW TABLES;"

# Verificar puertos en uso
netstat -ano | findstr :3000
netstat -ano | findstr :3306

# Verificar logs de la aplicación
pm2 logs streampro

# Verificar espacio en disco
df -h

# Verificar consumo de recursos
top -b -n 1 | head -20

# Verificar conectividad de red
ping -c 4 google.com
curl -I http://localhost:3000
```

### 5.3 Plan de Rollback Rápido

En caso de que una actualización o migración falle, ejecutar el siguiente procedimiento:

```bash
# 1. Detener el servicio
pm2 stop streampro

# 2. Restaurar la base de datos desde backup
mysql -u root -p stream_pro < backup_stream_pro.sql

# 3. Restaurar archivos de configuración
cp backup/config/conexion.js config/conexion.js
cp backup/config/mercadopago.js config/mercadopago.js

# 4. Reinstalar dependencias (si hubo cambios)
rm -rf node_modules
npm install

# 5. Reiniciar el servicio
pm2 start streampro

# 6. Verificar funcionamiento
curl http://localhost:3000
```

---

## 6. REFERENCIAS BIBLIOGRÁFICAS

1. **ISO/IEC/IEEE 14764:2022.** (2022). *Ingeniería de software — Procesos del ciclo de vida del software — Mantenimiento* (3.ª ed.). Organización Internacional de Normalización. Recuperado de https://www.iso.org/standard/80710.html

2. **Node.js Foundation.** (2026). *Documentación oficial de Node.js v22.x*. Recuperado de https://nodejs.org/dist/latest-v22.x/docs/api/

3. **Express.js.** (2026). *Express — Fast, unopinionated, minimalist web framework for Node.js*. Recuperado de https://expressjs.com/

4. **MySQL, Oracle Corporation.** (2026). *MySQL 8.4 Reference Manual*. Recuperado de https://dev.mysql.com/doc/refman/8.4/en/

5. **Mercado Pago Developers.** (2026). *Documentación para desarrolladores — Integración de pagos en Latinoamérica*. Recuperado de https://www.mercadopago.com.co/developers

6. **Nodemailer.** (2026). *Nodemailer — Send e-mails with Node.js*. Recuperado de https://nodemailer.com/

7. **bcrypt.** (2026). *bcrypt — A library to help you hash passwords*. Recuperado de https://www.npmjs.com/package/bcrypt

8. **EJS — Embedded JavaScript templates.** (2026). *EJS Documentation*. Recuperado de https://ejs.co/

9. **PM2.** (2026). *PM2 — Advanced process manager for Node.js*. Recuperado de https://pm2.keymetrics.io/

10. **Nginx.** (2026). *Nginx Documentation — Reverse proxy*. Recuperado de https://nginx.org/en/docs/

11. **Certbot / Let's Encrypt.** (2026). *Certbot — Obtain free SSL certificates*. Recuperado de https://certbot.eff.org/

12. **OWASP Foundation.** (2026). *OWASP Cheat Sheet Series — Data Protection*. Recuperado de https://cheatsheetseries.owasp.org/

13. **Pressman, R. S.** (2010). *Ingeniería del software: Un enfoque práctico* (7.ª ed.). McGraw-Hill Education.

14. **Mozilla Developer Network (MDN).** (2026). *HTML5 Video — Reproducción de video en navegadores web*. Recuperado de https://developer.mozilla.org/es/docs/Web/HTML/Element/video

15. **SENA — Servicio Nacional de Aprendizaje.** (2026). *Material de formación: Análisis y Desarrollo de Software — Componente formativo de elaboración de documentos técnicos y de usuario*.

16. **Departamento Nacional de Planeación.** (2021). *Guía para la elaboración de manual técnico y de operación de los sistemas de información*. Recuperado de https://bit.ly/3I1439H

---

&nbsp;

*Documento elaborado como evidencia de aprendizaje para el componente formativo: Elaborar documentos técnicos y de usuario del software.*

*Evidencia: GA10-220501097-AA10-EV01*

*Manual Técnico y de Operación — StreamPro v1.0.0*

*SENA — Servicio Nacional de Aprendizaje, Colombia — 2026*
