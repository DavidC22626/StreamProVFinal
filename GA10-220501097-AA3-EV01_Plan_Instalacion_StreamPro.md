# INFORME: PLAN DE INSTALACIÓN Y DESPLIEGUE LOCAL DE STREAMPRO

**Servidor de Aplicaciones con Node.js, Express y MySQL (XAMPP)**

---

**Autor:** David Caicedo  
**Programa:** Análisis y Desarrollo de Software  
**Centro de Formación:** SENA  
**Código de Evidencia:** GA10-220501097-AA3-EV01  
**Fecha:** 2026

---

## TABLA DE CONTENIDO

1. Introducción
2. Descripción del Proyecto
3. Plataforma de Desarrollo e Implantación Seleccionada
4. Requisitos del Sistema
5. Arquitectura del Despliegue
6. Paso a Paso de la Instalación
   - 6.1 Instalación de XAMPP y Configuración de MySQL
   - 6.2 Creación de la Base de Datos `stream_pro`
   - 6.3 Instalación de Node.js
   - 6.4 Preparación del Proyecto StreamPro
   - 6.5 Instalación de Dependencias
   - 6.6 Configuración de Conexión a la Base de Datos
   - 6.7 Inicio del Servidor de Aplicaciones
   - 6.8 Verificación del Despliegue
7. Estructura de la Base de Datos
8. Endpoints y Funcionalidades
9. Conclusiones
10. Referencias

---

## 1. INTRODUCCIÓN

El presente documento describe el plan de instalación y despliegue local de la aplicación web **StreamPro**, una plataforma de streaming de contenido audiovisual que permite la gestión de películas, series, usuarios, suscripciones y pagos en línea.

Para el despliegue se utiliza una arquitectura basada en **Node.js con el framework Express 5** como servidor de aplicaciones, complementado con **MySQL gestionado a través de XAMPP** como sistema de base de datos. Esta combinación representa una plataforma moderna de desarrollo e implantación de aplicaciones web, equivalente contemporáneo de las clásicas plataformas LAMP/WAMP.

El objetivo de este informe es documentar de forma detallada y con soporte visual cada paso necesario para instalar, configurar y verificar el funcionamiento del servidor de aplicaciones local, garantizando que la aplicación StreamPro opere correctamente en el entorno del cliente.

---

## 2. DESCRIPCIÓN DEL PROYECTO

**StreamPro** es una aplicación web de tipo plataforma de streaming inspirada en servicios como Netflix, desarrollada como proyecto formativo del programa de Análisis y Desarrollo de Software del SENA.

### Funcionalidades principales:

- **Página de aterrizaje (Landing Page):** Presentación del servicio con sección de características y preguntas frecuentes.
- **Registro de usuarios:** Creación de cuentas con validación de datos y encriptación de contraseñas mediante bcrypt.
- **Inicio de sesión:** Autenticación diferenciada para usuarios y administradores.
- **Panel principal (Dashboard):** Interfaz tipo Netflix con catálogo de películas y series organizadas por categorías (Tendencias, Top 10, Acción, Comedia, Documentales).
- **Reproductor de video:** Reproducción de películas y episodios de series directamente en el navegador.
- **Gestión de contenido (CRUD):** Panel de administración para crear, leer, actualizar y eliminar películas, series, temporadas y capítulos.
- **Suscripciones y pagos:** Integración con MercadoPago para procesamiento de pagos con planes premium a $13.000 COP mensuales.
- **Recuperación de contraseñas:** Sistema de recuperación mediante tokens enviados por correo electrónico a través de SMTP (Gmail).

### Tecnologías utilizadas:

| Componente | Tecnología | Versión |
|---|---|---|
| Runtime | Node.js | 22.x |
| Framework Web | Express | 5.1.0 |
| Motor de Vistas | EJS | 3.1.10 |
| Base de Datos | MySQL | 8.x (vía XAMPP) |
| Encriptación | bcrypt | 6.0.0 |
| Pagos | MercadoPago SDK | 2.12.0 |
| Envío de Email | Nodemailer | 8.0.5 |
| Sesiones | express-session | 1.18.2 |

---

## 3. PLATAFORMA DE DESARROLLO E IMPLANTACIÓN SELECCIONADA

Para el despliegue de StreamPro se seleccionó una arquitectura compuesta por dos componentes:

### 3.1 XAMPP (para la Base de Datos)

**XAMPP** es una distribución de Apache completamente gratuita y fácil de instalar que contiene MySQL, PHP y Perl. En este proyecto se utiliza exclusivamente el componente **MySQL** como sistema de gestión de bases de datos relacional.

- **Puerto por defecto:** 3306
- **Usuario por defecto:** root
- **Contraseña por defecto:** (vacía)
- **Panel de administración:** phpMyAdmin (`http://localhost/phpmyadmin`)

### 3.2 Node.js + Express (para el Servidor de Aplicaciones)

**Node.js** es un entorno de ejecución de JavaScript del lado del servidor basado en el motor V8 de Chrome. **Express** es el framework web minimalista más popular para Node.js, que permite manejar rutas, middleware, sesiones y servir contenido estático y dinámico.

- **Puerto de la aplicación:** 3000
- **Motor de plantillas:** EJS (Embedded JavaScript)
- **Archivos estáticos:** carpeta `/public`

### 3.3 Justificación de la Selección

Esta arquitectura fue seleccionada porque:

1. **Node.js + Express** es el stack nativo del proyecto StreamPro, ya que la aplicación fue desarrollada con estas tecnologías.
2. **XAMPP** proporciona una instalación sencilla y portable de MySQL con phpMyAdmin como interfaz gráfica para la administración de bases de datos.
3. La combinación permite un despliegue rápido y funcional en entornos Windows, que es el sistema operativo del equipo donde se realiza el despliegue.
4. Es una alternativa moderna a las plataformas tradicionales WAMP/LAMP, ofreciendo mayor rendimiento para aplicaciones basadas en JavaScript.

---

## 4. REQUISITOS DEL SISTEMA

### 4.1 Requisitos de Hardware

| Componente | Mínimo | Recomendado |
|---|---|---|
| Procesador | 1 GHz | 2 GHz o superior |
| Memoria RAM | 2 GB | 4 GB o superior |
| Espacio en Disco | 5 GB | 10 GB o superior |
| Conexión a Internet | Requerida | Requerida (para instalación y servicios externos) |

### 4.2 Requisitos de Software

| Software | Versión | Propósito |
|---|---|---|
| Sistema Operativo | Windows 10/11 | Sistema base |
| XAMPP | 8.1 o superior | Servidor MySQL |
| Node.js | 22.x | Runtime de la aplicación |
| Navegador Web | Chrome/Firefox/Edge | Acceso a la aplicación |

### 4.3 Requisitos de la Aplicación

- Carpeta del proyecto `StreamPro` con todos los archivos fuente
- Conexión activa a internet para:
  - Descarga de dependencias (npm install)
  - Funcionamiento de MercadoPago (API de pagos)
  - Envío de correos de recuperación de contraseña (SMTP Gmail)

---

## 5. ARQUITECTURA DEL DESPLIEGUE

```
┌─────────────────────────────────────────────────────┐
│                   CLIENTE (Navegador)               │
│              http://localhost:3000                  │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│           SERVIDOR DE APLICACIONES                  │
│              Node.js + Express 5                    │
│                   Puerto: 3000                      │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Rutas   │  │  Vistas  │  │  Archivos        │  │
│  │  (API)   │  │  (EJS)   │  │  Estáticos       │  │
│  └──────────┘  └──────────┘  │  (/public)       │  │
│                               └──────────────────┘  │
└──────────┬──────────────────────────┬───────────────┘
           │                          │
           ▼                          ▼
┌─────────────────────┐    ┌─────────────────────────┐
│   MySQL (XAMPP)     │    │   Servicios Externos    │
│   Puerto: 3306      │    │                         │
│   BD: stream_pro    │    │  - MercadoPago (API)    │
│   user: root        │    │  - Gmail SMTP           │
└─────────────────────┘    └─────────────────────────┘
```

---

## 6. PASO A PASO DE LA INSTALACIÓN

### 6.1 Instalación de XAMPP y Configuración de MySQL

**Paso 1:** Descargar XAMPP desde el sitio oficial: [https://www.apachefriends.org/es/download.html](https://www.apachefriends.org/es/download.html)

**Paso 2:** Ejecutar el instalador y seguir el asistente de instalación. Se recomienda instalar en la ruta por defecto `C:\xampp`.

**Paso 3:** Una vez instalado, abrir el **Panel de Control de XAMPP**.

**Paso 4:** Hacer clic en el botón **Start** junto al módulo **MySQL**. El indicador debe cambiar a color verde mostrando que el servicio está activo.

> **[CAPTURA 1]** - Panel de Control de XAMPP mostrando el módulo MySQL en ejecución (indicador verde). Se debe ver claramente que el puerto asignado es 3306.

---

### 6.2 Creación de la Base de Datos `stream_pro`

**Paso 1:** Abrir el navegador web e ingresar a la dirección: `http://localhost/phpmyadmin`

**Paso 2:** En la interfaz de phpMyAdmin, hacer clic en la pestaña **"Nueva"** (o **"New"**) en el panel lateral izquierdo.

**Paso 3:** En el campo **"Nombre de la base de datos"**, escribir: `stream_pro`

**Paso 4:** En el campo **"Cotejamiento"**, seleccionar: `utf8mb4_general_ci`

**Paso 5:** Hacer clic en el botón **"Crear"**.

**Paso 6:** Una vez creada la base de datos, hacer clic en la pestaña **"SQL"** y ejecutar el script completo ubicado en el archivo `database/stream_pro_schema.sql` incluido en el proyecto, o ejecutar el siguiente script manualmente:

```sql
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

**Paso 7:** Verificar que las 8 tablas fueron creadas correctamente en la base de datos `stream_pro`.

> **[CAPTURA 2]** - Interfaz de phpMyAdmin mostrando la base de datos `stream_pro` seleccionada en el panel lateral.
>
> **[CAPTURA 3]** - Interfaz de phpMyAdmin mostrando las 8 tablas creadas: `administradores`, `usuarios`, `peliculas`, `series`, `temporadas`, `capitulos`, `suscripciones`, `tokens_recuperacion`.

---

### 6.3 Instalación de Node.js

**Paso 1:** Descargar el instalador de Node.js LTS desde el sitio oficial: [https://nodejs.org/es/download](https://nodejs.org/es/download)

> **Nota:** Se requiere la versión 22.x o superior para compatibilidad con las dependencias del proyecto.

**Paso 2:** Ejecutar el instalador y seguir el asistente. Aceptar los términos y continuar con la instalación por defecto.

**Paso 3:** Durante la instalación, asegurarse de que la opción **"Add to PATH"** esté marcada (viene marcada por defecto).

**Paso 4:** Una vez completada la instalación, abrir una ventana de **Símbolo del sistema (cmd)** o **PowerShell** y verificar la instalación ejecutando los siguientes comandos:

```
node -v
npm -v
```

Estos comandos deben mostrar las versiones instaladas de Node.js y NPM respectivamente.

> **[CAPTURA 4]** - Terminal (cmd o PowerShell) mostrando el resultado de `node -v` (debe mostrar v22.x.x) y `npm -v` (debe mostrar 10.x.x o superior).

---

### 6.4 Preparación del Proyecto StreamPro

**Paso 1:** Ubicar la carpeta del proyecto `StreamPro` en el sistema de archivos. La ruta del proyecto es:

```
C:\Stream\StreamPro
```

**Paso 2:** Verificar que la carpeta contiene la siguiente estructura de archivos y directorios:

```
StreamPro/
├── app.js                      (Archivo principal del servidor)
├── package.json                (Configuración del proyecto y dependencias)
├── package-lock.json           (Bloqueo de versiones de dependencias)
├── config/
│   ├── conexion.js             (Configuración de conexión a MySQL)
│   ├── correo.js               (Configuración de SMTP para emails)
│   ├── link.js                 (URL base de la aplicación)
│   └── mercadopago.js          (Configuración de MercadoPago)
├── rutas/
│   ├── index.js                (Ruta de la página principal)
│   ├── login.js                (Ruta de autenticación)
│   ├── registerUser.js         (Ruta de registro de usuarios)
│   ├── home.js                 (Rutas del dashboard y API CRUD)
│   ├── suscripcion.js          (Rutas de suscripción y pagos)
│   └── recuperarPassword.js    (Rutas de recuperación de contraseña)
├── views/
│   ├── index.ejs               (Página de aterrizaje)
│   ├── login.ejs               (Página de inicio de sesión)
│   ├── registerUser.ejs        (Página de registro)
│   ├── home.ejs                (Dashboard principal)
│   ├── suscripcion.ejs         (Página de suscripción)
│   └── recuperarPassword.ejs   (Página de recuperación de contraseña)
├── public/
│   ├── css/                    (Hojas de estilo CSS)
│   ├── js/                     (Scripts del cliente)
│   ├── img/                    (Imágenes y logos)
│   ├── portadas/               (Imágenes de portada de contenido)
│   └── video/                  (Archivos de video de películas y series)
└── node_modules/               (Dependencias instaladas)
```

> **[CAPTURA 5]** - Explorador de archivos de Windows mostrando la carpeta `C:\Stream\StreamPro` con su estructura de directorios visible (app.js, package.json, carpetas config, rutas, views, public).

---

### 6.5 Instalación de Dependencias

**Paso 1:** Abrir una ventana de **Símbolo del sistema (cmd)** o **PowerShell**.

**Paso 2:** Navegar hasta la carpeta del proyecto ejecutando el siguiente comando:

```
cd C:\Stream\StreamPro
```

**Paso 3:** Ejecutar el comando de instalación de dependencias de NPM:

```
npm install
```

Este comando leerá el archivo `package.json` y descargará todas las dependencias necesarias en la carpeta `node_modules`. Las dependencias que se instalarán incluyen:

| Dependencia | Descripción |
|---|---|
| `express@5.1.0` | Framework web para el manejo de rutas y servidor HTTP |
| `ejs@3.1.10` | Motor de plantillas para renderizar vistas HTML dinámicas |
| `mysql2@3.15.3` | Controlador de conexión a base de datos MySQL |
| `bcrypt@6.0.0` | Librería para el hash seguro de contraseñas |
| `express-session@1.18.2` | Manejo de sesiones de usuario |
| `mercadopago@2.12.0` | SDK de integración con la pasarela de pagos MercadoPago |
| `nodemailer@8.0.5` | Librería para envío de correos electrónicos vía SMTP |
| `uuid@13.0.0` | Generación de identificadores únicos para tokens |
| `cors@2.8.5` | Middleware para permitir peticiones entre dominios |

**Paso 4:** Esperar a que la instalación termine. Debe aparecer un mensaje indicando que la instalación fue exitosa y un resumen del tiempo de ejecución.

> **[CAPTURA 6]** - Terminal mostrando la ejecución de `npm install` con la barra de progreso y el mensaje final de instalación exitosa (ejemplo: "added XXX packages in XXs").

---

### 6.6 Configuración de Conexión a la Base de Datos

**Paso 1:** Abrir el archivo de configuración de conexión ubicado en:

```
C:\Stream\StreamPro\config\conexion.js
```

**Paso 2:** Verificar que los parámetros de conexión coincidan con la configuración de XAMPP. El archivo debe contener:

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

**Descripción de los parámetros:**

| Parámetro | Valor | Descripción |
|---|---|---|
| `host` | localhost | Dirección del servidor MySQL (local) |
| `user` | root | Usuario de MySQL (por defecto en XAMPP) |
| `password` | "" | Contraseña vacía (configuración por defecto de XAMPP) |
| `database` | stream_pro | Nombre de la base de datos creada en phpMyAdmin |

**Paso 3:** Si se modificó la contraseña de root en XAMPP, actualizar el campo `password` con la contraseña correspondiente.

> **[CAPTURA 7]** - Editor de código (VS Code u otro) mostrando el archivo `config/conexion.js` con los parámetros de configuración visibles.

---

### 6.7 Inicio del Servidor de Aplicaciones

**Paso 1:** En la misma terminal donde se ejecutó `npm install`, y estando ubicado en la carpeta `C:\Stream\StreamPro`, ejecutar el siguiente comando para iniciar el servidor:

```
node app.js
```

**Paso 2:** Observar la salida en la terminal. Deben aparecer dos mensajes de confirmación:

```
conexion exitosa
http://localhost:3000
```

- **`conexion exitosa`**: Indica que la conexión con la base de datos MySQL fue establecida correctamente.
- **`http://localhost:3000`**: Indica que el servidor de aplicaciones está escuchando en el puerto 3000 y está listo para recibir peticiones.

**Paso 3:** Si se desea detener el servidor, presionar `Ctrl + C` en la terminal.

> **[CAPTURA 8]** - Terminal mostrando la ejecución de `node app.js` con los mensajes "conexion exitosa" y "http://localhost:3000" visibles.

---

### 6.8 Verificación del Despliegue

#### 6.8.1 Acceso a la Página Principal

**Paso 1:** Abrir el navegador web (Chrome, Firefox o Edge).

**Paso 2:** Ingresar la siguiente dirección en la barra de direcciones:

```
http://localhost:3000
```

**Paso 3:** Verificar que se carga correctamente la página de aterrizaje (Landing Page) de StreamPro, que incluye:

- Logo de StreamPro
- Sección hero con el mensaje: "Todas las películas y series que desees, y mucho más."
- Formulario de registro con correo electrónico
- Secciones de características (compatibilidad con TV, multi-dispositivo, perfiles infantiles, descarga sin conexión)
- Sección de preguntas frecuentes (FAQ) con acordeón interactivo
- Footer con enlaces y datos de contacto

> **[CAPTURA 9]** - Navegador web mostrando la página principal de StreamPro en `http://localhost:3000` con la landing page completamente cargada.

#### 6.8.2 Acceso al Formulario de Inicio de Sesión

**Paso 1:** En el navegador, ingresar la dirección:

```
http://localhost:3000/login
```

**Paso 2:** Verificar que se carga el formulario de inicio de sesión con campos de correo electrónico y contraseña, opción de administrador, y enlaces a registro y recuperación de contraseña.

> **[CAPTURA 10]** - Navegador web mostrando la página de login de StreamPro en `http://localhost:3000/login`.

#### 6.8.3 Acceso al Formulario de Registro

**Paso 1:** En el navegador, ingresar la dirección:

```
http://localhost:3000/registerUser
```

**Paso 2:** Verificar que se carga el formulario de registro con los campos: nombre completo, nacionalidad, teléfono, correo, contraseña y confirmación de contraseña.

> **[CAPTURA 11]** - Navegador web mostrando la página de registro de StreamPro en `http://localhost:3000/registerUser`.

#### 6.8.4 Verificación de Conexión con la Base de Datos

**Paso 1:** Regresar a la terminal donde se ejecutó `node app.js`.

**Paso 2:** Verificar que el mensaje **"conexion exitosa"** aparece en la consola, confirmando que la aplicación se conectó correctamente a la base de datos `stream_pro` a través de XAMPP.

> **[CAPTURA 12]** - Terminal con el mensaje "conexion exitosa" resaltado, junto con la confirmación del servidor en `http://localhost:3000`.

---

## 7. ESTRUCTURA DE LA BASE DE DATOS

La base de datos `stream_pro` está compuesta por 8 tablas que almacenan toda la información de la plataforma:

### 7.1 Diagrama Entidad-Relación

```
administradores                 usuarios
├── cod_adm (PK)                ├── cod_user (PK)
├── nombre_adm                  ├── nombre_user
├── correo_adm                  ├── nacionalidad_user
└── passw_adm                   ├── telefono_user
                                ├── correo_user
                                ├── passw_user
                                ├── fecha_regis_user
                                └── cod_scrip_user (FK) ───┐
                                                           │
peliculas                       suscripciones ◄────────────┘
├── cod_pel (PK)                ├── cod_scrip (PK)
├── titulo_pel                  ├── cod_user (FK)
├── descrip_pel                 ├── id_mp
├── duracion_pel                ├── cod_plan_scrip
├── clasifi_pel                 ├── duracion_scrip
├── year_lanza_pel              ├── estado
├── director_pel                ├── fecha_compra_scrip
├── ruta_pel                    └── fecha_inicio
└── ruta_img_pel

series                          tokens_recuperacion
├── cod_serie (PK)              ├── id (PK)
├── titulo_serie                ├── token
├── clasifi_serie               ├── correo
├── year_lanza_serie            ├── tabla
├── creador_serie               ├── expiracion
├── ruta_img_ser                └── usado
└── descrip_serie
       │
       │ FK: cod_serie
       ▼
temporadas                      capitulos
├── cod_tem (PK)                ├── cod_cap (PK)
├── cod_serie_tem (FK)          ├── cod_tem_cap (FK)
├── titulo_tem                  ├── titulo_cap
├── year_lanza_tem              ├── duracion_cap
├── num_cap_tem                 ├── ruta_cap
└── descrip_tem                 └── descrip_cap
```

### 7.2 Descripción de Tablas

| Tabla | Registros Iniciales | Descripción |
|---|---|---|
| `administradores` | Se inserta manualmente | Credenciales de acceso del equipo administrativo |
| `usuarios` | Se crean desde el registro | Cuentas de usuarios de la plataforma |
| `peliculas` | Se gestionan desde el CRUD admin | Catálogo de películas disponibles |
| `series` | Se gestionan desde el CRUD admin | Catálogo de series disponibles |
| `temporadas` | Se gestionan desde el CRUD admin | Temporadas asociadas a cada serie |
| `capitulos` | Se gestionan desde el CRUD admin | Episodios asociados a cada temporada |
| `suscripciones` | Se crean al pagar con MercadoPago | Registro de suscripciones premium activas |
| `tokens_recuperacion` | Se crean automáticamente | Tokens temporales para recuperación de contraseñas |

> **[CAPTURA 13]** - phpMyAdmin mostrando la estructura completa de la base de datos `stream_pro` con las 8 tablas y sus relaciones.

---

## 8. ENDPOINTS Y FUNCIONALIDADES

La aplicación StreamPro expone los siguientes endpoints una vez desplegada:

### 8.1 Páginas Web (GET)

| Ruta | Descripción |
|---|---|
| `/` | Página de aterrizaje (Landing Page) |
| `/login` | Formulario de inicio de sesión |
| `/registerUser` | Formulario de registro de usuarios |
| `/home` | Dashboard principal (requiere autenticación) |
| `/suscripcion` | Página de plan premium |
| `/recuperarPassword` | Formulario de recuperación de contraseña |

### 8.2 API de Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/login` | Autenticar usuario o administrador |
| POST | `/registerUser` | Registrar nuevo usuario |

### 8.3 API de Películas (CRUD)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/peliculas` | Obtener todas las películas |
| POST | `/api/agregar-pelicula` | Crear nueva película |
| GET | `/api/pelicula/:id` | Obtener película por ID |
| PUT | `/api/actualizar-pelicula/:title` | Actualizar película por título |
| DELETE | `/api/eliminar-pelicula/:id` | Eliminar película por ID |
| GET | `/api/buscar-pelicula` | Buscar películas por título/descripción |
| GET | `/api/buscar-pelicula-titulo` | Verificar existencia de película por título exacto |

### 8.4 API de Series (CRUD)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/series` | Obtener todas las series |
| POST | `/api/agregar-serie` | Crear nueva serie |
| GET | `/api/serie/:id` | Obtener serie por ID |
| PUT | `/api/actualizar-serie/:id` | Actualizar serie por ID |
| DELETE | `/api/eliminar-serie/:id` | Eliminar serie (en cascada) |
| GET | `/api/buscar-serie-titulo` | Verificar existencia de serie por título exacto |

### 8.5 API de Temporadas (CRUD)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/serie/:serieId/temporadas` | Obtener temporadas de una serie |
| POST | `/api/serie/:serieId/agregar-temporada` | Crear nueva temporada |
| GET | `/api/temporada/:id` | Obtener temporada por ID |
| PUT | `/api/actualizar-temporada/:id` | Actualizar temporada |
| DELETE | `/api/eliminar-temporada/:id` | Eliminar temporada (en cascada) |

### 8.6 API de Capítulos (CRUD)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/temporada/:temporadaId/capitulos` | Obtener capítulos de una temporada |
| POST | `/api/temporada/:temporadaId/agregar-capitulo` | Crear nuevo capítulo |
| GET | `/api/capitulo/:id` | Obtener capítulo por ID |
| PUT | `/api/actualizar-capitulo/:title` | Actualizar capítulo por título |
| DELETE | `/api/eliminar-capitulo/:id` | Eliminar capítulo |

### 8.7 API de Suscripciones y Pagos

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/crear-suscripcion` | Crear preferencia de pago en MercadoPago |
| POST | `/webhook` | Webhook de notificación de pago (MercadoPago) |
| GET | `/suscripcion-exitosa` | Página de confirmación de pago exitoso |
| GET | `/suscripcion-pendiente` | Página de pago pendiente |
| GET | `/suscripcion-fallida` | Página de pago fallido |
| GET | `/verificar-suscripcion` | Verificar si el usuario tiene suscripción activa |

### 8.8 API de Recuperación de Contraseña

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/enviar-token` | Generar y enviar token de recuperación por email |
| POST | `/verificar-token` | Validar token de recuperación |
| POST | `/cambiar-password` | Restablecer contraseña con token válido |

---

## 9. CONCLUSIONES

El despliegue local de la aplicación StreamPro se realizó exitosamente utilizando una arquitectura compuesta por **Node.js + Express** como servidor de aplicaciones y **MySQL gestionado a través de XAMPP** como sistema de base de datos.

Durante el proceso de instalación se evidenció que:

1. **XAMPP** facilita la gestión de MySQL en entornos Windows, proporcionando una instalación sencilla y una interfaz gráfica (phpMyAdmin) para la administración de bases de datos.
2. **Node.js y Express** constituyen una plataforma de desarrollo e implantación moderna y eficiente, especialmente para aplicaciones web basadas en JavaScript.
3. La combinación de estas tecnologías permite un despliegue rápido y funcional que cumple con los requisitos no funcionales de rendimiento, escalabilidad y mantenibilidad.
4. La aplicación StreamPro cuenta con una arquitectura bien estructurada que separa las responsabilidades en capas: rutas (controladores), vistas (presentación), configuración y archivos estáticos (recursos).
5. El proceso de instalación documentado en este informe puede replicarse en cualquier equipo con Windows que cumpla con los requisitos mínimos de hardware y software especificados.

---

## 10. REFERENCIAS

1. **Node.js Foundation.** (2026). *Node.js Official Documentation*. Recuperado de: https://nodejs.org/es/docs/

2. **Express.js.** (2026). *Express - Fast, unopinionated, minimalist web framework for Node.js*. Recuperado de: https://expressjs.com/

3. **Apache Friends.** (2026). *XAMPP - The most popular PHP development environment*. Recuperado de: https://www.apachefriends.org/es/

4. **EJS - Embedded JavaScript templates.** (2026). *EJS Documentation*. Recuperado de: https://ejs.co/

5. **MySQL.** (2026). *MySQL 8.0 Reference Manual*. Recuperado de: https://dev.mysql.com/doc/

6. **Mercado Pago Developers.** (2026). *Documentación de integración de pagos*. Recuperado de: https://www.mercadopago.com.co/developers

7. **Nodemailer.** (2026). *Send e-mails with Node.js*. Recuperado de: https://nodemailer.com/

8. **bcrypt.** (2026). *bcrypt - A library to help you hash passwords*. Recuperado de: https://www.npmjs.com/package/bcrypt

9. **SENA.** (2026). *Material de formación: Identificación de requerimientos*. Servicio Nacional de Aprendizaje.

10. **Dev.to.** (2026). *Free HTML Landing Page Templates*. Recuperado de: https://dev.to/davidepacilio/40-free-html-landing-page-templates-3gfp

---

## ANEXO: LISTA DE CAPTURAS DE PANTALLA REQUERIDAS

| # | Descripción | Sección |
|---|---|---|
| **Captura 1** | Panel de Control de XAMPP con MySQL en ejecución (indicador verde, puerto 3306) | 6.1 |
| **Captura 2** | phpMyAdmin con la base de datos `stream_pro` seleccionada en el panel lateral | 6.2 |
| **Captura 3** | phpMyAdmin mostrando las 8 tablas creadas en `stream_pro` | 6.2 |
| **Captura 4** | Terminal con los comandos `node -v` y `npm -v` mostrando las versiones instaladas | 6.3 |
| **Captura 5** | Explorador de Windows mostrando la estructura de carpetas del proyecto `C:\Stream\StreamPro` | 6.4 |
| **Captura 6** | Terminal mostrando la ejecución de `npm install` con resultado exitoso | 6.5 |
| **Captura 7** | Editor de código mostrando el archivo `config/conexion.js` con los parámetros de conexión | 6.6 |
| **Captura 8** | Terminal mostrando `node app.js` con los mensajes "conexion exitosa" y "http://localhost:3000" | 6.7 |
| **Captura 9** | Navegador en `http://localhost:3000` mostrando la Landing Page de StreamPro | 6.8.1 |
| **Captura 10** | Navegador en `http://localhost:3000/login` mostrando el formulario de inicio de sesión | 6.8.2 |
| **Captura 11** | Navegador en `http://localhost:3000/registerUser` mostrando el formulario de registro | 6.8.3 |
| **Captura 12** | Terminal con "conexion exitosa" resaltado confirmando conexión a BD | 6.8.4 |
| **Captura 13** | phpMyAdmin con estructura completa de las 8 tablas de `stream_pro` | 7.2 |

---

**Fin del documento.**
