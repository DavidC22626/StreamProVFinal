# MANUAL DE USUARIO — STREAMPRO

## Plataforma de Streaming de Contenido Audiovisual

---

&nbsp;

**Evidencia:** GA10-220501097-AA11-EV01 — Elaborar el manual de usuario de acuerdo con las funcionalidades del software

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

1. [Objetivo](#1-objetivo)
2. [Alcance](#2-alcance)
3. [Términos y Definiciones](#3-términos-y-definiciones)
4. [¿Qué es el Manual de Usuario del Sistema?](#4-qué-es-el-manual-de-usuario-del-sistema)
5. [Introducción](#5-introducción)
6. [Taxonomía y Contenido del Manual de Usuario](#6-taxonomía-y-contenido-del-manual-de-usuario)
    - 6.1 [Objetivo del Sistema de Información Desarrollado](#61-objetivo-del-sistema-de-información-desarrollado)
        - 6.1.1 [Índice del Contenido](#611-índice-del-contenido)
        - 6.1.2 [Introducción del Sistema](#612-introducción-del-sistema)
        - 6.1.3 [Alcance Funcional y Organizacional](#613-alcance-funcional-y-organizacional)
    - 6.2 [Funciones y Utilización del Sistema](#62-funciones-y-utilización-del-sistema)
        - 6.2.1 [Prerrequisitos para el Uso del Sistema](#621-prerrequisitos-para-el-uso-del-sistema)
        - 6.2.2 [Configuración del Sistema en el Computador del Usuario](#622-configuración-del-sistema-en-el-computador-del-usuario)
        - 6.2.3 [Funcionalidad y Servicios Ofrecidos](#623-funcionalidad-y-servicios-ofrecidos)
        - 6.2.4 [Paso a Paso de Cada Opción del Sistema](#624-paso-a-paso-de-cada-opción-del-sistema)
        - 6.2.5 [Preguntas Frecuentes](#625-preguntas-frecuentes)
        - 6.2.6 [Solución de Problemas](#626-solución-de-problemas)
        - 6.2.7 [Datos de Contacto](#627-datos-de-contacto)
        - 6.2.8 [Glosario](#628-glosario)

---

## 1. OBJETIVO

El objetivo del presente documento es brindar a los usuarios finales y administradores de la plataforma **StreamPro** una guía completa para el uso de todas las funcionalidades del sistema, de tal manera que se oriente al usuario sobre las capacidades, módulos y operaciones disponibles en la aplicación de streaming de contenido audiovisual.

Este manual sigue los lineamientos establecidos por el Ministerio de Tecnologías de la Información y las Comunicaciones (MinTIC) y las políticas de gobierno digital, en concordancia con el Marco de Referencia de Arquitectura Empresarial, específicamente el lineamiento LI.SIS.16 del dominio de Sistemas de Información.

---

## 2. ALCANCE

Este documento describe el contenido mínimo del manual de usuario para el sistema de información **StreamPro**, abarcando:

- Guía sobre cómo utilizar las funciones del sistema.
- Descripciones de alto nivel y particulares de los componentes, menús, submenús del aplicativo.
- Instrucciones de ingreso al sistema.
- Instrucciones para ingreso y consulta de información.
- Flujos de trabajo representativos.
- Aspectos de seguridad relacionados con la administración de perfiles de usuario.
- Solución de problemas comunes.
- Preguntas frecuentes, datos de contacto y glosario.

El manual está dirigido a dos perfiles de usuario:

| Perfil | Descripción |
|--------|-------------|
| **Usuario final** | Persona registrada en la plataforma que consume contenido audiovisual |
| **Administrador** | Persona encargada de gestionar el catálogo de contenido de la plataforma |

---

## 3. TÉRMINOS Y DEFINICIONES

| Término | Definición |
|---------|------------|
| **Navegador Web** | Software utilizado para visualizar la información contenida en los sitios de Internet (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) |
| **Rol** | Comportamiento o responsabilidades de un individuo o grupo de individuos trabajando en equipo, en el contexto de una organización |
| **Streaming** | Tecnología que permite la reproducción de contenido multimedia (audio y video) en tiempo real a través de internet sin necesidad de descargar el archivo completo |
| **Dashboard** | Panel principal o tablero de control que presenta la información organizada del sistema al usuario |
| **CRUD** | Acrónimo de Create (Crear), Read (Leer), Update (Actualizar) y Delete (Eliminar); operaciones básicas de gestión de datos |
| **Sesión** | Período de tiempo durante el cual un usuario interactúa con el sistema después de haberse autenticado |
| **Token** | Código alfanumérico de seguridad utilizado para verificar la identidad del usuario durante procesos de recuperación de contraseña |
| **Webhook** | Mecanismo de comunicación automática entre sistemas que notifica eventos en tiempo real |
| **bcrypt** | Algoritmo de encriptación utilizado para proteger las contraseñas de los usuarios mediante hash |
| **MercadoPago** | Pasarela de pagos en línea utilizada para el procesamiento de suscripciones premium |
| **MVP** | Siglas en inglés de Modelo Vista Controlador, patrón de arquitectura de software que separa la lógica de negocio, la interfaz de usuario y el control de flujo |
| **EJS** | Embedded JavaScript, motor de plantillas utilizado para generar páginas HTML dinámicas |
| **MySQL** | Sistema gestor de base de datos relacional utilizado para el almacenamiento de la información |
| **XAMPP** | Paquete de software libre que incluye Apache, MySQL y phpMyAdmin para entornos de desarrollo local |
| **Plan Premium** | Plan de suscripción paga que otorga acceso completo al catálogo de contenido de StreamPro |
| **Landing Page** | Página de aterrizaje o página principal de presentación del servicio |

---

## 4. ¿QUÉ ES EL MANUAL DE USUARIO DEL SISTEMA?

El manual de usuario es el documento que permite a las personas que utilizan los sistemas de información su entendimiento y uso de las funcionalidades que este posee. Además, es una guía de asistencia para el usuario final sobre el funcionamiento de los aplicativos y de solución a los problemas más comunes.

Teniendo en cuenta que dentro del ciclo de vida de los sistemas de información la documentación técnica y de operación es crucial, y que además es un entregable obligatorio por parte de los desarrolladores, acogiéndonos al Marco de Referencia de Arquitectura de MinTIC donde su Documento Maestro de Arquitectura Empresarial y más exactamente en la guía G.SIS.01 Guía del dominio de Sistemas de Información que contiene el lineamiento LI.SIS.16 en su ámbito de cumplimiento del Lineamiento que dice textualmente:

> **Lineamiento:** La dirección de Tecnologías y Sistemas de la Información o quien haga sus veces debe asegurar que todos sus sistemas de información cuenten con la documentación de usuario, técnica y de operación, debidamente actualizada, que asegure la transferencia de conocimiento hacia los usuarios, hacia la dirección de Tecnologías y Sistemas de la Información o quien haga sus veces y hacia los servicios de soporte tecnológico.

*Fuente: https://mintic.gov.co/arquitecturati/630/w3-article-8836.html*

El presente documento aplica dicho lineamiento ajustado al contexto y realidad del proyecto **StreamPro**, definiendo la taxonomía y contenido del manual de usuario del sistema.

---

## 5. INTRODUCCIÓN

Actualmente los sistemas de información cumplen con un ciclo de desarrollo de software ajustado a la metodología definida en la política de Gobierno Digital de MinTIC conocida como "Metodología de referencia para el desarrollo de sistemas de información — LI.SIS.05" y que define los diferentes estados de los componentes de información según el ciclo de vida de software, entendiéndose desde su creación hasta su retiro o desuso.

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│Análisis  │────>│ Diseño   │────>│Construc- │────>│  Pruebas │────>│Explotac- │
│          │     │          │     │  ción    │     │          │     │  ión     │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
```

**Figura 1.** Proceso metodológico "Ciclo de Vida de los Sistemas de Información"

Es por tal motivo que para cada momento del desarrollo de software se tiene una documentación relevante a ser entregada por parte de los líderes técnico y funcionales del sistema, entre ellos el **Manual de Usuario**.

El manual de usuario debe ser diligenciado durante toda la etapa de construcción de los sistemas de información a medida que se van entregando los diferentes componentes de los aplicativos y se van desarrollando sus funcionalidades. Debe estar listo cuando el sistema está terminado en la fase de explotación, socializado con el líder funcional del proyecto para su aprobación y de ser posible incluirlo como una ayuda en línea de dicho sistema.

---

## 6. TAXONOMÍA Y CONTENIDO DEL MANUAL DE USUARIO

Teniendo en cuenta que el manual de usuario tiene como fin orientar al usuario sobre los módulos y funcionalidades que componen los sistemas de información, en su construcción debe considerar los siguientes aspectos:

- Fundamento conceptual de la funcionalidad del sistema, es decir, una guía sobre cómo utilizar las funciones del sistema.
- Descripción e instrucciones para la operación general (organización a alto nivel) y particular (módulos, componentes, menús, opciones de cada menú y submenú) del aplicativo.
- Instrucciones para el ingreso al aplicativo y ruta de acceso.
- Instrucciones para ingreso de datos, consulta y extracción de información.
- Descripción desde el punto de vista funcional de los flujos de trabajo, procesos o cálculos automáticos efectuados por el sistema.
- Aspectos de seguridad relacionados con la administración de perfiles de usuario.
- Solución de problemas.
- Preguntas frecuentes, datos de contacto y glosario.

---

### 6.1 Objetivo del Sistema de Información Desarrollado

#### 6.1.1 Índice del Contenido

*El índice del contenido se encuentra en la sección "Tabla de Contenido" al inicio de este documento.*

---

#### 6.1.2 Introducción del Sistema

**StreamPro** es una aplicación web de tipo plataforma de streaming de contenido audiovisual (películas y series), desarrollada como proyecto formativo del programa Análisis y Desarrollo de Software del SENA. La plataforma está inspirada en servicios como Netflix y está diseñada para atender aproximadamente 250 usuarios activos no concurrentes.

La aplicación está construida sobre un stack tecnológico moderno basado en JavaScript, utilizando **Node.js** como entorno de ejecución del lado del servidor, **Express 5** como framework web, **EJS** como motor de plantillas para renderizado del lado del servidor y **MySQL 8** como sistema gestor de base de datos relacional.

**Módulos del Sistema:**

| Módulo | Descripción |
|--------|-------------|
| **Landing Page** | Página de aterrizaje con presentación del servicio, características, planes y preguntas frecuentes |
| **Autenticación** | Registro e inicio de sesión de usuarios y administradores con encriptación bcrypt |
| **Dashboard** | Interfaz tipo Netflix con catálogo organizado por categorías (Tendencias, Top 10, Acción, Comedia, Documentales) |
| **Reproductor de Video** | Reproducción de películas y episodios en el navegador mediante HTML5 Video |
| **CRUD de Contenido** | Panel de administración para gestionar películas, series, temporadas y capítulos |
| **Suscripciones** | Integración con MercadoPago para planes premium a COP 13.000/mes |
| **Recuperación de Contraseña** | Sistema de tokens de 8 dígitos enviados por correo electrónico |

**Arquitectura General:**

```
┌──────────────┐
│  Navegador   │
│  Web (Cliente)│
└──────┬───────┘
       │ HTTP/HTTPS
       ▼
┌──────────────────────────────────────────────┐
│         SERVIDOR EXPRESS (Puerto 3000)         │
│  ┌─────────┐ ┌──────────┐ ┌────────────────┐  │
│  │  Rutas  │ │ Vistas   │ │ Archivos       │  │
│  │ (API)   │ │ (EJS)    │ │ Estáticos      │  │
│  │         │ │          │ │ (/public)      │  │
│  └────┬────┘ └──────────┘ └────────────────┘  │
└───────┼───────────────────────────────────────┘
        │
        ▼
┌──────────────────┐    ┌──────────────────────────┐
│  MySQL (3306)     │    │  Servicios Externos      │
│  BD: stream_pro   │    │  • MercadoPago (API)     │
│  8 tablas         │    │  • Gmail SMTP (587)      │
└──────────────────┘    └──────────────────────────┘
```

**Figura 2.** Diagrama de arquitectura del sistema StreamPro

---

#### 6.1.3 Alcance Funcional y Organizacional

**Alcance Funcional:**

El sistema **StreamPro** permite las siguientes funcionalidades desde el punto de vista del negocio:

| Funcionalidad | Descripción | Rol |
|---------------|-------------|-----|
| Visualización de Landing Page | Página de presentación del servicio con información de planes y FAQ | Público |
| Registro de usuario | Creación de cuenta con datos personales, validación de teléfono y correo | Público |
| Inicio de sesión | Autenticación de usuarios y administradores con verificación de credenciales | Usuario / Admin |
| Exploración de catálogo | Navegación por categorías de películas y series con búsqueda por título | Usuario / Admin |
| Reproducción de video | Visualización de películas y episodios en reproductor HTML5 | Usuario / Admin |
| Suscripción premium | Adquisición de plan premium mediante pasarela de pagos MercadoPago | Usuario / Admin |
| Recuperación de contraseña | Restablecimiento de credenciales mediante token de verificación por correo | Usuario / Admin |
| Gestión de películas (CRUD) | Creación, lectura, actualización y eliminación de películas | Admin |
| Gestión de series (CRUD) | Creación, lectura, actualización y eliminación de series | Admin |
| Gestión de temporadas (CRUD) | Creación, lectura, actualización y eliminación de temporadas asociadas a series | Admin |
| Gestión de capítulos (CRUD) | Creación, lectura, actualización y eliminación de capítulos asociados a temporadas | Admin |

**Alcance Organizacional:**

El sistema **StreamPro** está dirigido a los siguientes grupos de interés:

| Grupo de Interés | Rol | Descripción |
|------------------|-----|-------------|
| **Usuarios finales** | Consumidores de contenido | Personas registradas que acceden al catálogo de películas y series, gestionan su suscripción y consumen contenido multimedia |
| **Administradores** | Gestores de contenido | Personas con permisos elevados que administran el catálogo de contenido (películas, series, temporadas, capítulos) |
| **Desarrolladores** | Soporte técnico | Equipo técnico encargado del mantenimiento, actualización y soporte del sistema |

---

### 6.2 Funciones y Utilización del Sistema

#### 6.2.1 Prerrequisitos para el Uso del Sistema

**Requerimientos del Servidor (donde está alojada la aplicación):**

| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| **CPU** | 2 núcleos, 2.0 GHz | 4 núcleos, 2.5 GHz+ |
| **RAM** | 4 GB DDR4 | 8 GB DDR4 |
| **Almacenamiento** | 20 GB SSD | 100 GB SSD |
| **Ancho de banda** | 100 Mbps | 1 Gbps |

> **Nota sobre el almacenamiento del servidor:** La aplicación en sí (código, dependencias, base de datos) ocupa menos de 1 GB. El espacio requerido se debe a los **archivos de video MP4** del catálogo. Una película en calidad HD ocupa entre 1.5 y 5 GB, y una serie con varias temporadas puede superar los 10 GB. Por lo tanto, 20 GB es el espacio mínimo para un catálogo pequeño, mientras que 100 GB es lo recomendado para un catálogo más completo.

**Requerimientos del Equipo del Usuario Final:**

El usuario final **no necesita instalar nada**. Solo requiere:

| Componente | Requisito |
|------------|-----------|
| **Dispositivo** | Computador, tablet, smartphone o Smart TV con acceso a internet |
| **Navegador web** | Google Chrome 120+, Firefox 115+, Edge 120+, Safari 17+ |
| **Conexión a internet** | Mínimo 10 Mbps para reproducción en calidad estándar, 25 Mbps para HD |
| **JavaScript** | Debe estar habilitado en el navegador |
| **Sistema Operativo** | Cualquiera (Windows, macOS, Linux, Android, iOS) |

**Links de Acceso:**

| Entorno | URL |
|---------|-----|
| **Desarrollo local** | http://localhost:3000 |
| **Producción** | https://streampro.dominio.com |

**Permisos por Rol:**

| Rol | Permisos |
|-----|----------|
| **Usuario** | Visualización del catálogo, reproducción de video (con suscripción activa), gestión de suscripción, recuperación de contraseña |
| **Administrador** | Todos los permisos de usuario + CRUD de películas, series, temporadas y capítulos |

---

#### 6.2.2 Configuración del Sistema en el Computador del Usuario

El sistema **StreamPro** es una aplicación web, por lo que no requiere instalación en el computador del usuario final. Sin embargo, se recomienda:

1. **Navegador actualizado:** Utilizar la última versión de Google Chrome, Mozilla Firefox, Microsoft Edge o Safari.
2. **JavaScript habilitado:** Asegurar que JavaScript esté activado en el navegador para el correcto funcionamiento de las funcionalidades interactivas.
3. **Conexión a internet:** Velocidad mínima de 50 Mbps para reproducción de video en calidad estándar.
4. **Permisos de reproducción multimedia:** Permitir la reproducción automática de video en la configuración del navegador.
5. **Pop-ups habilitados:** Para la redirección a la pasarela de pagos de MercadoPago, se recomienda permitir ventanas emergentes.

---

#### 6.2.3 Funcionalidad y Servicios Ofrecidos

**Mapa de Navegación del Sistema:**

```
Landing Page (/) → Registro (/registerUser) → Login (/login)
                       ↓                           ↓
                  Dashboard (/home) ←────── Autenticación exitosa
                       ↓
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   Catálogo       Reproductor    Suscripción
   películas      de video       (/suscripcion)
   y series        (MP4)
                              Recuperación de
                              Contraseña
                              (/recuperarPassword)
```

**Figura 3.** Mapa de navegación de StreamPro

**Módulos del Sistema:**

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| Landing Page | `/` | Página de presentación del servicio |
| Registro | `/registerUser` | Formulario de creación de cuenta |
| Inicio de sesión | `/login` | Formulario de autenticación |
| Dashboard | `/home` | Catálogo principal de contenido |
| Suscripción | `/suscripcion` | Página de planes y pago |
| Recuperar contraseña | `/recuperarPassword` | Flujo de restablecimiento de credenciales |
| API Películas | `/api/peliculas` | Endpoint JSON de películas |
| API Series | `/api/series` | Endpoint JSON de series |

**Servicios Ofrecidos (Endpoints REST):**

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/` | Landing Page | Público |
| GET | `/login` | Página de inicio de sesión | Público |
| POST | `/login` | Autenticación de usuario | Público |
| GET | `/registerUser` | Página de registro | Público |
| POST | `/registerUser` | Crear cuenta de usuario | Público |
| GET | `/home` | Dashboard principal | Usuario / Admin |
| GET | `/suscripcion` | Página de suscripción | Usuario / Admin |
| POST | `/crear-suscripcion` | Crear preferencia de pago MP | Usuario / Admin |
| POST | `/webhook` | Notificación de pago MP | Sistema |
| GET | `/verificar-suscripcion` | Verificar estado de suscripción | Usuario / Admin |
| GET | `/recuperarPassword` | Página de recuperación | Público |
| POST | `/enviar-token` | Enviar código de verificación | Público |
| POST | `/verificar-token` | Verificar código | Público |
| POST | `/cambiar-password` | Cambiar contraseña | Público |
| GET | `/api/peliculas` | Obtener todas las películas | Usuario / Admin |
| POST | `/api/agregar-pelicula` | Crear nueva película | Admin |
| GET | `/api/pelicula/:id` | Obtener película por ID | Admin |
| PUT | `/api/actualizar-pelicula/:title` | Actualizar película | Admin |
| DELETE | `/api/eliminar-pelicula/:id` | Eliminar película | Admin |
| GET | `/api/buscar-pelicula` | Buscar películas por título | Usuario / Admin |
| GET | `/api/series` | Obtener todas las series | Usuario / Admin |
| POST | `/api/agregar-serie` | Crear nueva serie | Admin |
| GET | `/api/serie/:id` | Obtener serie por ID | Admin |
| PUT | `/api/actualizar-serie/:id` | Actualizar serie | Admin |
| DELETE | `/api/eliminar-serie/:id` | Eliminar serie | Admin |
| GET | `/api/serie/:serieId/temporadas` | Obtener temporadas de una serie | Usuario / Admin |
| POST | `/api/serie/:serieId/agregar-temporada` | Agregar temporada | Admin |
| PUT | `/api/actualizar-temporada/:id` | Actualizar temporada | Admin |
| DELETE | `/api/eliminar-temporada/:id` | Eliminar temporada | Admin |
| GET | `/api/temporada/:temporadaId/capitulos` | Obtener capítulos | Usuario / Admin |
| POST | `/api/temporada/:temporadaId/agregar-capitulo` | Agregar capítulo | Admin |
| PUT | `/api/actualizar-capitulo/:title` | Actualizar capítulo | Admin |
| DELETE | `/api/eliminar-capitulo/:id` | Eliminar capítulo | Admin |

---

#### 6.2.4 Paso a Paso de Cada Opción del Sistema

---

### MÓDULO 1: LANDING PAGE (PÁGINA DE INICIO)

**Ruta de acceso:** `/`

**Descripción:** La Landing Page es la página de presentación de StreamPro. Está diseñada para captar la atención de nuevos usuarios, mostrar las características del servicio y proporcionar acceso al registro e inicio de sesión.

**Paso a paso:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Abrir el navegador web e ingresar la URL `http://localhost:3000` | Se carga la Landing Page de StreamPro |

**Elementos de la pantalla:**

- **Header:** Contiene el logo de StreamPro y el botón "Iniciar sesión" en la esquina superior derecha.
- **Hero section:** Título principal "Todas las películas y series que desees, y mucho más." con un formulario de correo electrónico.
- **Secciones de características:** Cuatro filas que describen las ventajas del servicio (TV, multiplataforma, perfiles infantiles, descargas).
- **FAQ:** Acordeón de preguntas frecuentes expandible.
- **Footer:** Enlaces de interés, contacto y copyright.

> **📸 Captura 1:** Landing Page completa mostrando el header con logo, botón "Iniciar sesión" y hero section con el título principal.
>
> **📸 Captura 2:** Sección de características "Disfruta de StreamPro en tu TV" con la imagen descriptiva.
>
> **📸 Captura 3:** Acordeón de preguntas frecuentes con una pregunta expandida mostrando la respuesta.
>
> **📸 Captura 4:** Footer con enlaces y datos de contacto.

---

### MÓDULO 2: REGISTRO DE USUARIO

**Ruta de acceso:** `/registerUser`

**Descripción:** Permite a nuevos usuarios crear una cuenta en la plataforma para acceder al catálogo de contenido.

**Paso a paso:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | En la Landing Page, hacer clic en el botón "Iniciar sesión" | Se redirige a la página de login |
| 2 | En la página de login, hacer clic en el enlace "Registrarse" | Se redirige a la página de registro `/registerUser` |
| 3 | Diligenciar los campos del formulario: | - |
| | • **Nombre completo:** Ingresar el nombre del usuario | Campo se llena correctamente |
| | • **País:** Ingresar la nacionalidad | Campo se llena correctamente |
| | • **Teléfono:** Ingresar número de 10 dígitos | Campo se llena correctamente |
| | • **E-mail:** Ingresar dirección de correo electrónico | Campo se llena correctamente |
| | • **Password:** Ingresar una contraseña segura | Campo se llena correctamente |
| | • **Confirmación Password:** Repetir la contraseña | Campo se llena correctamente |
| 4 | Marcar el checkbox "Aceptar términos y condiciones" | Checkbox se marca |
| 5 | Hacer clic en el botón "Registrarse" | Sistema valida los datos |
| 6 | **Éxito:** Se redirige al login con el mensaje "Registro exitoso, ya puedes iniciar sesión" | Usuario puede iniciar sesión |
| 7 | **Error:** Si el correo ya existe, muestra mensaje "no se puede hacer el registro, el correo ya existe" | Usuario debe usar otro correo |
| 8 | **Error:** Si el teléfono ya existe, muestra mensaje "No se puede realizar el registro, el número ya existe" | Usuario debe usar otro teléfono |
| 9 | **Error:** Si las contraseñas no coinciden o el teléfono no tiene 10 dígitos, muestra mensaje de error | Usuario corrige los datos |

**Validaciones del sistema:**
- El teléfono debe tener exactamente 10 dígitos numéricos.
- Las contraseñas deben coincidir.
- El correo electrónico debe ser único en el sistema.
- El número de teléfono debe ser único en el sistema.
- La contraseña se almacena encriptada con bcrypt.

> **📸 Captura 5:** Formulario de registro vacío mostrando todos los campos: Nombre completo, País, Teléfono, E-mail, Password, Confirmación Password y checkbox de términos.
>
> **📸 Captura 6:** Formulario de registro diligenciado con datos de ejemplo listo para enviar.
>
> **📸 Captura 7:** Pantalla de login con el mensaje de confirmación "Registro exitoso, ya puedes iniciar sesión".

---

### MÓDULO 3: INICIO DE SESIÓN

**Ruta de acceso:** `/login`

**Descripción:** Permite a usuarios registrados y administradores autenticarse en la plataforma para acceder al dashboard y sus funcionalidades.

**Paso a paso:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Navegar a la página de inicio de sesión `http://localhost:3000/login` | Se carga el formulario de login |
| 2 | Ingresar el correo electrónico en el campo "E-mail" | Campo se llena correctamente |
| 3 | Ingresar la contraseña en el campo "Password" | Campo se llena correctamente |
| 4 | **(Opcional para administradores)** Marcar el checkbox "Administrador" | Se habilita autenticación como admin |
| 5 | Hacer clic en el botón "Ingresar" | Sistema valida credenciales |
| 6 | **Éxito (Usuario):** Se redirige al Dashboard `/home` | Usuario ve el catálogo de contenido |
| 7 | **Éxito (Admin):** Se redirige al Dashboard con opciones de administración visibles | Admin ve el catálogo y el menú "Administrar" |
| 8 | **Error:** Si el email no existe, muestra mensaje "El email ingresado no existe" | Usuario verifica su correo |
| 9 | **Error:** Si la contraseña es incorrecta, muestra mensaje "Contraseña incorrecta" | Usuario intenta de nuevo o recupera contraseña |

**Funcionalidades disponibles en pantalla:**
- Campo de correo electrónico.
- Campo de contraseña.
- Checkbox "Administrador" para autenticación con rol administrativo.
- Botón "Ingresar" para enviar el formulario.
- Enlace "¿Olvidaste tu contraseña?" para recuperación de credenciales.
- Enlace "Registrarse" para crear una cuenta nueva.

> **📸 Captura 8:** Formulario de inicio de sesión con campos de E-mail, Password, checkbox Administrador, botón Ingresar y enlaces de navegación.
>
> **📸 Captura 9:** Formulario de inicio de sesión diligenciado con credenciales de ejemplo.
>
> **📸 Captura 10:** Dashboard principal después de inicio de sesión exitoso, mostrando header, navegación y catálogo.

---

### MÓDULO 4: DASHBOARD Y CATÁLOGO

**Ruta de acceso:** `/home`

**Descripción:** El Dashboard es la pantalla principal después de iniciar sesión. Presenta el catálogo de contenido organizado en filas por categorías, similar a plataformas de streaming comerciales.

**Paso a paso:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Después de iniciar sesión, se carga automáticamente el Dashboard | Se muestra el catálogo con las filas de contenido |
| 2 | **Navegación principal:** Hacer clic en las opciones del menú superior (Inicio, Series, Películas, Novedades, Mi lista) | La vista cambia según la categoría seleccionada |
| 3 | **Catálogo de Películas:** Hacer clic en "Películas" en el menú | Se muestra el catálogo completo de películas con grid de portadas y filtros |
| 4 | **Catálogo de Series:** Hacer clic en "Series" en el menú | Se muestra el catálogo completo de series con grid de portadas y filtros |
| 5 | **Búsqueda:** Escribir un título en la barra de búsqueda | El sistema filtra el contenido en tiempo real |
| 6 | **Más información:** Hacer clic en el botón "Más información" de una película/serie destacada | Se abre un modal con detalles del contenido |
| 7 | **Explorar filas:** Usar las flechas izquierda/derecha en cada fila para desplazarse por el contenido | Las tarjetas se desplazan horizontalmente |

**Filas del catálogo:**
- Series Populares
- Tendencias ahora (row1)
- Top 10 en tu país (row2)
- Acción y aventura (row3)
- Comedias (row4)
- Documentales (row5)

> **📸 Captura 11:** Dashboard completo mostrando todas las filas del catálogo (Series Populares, Tendencias, Top 10, Acción, Comedia, Documentales).
>
> **📸 Captura 12:** Menú de navegación superior con las opciones: Inicio, Series, Películas, Novedades, Mi lista y la barra de búsqueda.
>
> **📸 Captura 13:** Barra de búsqueda con un término ingresado y los resultados de contenido filtrados.
>
> **📸 Captura 14:** Catálogo de Películas con grid de portadas, barra de búsqueda y filtro por categorías.
>
> **📸 Captura 15:** Catálogo de Series con grid de portadas y opciones de filtrado.
>
> **📸 Captura 16:** Modal de "Más información" mostrando detalles del contenido seleccionado (título, descripción, calificación, duración, año).

---

### MÓDULO 5: REPRODUCCIÓN DE VIDEO

**Descripción:** El reproductor de video permite a los usuarios con suscripción activa visualizar películas y episodios de series directamente en el navegador mediante el reproductor HTML5.

**Paso a paso — Reproducir película:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Desde el Dashboard, hacer clic en el botón "Reproducir" de la película destacada o buscar la película deseada | Se abre el reproductor de video |
| 2 | El video comienza a reproducirse automáticamente | Usuario visualiza el contenido |
| 3 | Usar los controles del reproductor: play/pausa, volumen, barra de progreso, pantalla completa | El usuario controla la reproducción |
| 4 | Hacer clic en el botón "×" para cerrar el reproductor | Se regresa al Dashboard |

**Paso a paso — Reproducir serie:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Desde el Dashboard, hacer clic en una serie del catálogo | Se abre el modal "Selecciona una temporada" |
| 2 | Hacer clic en la temporada deseada (ej: "Temporada 1") | Se despliega la lista de capítulos disponibles |
| 3 | Hacer clic en el capítulo deseado | Se abre el reproductor de video del capítulo |
| 4 | Usar los botones "Anterior" y "Siguiente" para navegar entre capítulos | El usuario avanza o retrocede en la temporada |
| 5 | La información del capítulo (título, descripción, duración, número) se muestra debajo del video | El usuario conoce los detalles del episodio |

> **📸 Captura 17:** Reproductor de video de película con controles HTML5 visibles (play, pausa, volumen, barra de progreso, pantalla completa).
>
> **📸 Captura 18:** Modal de selección de temporada mostrando las temporadas disponibles y la lista de capítulos.
>
> **📸 Captura 19:** Reproductor de video de capítulo con información del episodio y botones de navegación "Anterior" y "Siguiente".

---

### MÓDULO 6: SUSCRIPCIÓN PREMIUM (MERCADOPAGO)

**Ruta de acceso:** `/suscripcion`

**Descripción:** Este módulo permite a los usuarios adquirir el plan premium de StreamPro mediante la pasarela de pagos MercadoPago, desbloqueando el acceso completo al catálogo de contenido.

**Paso a paso:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Desde el menú del Dashboard, hacer clic en "Suscripción" | Se carga la página de suscripción `/suscripcion` |
| 2 | Visualizar la información del plan premium: | - |
| | • **Plan Premium** a $13.000 COP/mes | Se muestra la tarjeta del plan |
| | • Características: Acceso total, HD/4K, sin anuncios, 2 dispositivos | Se listan los beneficios |
| 3 | Hacer clic en el botón "Activar Premium por $13.000" | El botón cambia a "Procesando..." |
| 4 | El sistema redirige a la pasarela de pago de MercadoPago (Checkout Pro) | Se muestra la interfaz de pago de MercadoPago |
| 5 | Completar el pago en MercadoPago (tarjeta de crédito/débito, PSE, etc.) | El sistema procesa el pago |
| 6 | **Pago exitoso:** Redirección a `/suscripcion-exitosa` | Mensaje: "Suscripción activada correctamente. Tu acceso será habilitado en breve." |
| 7 | **Pago pendiente:** Redirección a `/suscripcion-pendiente` | Mensaje: "Pago pendiente. Te notificaremos cuando se complete." |
| 8 | **Pago fallido:** Redirección a `/suscripcion-fallida` | Mensaje: "El pago no se pudo completar. Intenta de nuevo." |

**Procesamiento automático (Webhook):**
Cuando el pago es aprobado, MercadoPago envía una notificación al webhook del sistema (`/webhook`), que automáticamente actualiza el estado de la suscripción a "activa" y habilita el acceso al contenido premium.

> **📸 Captura 20:** Página de suscripción mostrando el Plan Premium a $13.000/mes con sus características y el botón "Activar Premium por $13.000".
>
> **📸 Captura 21:** Redirección a la pasarela de pago de MercadoPago (Checkout Pro) con el resumen del pago.
>
> **📸 Captura 22:** Página de confirmación de suscripción exitosa.
>
> **📸 Captura 23:** Página de pago pendiente.
>
> **📸 Captura 24:** Página de pago fallido.

---

### MÓDULO 7: RECUPERACIÓN DE CONTRASEÑA

**Ruta de acceso:** `/recuperarPassword`

**Descripción:** Este módulo permite a los usuarios restablecer su contraseña cuando la han olvidado, mediante un proceso seguro de verificación por token enviado al correo electrónico.

**Paso a paso:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| **Paso 1: Solicitar código** | | |
| 1 | En la página de login, hacer clic en "¿Olvidaste tu contraseña?" | Se redirige a `/recuperarPassword` |
| 2 | Ingresar el correo electrónico en el campo "E-mail" | Campo se llena correctamente |
| 3 | Seleccionar el tipo de cuenta: "Usuario" o "Administrador" | Opción seleccionada |
| 4 | Hacer clic en "Enviar código" | El sistema genera un token de 8 dígitos y lo envía al correo |
| **Paso 2: Verificar código** | | |
| 5 | Revisar la bandeja de entrada del correo electrónico | Se recibe un correo de StreamPro con el código de 8 dígitos |
| 6 | Ingresar el código de 8 dígitos en el campo correspondiente | Campo se llena correctamente |
| 7 | Hacer clic en "Verificar código" | El sistema valida el token (vigencia 15 minutos) |
| **Paso 3: Cambiar contraseña** | | |
| 8 | Ingresar la nueva contraseña en el campo "Nueva contraseña" (mínimo 6 caracteres) | Campo se llena correctamente |
| 9 | Repetir la nueva contraseña en "Confirmar contraseña" | Campo se llena correctamente |
| 10 | Hacer clic en "Cambiar contraseña" | El sistema actualiza la contraseña y marca el token como usado |
| 11 | Redirección automática a la página de login después de 2 segundos | Usuario puede iniciar sesión con la nueva contraseña |

**Validaciones del sistema:**
- El correo debe estar registrado en la base de datos.
- El token tiene una vigencia de 15 minutos.
- El token solo puede usarse una vez.
- La nueva contraseña debe tener al menos 6 caracteres.
- Las contraseñas deben coincidir.

> **📸 Captura 25:** Paso 1 — Formulario de recuperación con campo de correo electrónico y selector de tipo de cuenta (Usuario/Administrador).
>
> **📸 Captura 26:** Paso 2 — Pantalla de verificación de código mostrando el mensaje "Hemos enviado un código de verificación a [email]" y el campo para ingresar el código de 8 dígitos.
>
> **📸 Captura 27:** Paso 3 — Formulario para ingresar nueva contraseña y confirmación.
>
> **📸 Captura 28:** Mensaje de confirmación "Contraseña actualizada correctamente. Redirigiendo..." con cuenta regresiva.

---

### MÓDULO 8: PANEL DE ADMINISTRACIÓN (CRUD)

**Descripción:** El panel de administración permite a los usuarios con rol de administrador gestionar todo el contenido de la plataforma, incluyendo películas, series, temporadas y capítulos.

**Acceso al panel:**
El menú "Administrar" solo está visible para usuarios que inician sesión con el checkbox "Administrador" marcado.

**Paso a paso — Gestión de Películas:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | En el Dashboard, hacer clic en el botón "Administrar" en el menú superior | Se despliega un dropdown con opciones |
| 2 | Seleccionar "Películas" del dropdown | Se muestra el panel de administración de películas con la tabla de películas existentes |
| 3 | **Buscar película:** Usar la barra de búsqueda para filtrar películas por título | La tabla se filtra en tiempo real |
| 4 | **Agregar película:** Hacer clic en "+ Agregar Película" | Se abre el modal con el formulario de creación |
| 5 | Diligenciar los campos: Título, Categoría, Año, Duración, Director, Ruta de imagen, Ruta de video, Descripción | Formulario completo |
| 6 | Hacer clic en "Guardar" | La película se agrega a la base de datos y la tabla se actualiza |
| 7 | **Editar película:** Hacer clic en el botón de edición (lápiz) de una película existente | Se abre el modal con los datos precargados |
| 8 | Modificar los campos deseados y hacer clic en "Guardar" | La película se actualiza en la base de datos |
| 9 | **Eliminar película:** Hacer clic en el botón de eliminar (papelera) de una película existente | La película se elimina de la base de datos |

**Categorías disponibles:**
- Tendencias ahora (row1)
- Top 10 (row2)
- Acción (row3)
- Comedia (row4)
- Documentales (row5)

> **📸 Captura 29:** Dropdown del botón "Administrar" mostrando las opciones: Géneros, Películas, Series, Usuarios, Administradores.
>
> **📸 Captura 30:** Panel "Administrar Películas" con la tabla de películas (Imagen, Título, Categoría, Año, Acciones) y barra de búsqueda.
>
> **📸 Captura 31:** Modal "Agregar Película" con todos los campos del formulario vacío.
>
> **📸 Captura 32:** Modal de edición de película con datos precargados para modificar.
>
> **📸 Captura 33:** Confirmación de eliminación de película (o tabla con botón de eliminar visible).

**Paso a paso — Gestión de Series:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | En el menú "Administrar", seleccionar "Series" | Se muestra el panel de administración de series |
| 2 | **Agregar serie:** Hacer clic en "+ Agregar Serie" | Se abre el modal con el formulario |
| 3 | Diligenciar los campos: Título, Categoría, Año, Director, Ruta de imagen, Descripción | Formulario completo |
| 4 | Hacer clic en "Guardar" | La serie se agrega a la base de datos |
| 5 | **Editar serie:** Usar el botón de edición en la fila correspondiente | Modal con datos precargados |
| 6 | **Eliminar serie:** Usar el botón de eliminar (elimina en cascada temporadas y capítulos) | Serie y todo su contenido asociado se elimina |

> **📸 Captura 34:** Panel "Administrar Series" con tabla de series (Imagen, Título, Categoría, Año, Acciones).
>
> **📸 Captura 35:** Modal "Agregar Serie" con campos Título, Categoría, Año, Director, Ruta de imagen, Descripción.

**Paso a paso — Gestión de Temporadas:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Desde el panel de series, hacer clic en el botón de gestión de temporadas de una serie | Se abre el modal "Administrar Temporadas" |
| 2 | **Agregar temporada:** Hacer clic en "+ Agregar Temporada" | Se abre el formulario |
| 3 | Diligenciar: Número de capítulos, Título, Año de lanzamiento, Descripción | Formulario completo |
| 4 | Hacer clic en "Guardar" | La temporada se asocia a la serie |
| 5 | **Editar/Eliminar:** Usar los botones de acción en cada fila | Operación CRUD correspondiente |

> **📸 Captura 36:** Modal "Administrar Temporadas" con tabla de temporadas (Capítulos, Título, Año, Acciones) y botón "+ Agregar Temporada".
>
> **📸 Captura 37:** Modal "Agregar Temporada" con campos Número de capítulos, Título, Año de lanzamiento, Descripción.

**Paso a paso — Gestión de Capítulos:**

| Paso | Acción | Resultado esperado |
|------|--------|-------------------|
| 1 | Desde el modal de temporadas, hacer clic en el botón de gestión de capítulos de una temporada | Se abre el modal "Administrar Capítulos" |
| 2 | **Agregar capítulo:** Hacer clic en "+ Agregar Capítulo" | Se abre el formulario |
| 3 | Diligenciar: Número de capítulo, Título, Duración, Ruta de video, Descripción | Formulario completo |
| 4 | Hacer clic en "Guardar" | El capítulo se asocia a la temporada |
| 5 | **Editar/Eliminar:** Usar los botones de acción en cada fila | Operación CRUD correspondiente |

> **📸 Captura 38:** Modal "Administrar Capítulos" con tabla de capítulos (Nº, Título, Duración, Acciones) y botón "+ Agregar Capítulo".
>
> **📸 Captura 39:** Modal "Agregar Capítulo" con campos Número, Título, Duración, Ruta de video, Descripción.

---

### FLUJOS DE TRABAJO DEL SISTEMA

**Flujo 1: Registro y primer inicio de sesión**

```
[Landing Page] ──> [Registro (/registerUser)]
                        │
                        ▼
              [Completar formulario]
                        │
                        ▼
              [Validación de datos]
                        │
               ┌────────┴────────┐
               ▼                 ▼
           [Éxito]           [Error]
               │                 │
               ▼                 ▼
        [Redirige a      [Mensaje de error/
           Login]         Corrección de datos]
               │
               ▼
        [Inicio de sesión]
               │
               ▼
          [Dashboard]
```

**Figura 4.** Flujo de registro e inicio de sesión

**Flujo 2: Suscripción premium**

```
[Dashboard] ──> [Suscripción (/suscripcion)]
                      │
                      ▼
            [Seleccionar Plan Premium]
                      │
                      ▼
            [Click "Activar Premium"]
                      │
                      ▼
            [Redirección a MercadoPago]
                      │
                      ▼
               [Realizar pago]
                      │
           ┌──────────┼──────────┐
           ▼          ▼          ▼
       [Éxito]   [Pendiente]  [Fallido]
           │          │          │
           ▼          ▼          ▼
    [Suscripción  [Esperar     [Reintentar
     activa]     notificación]   pago]
```

**Figura 5.** Flujo de suscripción premium

**Flujo 3: Recuperación de contraseña**

```
[Login] ──> [¿Olvidaste tu contraseña?]
                 │
                 ▼
         [Ingresar correo]
                 │
                 ▼
         [Recibir código por email]
                 │
                 ▼
         [Ingresar código de 8 dígitos]
                 │
           ┌─────┴─────┐
           ▼           ▼
       [Válido]    [Inválido/Expirado]
           │           │
           ▼           ▼
    [Nueva contraseña] [Reintentar]
           │
           ▼
    [Contraseña actualizada]
           │
           ▼
    [Redirección al Login]
```

**Figura 6.** Flujo de recuperación de contraseña

**Flujo 4: Administración de contenido (CRUD)**

```
[Dashboard Admin] ──> [Menú "Administrar"]
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
      [Películas]     [Series]    [Temporadas/Capítulos]
              │             │             │
              ▼             ▼             ▼
     ┌───────────────┐  ┌───────────┐  ┌──────────────┐
     │ Crear/Leer/   │  │ Crear/Leer│  │ Crear/Leer/  │
     │ Actualizar/   │  │ Actualizar│  │ Actualizar/  │
     │ Eliminar      │  │ Eliminar  │  │ Eliminar     │
     └───────────────┘  └───────────┘  └──────────────┘
```

**Figura 7.** Flujo de administración de contenido

---

#### 6.2.5 Preguntas Frecuentes

**Sobre Resultados:**

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué puedo hacer con StreamPro? | Puedes ver películas y series en streaming, explorar el catálogo organizado por categorías, gestionar tu suscripción premium y administrar contenido si eres administrador |
| ¿Qué obtengo con el plan premium? | Acceso completo a todo el catálogo de películas y series, calidad HD y 4K, sin anuncios publicitarios, y hasta 2 dispositivos simultáneos |
| ¿Puedo ver contenido sin suscripción? | No, necesitas una suscripción premium activa para reproducir videos |

**Sobre Conceptos o Términos:**

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué es el Dashboard? | Es la pantalla principal del sistema después de iniciar sesión, donde se muestra el catálogo de contenido organizado en filas por categorías |
| ¿Qué significa CRUD? | Es un acrónimo de Create (Crear), Read (Leer), Update (Actualizar) y Delete (Eliminar); son las operaciones básicas para gestionar contenido |
| ¿Qué es el token de recuperación? | Es un código de 8 dígitos que se envía a tu correo electrónico para verificar tu identidad al recuperar la contraseña |

**Sobre Procedimientos:**

| Pregunta | Respuesta |
|----------|-----------|
| ¿Cómo me registro en StreamPro? | Ve a la página de registro `/registerUser`, completa el formulario con tus datos y haz clic en "Registrarse" |
| ¿Cómo inicio sesión? | Ve a `/login`, ingresa tu correo y contraseña, y haz clic en "Ingresar" |
| ¿Cómo recupero mi contraseña? | En la página de login, haz clic en "¿Olvidaste tu contraseña?", ingresa tu correo, sigue las instrucciones del código enviado y crea una nueva contraseña |
| ¿Cómo activo mi suscripción premium? | Desde el menú del Dashboard, ve a "Suscripción", selecciona el plan Premium y haz clic en "Activar Premium" para ser redirigido a MercadoPago |
| ¿Cómo agrego una película (admin)? | En el menú "Administrar" → "Películas" → "+ Agregar Película", completa el formulario y guarda |

**Sobre Interpretaciones:**

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué ocurre si no tengo suscripción activa? | No podrás reproducir ningún video, aunque sí puedes navegar por el catálogo |
| ¿Qué significa el estado "pendiente" en mi suscripción? | Significa que el pago está siendo procesado por MercadoPago. Una vez aprobado, el estado cambiará automáticamente a "activa" |
| ¿Qué ocurre si el token de recuperación expira? | Deberás solicitar un nuevo código de recuperación, ya que cada token tiene una vigencia de 15 minutos |

**Sobre Navegación:**

| Pregunta | Respuesta |
|----------|-----------|
| ¿En qué fase me encuentro? | El sistema muestra claramente en qué pantalla estás mediante las URLs y los títulos de las páginas |
| ¿A dónde puedo seguir después de registrarme? | Después del registro exitoso, el sistema te redirige automáticamente a la página de inicio de sesión |
| ¿Cómo vuelvo al inicio? | Puedes hacer clic en el logo de StreamPro o en la opción "Inicio" del menú de navegación |

---

#### 6.2.6 Solución de Problemas

| # | Problema | Causa Probable | Solución |
|---|----------|----------------|----------|
| 1 | **No puedo iniciar sesión — "El email ingresado no existe"** | El correo no está registrado en la plataforma | Verificar que el correo sea el mismo que usaste al registrarte. Si no, crea una cuenta nueva en `/registerUser` |
| 2 | **No puedo iniciar sesión — "Contraseña incorrecta"** | La contraseña ingresada no coincide con la registrada | Usa la opción "¿Olvidaste tu contraseña?" en la pantalla de login para restablecerla |
| 3 | **No puedo registrarme — "El correo ya existe"** | Ya hay una cuenta registrada con ese correo | Intenta iniciar sesión con ese correo. Si olvidaste la contraseña, usa la recuperación de contraseña |
| 4 | **No puedo registrarme — "El número ya existe"** | El número de teléfono ya está asociado a otra cuenta | Usa un número de teléfono diferente |
| 5 | **El video no se reproduce** | No tienes una suscripción premium activa | Adquiere el plan premium en la página de suscripción (`/suscripcion`) |
| 6 | **El video no carga — pantalla negra** | La ruta del archivo MP4 es incorrecta o el archivo no existe | Contacta al administrador del sistema para que verifique la ruta del video en la base de datos |
| 7 | **El reproductor no muestra controles** | El navegador no es compatible con HTML5 Video | Actualiza tu navegador a la última versión (Chrome 120+, Firefox 115+, Edge 120+) |
| 8 | **La página no carga o muestra "conexion fallida"** | El servidor MySQL no está en ejecución | Si eres administrador, inicia MySQL desde XAMPP Panel de Control. Si eres usuario, contacta al soporte técnico |
| 9 | **El código de recuperación no llega al correo** | Configuración SMTP incorrecta o el correo fue marcado como spam | Revisa la carpeta de spam. Si no aparece, contacta al administrador del sistema |
| 10 | **El código de recuperación expiró** | Pasaron más de 15 minutos desde la solicitud | Solicita un nuevo código de recuperación |
| 11 | **Error 500 al iniciar sesión** | Error en el servidor o en la base de datos | Contacta al administrador del sistema para revisar los logs del servidor |
| 12 | **El panel de administración no aparece** | No iniciaste sesión como administrador | Cierra sesión y vuelve a iniciar marcando el checkbox "Administrador" |
| 13 | **El pago con MercadoPago no se completa** | Error en la pasarela de pagos o datos incorrectos | Verifica los datos de pago e intenta nuevamente. Si persiste, contacta al soporte de MercadoPago |
| 14 | **Los estilos CSS no cargan (página sin formato)** | Ruta de archivo estático incorrecta | Contacta al administrador para verificar que `express.static("public")` esté configurado en `app.js` |

---

#### 6.2.7 Datos de Contacto

Para soporte técnico o funcional sobre el sistema **StreamPro**, el usuario puede contactar a través de los siguientes canales:

| Canal | Información |
|-------|-------------|
| **Correo electrónico** | help@streampro.com |
| **Teléfono** | 310-735-2592 |
| **Sitio web** | http://localhost:3000 |
| **Desarrollador** | David Camilo Caicedo |
| **Ficha SENA** | 3070420 |
| **Programa** | Análisis y Desarrollo de Software |
| **Centro de Formación** | Centro de Gestión de Mercados, Logística y Tecnologías de la Información |
| **Regional** | Distrito Capital |

---

#### 6.2.8 Glosario

| Término | Definición en el contexto de StreamPro |
|---------|----------------------------------------|
| **Administrador** | Rol de usuario con permisos para gestionar el catálogo de contenido (películas, series, temporadas, capítulos) |
| **Autenticación** | Proceso de verificación de identidad mediante credenciales (correo y contraseña) |
| **bcrypt** | Algoritmo de encriptación utilizado para proteger las contraseñas almacenadas en la base de datos |
| **Catálogo** | Conjunto de películas y series disponibles en la plataforma organizado por categorías |
| **CRUD** | Operaciones de Crear, Leer, Actualizar y Eliminar que permiten la gestión de contenido |
| **Dashboard** | Panel principal del sistema que presenta el catálogo de contenido al usuario después de iniciar sesión |
| **EJS** | Motor de plantillas utilizado para generar páginas HTML dinámicas en el servidor |
| **Endpoint** | URL específica que expone una funcionalidad de la API REST del sistema |
| **Express** | Framework web de Node.js utilizado para el manejo de rutas y middleware |
| **HTML5 Video** | Tecnología estándar de navegadores web para reproducir video sin necesidad de plugins |
| **Landing Page** | Página de aterrizaje o página principal de presentación del servicio StreamPro |
| **MercadoPago** | Pasarela de pagos en línea integrada para el procesamiento de suscripciones premium |
| **MySQL** | Sistema gestor de base de datos relacional donde se almacena toda la información del sistema |
| **Node.js** | Entorno de ejecución de JavaScript del lado del servidor |
| **Rol** | Conjunto de permisos y responsabilidades asignados a un usuario (Usuario o Administrador) |
| **Sesión** | Estado de autenticación del usuario que se mantiene durante su interacción con el sistema |
| **Streaming** | Tecnología que permite reproducir contenido multimedia en tiempo real sin descargar el archivo |
| **Suscripción** | Plan de pago que otorga acceso premium al catálogo de contenido |
| **Token** | Código alfanumérico de 8 dígitos utilizado para verificar la identidad en la recuperación de contraseña |
| **Usuario** | Rol de persona registrada que consume contenido audiovisual en la plataforma |
| **Webhook** | Mecanismo automático que recibe notificaciones de MercadoPago sobre el estado de los pagos |
| **XAMPP** | Paquete de software que incluye Apache, MySQL y phpMyAdmin para el entorno de desarrollo local |

---

## REFERENCIAS

- Ministerio de Tecnologías de la Información y las Comunicaciones (MinTIC). *Marco de Referencia de Arquitectura Empresarial*. Recuperado de: https://mintic.gov.co/arquitecturati/630/w3-article-8836.html
- Departamento Nacional de Planeación (DNP). *Guía para la Elaboración de Manuales de Usuario de los Sistemas de Información*. Recuperado de: https://bit.ly/31aMsek
- MercadoPago Developers. *Checkout Pro API*. Recuperado de: https://www.mercadopago.com.co/developers
- Node.js Documentation. Recuperado de: https://nodejs.org/docs/latest/api/
- Express.js Guide. Recuperado de: https://expressjs.com/en/guide/routing.html
- MySQL 8.0 Reference Manual. Recuperado de: https://dev.mysql.com/doc/refman/8.0/en/
