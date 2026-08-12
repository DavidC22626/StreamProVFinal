# FORMATO DE REGISTRO DE NO CONFORMIDAD DE SOFTWARE

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

---

## NC-001: Credenciales SMTP hardcodeadas

### 1. IDENTIFICACIÓN DE LA NO CONFORMIDAD

| Campo | Dato |
|---|---|
| Número de NC | NC-001 |
| Fecha de detección | 02/06/2026 |
| Detectado por | David Caicedo |
| Módulo / Componente afectado | `config/correo.js` — Configuración de Nodemailer |
| Fuente de detección | Revisión de código |
| Severidad | Crítica |

### 2. DESCRIPCIÓN DE LA NO CONFORMIDAD

**¿Qué ocurrió?**
Se encontró que la contraseña de la aplicación SMTP de Gmail está escrita en texto plano en el archivo `config/correo.js`, línea 12. Cualquier persona con acceso al repositorio puede ver y usar esta credencial para acceder a la cuenta de correo.

**¿Dónde ocurrió?**
`C:\Stream\StreamPro\config\correo.js`, línea 12:
```
pass: "ohwvjnezdnaiqkth"
```

**¿Cuándo ocurrió?**
02/06/2026, durante la revisión de calidad del código fuente.

**Evidencia del hallazgo:**
```javascript
// config/correo.js — Líneas 10-13
auth: {
    user: "luisdavid2017100@gmail.com",
    pass: "ohwvjnezdnaiqkth"    // <-- Credencial en texto plano
}
```

### 3. ANÁLISIS DE CAUSA RAÍZ

**Causa inmediata:**
El desarrollador escribió la credencial directamente en el código para facilitar las pruebas locales.

**Causa raíz:**
Falta de conocimiento o aplicación de buenas prácticas de seguridad para el manejo de credenciales (variables de entorno, archivos `.env`).

**Tipo de causa:**
Técnica / De proceso

### 4. CLASIFICACIÓN

| Criterio | Selección |
|---|---|
| **Tipo de no conformidad** | De seguridad |
| **¿Afecta a producción?** | Sí |
| **¿Tiene impacto en datos?** | Sí (posible acceso no autorizado al correo) |
| **¿Es recurrente?** | Sí (aplica también para token de MercadoPago) |

### 5. ACCIONES INMEDIATAS

| Acción | Responsable | Fecha límite | Estado |
|---|---|---|---|
| Mover la contraseña SMTP a variable de entorno `process.env.SMTP_PASS` | David Caicedo | 03/06/2026 | Completada |
| Agregar archivo `.env` al `.gitignore` | David Caicedo | 03/06/2026 | Completada |

### 6. ACCIÓN CORRECTIVA

**Descripción de la acción:**
Implementar el uso de variables de entorno para todas las credenciales del proyecto. Crear un archivo `.env.example` con las variables necesarias y documentar su configuración en el manual técnico.

**Responsable:** David Caicedo

**Fecha estimada de implementación:** 05/06/2026

**Verificación de eficacia:**

| Criterio | Fecha de verificación | Resultado |
|---|---|---|
| ¿Se corrigió la no conformidad? | 03/06/2026 | Sí |
| ¿Se eliminó la causa raíz? | 03/06/2026 | Sí |
| ¿Se previene recurrencia? | 03/06/2026 | Sí (`.gitignore` evita commits de `.env`) |

### 7. CIERRE

| Fecha de cierre | Aprobado por | Firma |
|---|---|---|
| 03/06/2026 | David Caicedo | |

---

## NC-002: Token de MercadoPago hardcodeado

### 1. IDENTIFICACIÓN DE LA NO CONFORMIDAD

| Campo | Dato |
|---|---|
| Número de NC | NC-002 |
| Fecha de detección | 02/06/2026 |
| Detectado por | David Caicedo |
| Módulo / Componente afectado | `config/mercadopago.js` — Configuración del SDK de pagos |
| Fuente de detección | Revisión de código |
| Severidad | Crítica |

### 2. DESCRIPCIÓN DE LA NO CONFORMIDAD

**¿Qué ocurrió?**
El access token de MercadoPago (entorno de pruebas) está hardcodeado en el código fuente. Este token permite procesar pagos y cualquier persona con acceso al código podría usarlo indebidamente.

**¿Dónde ocurrió?**
`C:\Stream\StreamPro\config\mercadopago.js`, línea 4:
```
accessToken: "TEST-5293579902493820-041801-cd678a383b83c97cb1b18c31c4c555ea-443721841"
```

**¿Cuándo ocurrió?**
02/06/2026.

**Evidencia del hallazgo:**
```javascript
// config/mercadopago.js
const client = new MercadoPagoConfig({
    accessToken: "TEST-5293579902493820-..."  // Token visible en código
});
```

### 3. ANÁLISIS DE CAUSA RAÍZ

**Causa inmediata:**
El token se colocó directamente en el código para facilitar la configuración inicial.

**Causa raíz:**
No se implementó un sistema de gestión de configuraciones sensibles desde el inicio del proyecto.

**Tipo de causa:**
Técnica / De proceso

### 4. CLASIFICACIÓN

| Criterio | Selección |
|---|---|
| **Tipo de no conformidad** | De seguridad |
| **¿Afecta a producción?** | Sí |
| **¿Tiene impacto en datos?** | Sí (posible uso fraudulento del token) |
| **¿Es recurrente?** | Sí (mismo patrón que NC-001) |

### 5. ACCIONES INMEDIATAS

| Acción | Responsable | Fecha límite | Estado |
|---|---|---|---|
| Mover token a variable de entorno `process.env.MERCADOPAGO_TOKEN` | David Caicedo | 03/06/2026 | Completada |

### 6. ACCIÓN CORRECTIVA

**Descripción de la acción:**
Centralizar todas las configuraciones sensibles en variables de entorno. Documentar en el README del proyecto las variables requeridas para el funcionamiento.

**Responsable:** David Caicedo

**Fecha estimada de implementación:** 05/06/2026

**Verificación de eficacia:**

| Criterio | Fecha de verificación | Resultado |
|---|---|---|
| ¿Se corrigió la no conformidad? | 03/06/2026 | Sí |
| ¿Se eliminó la causa raíz? | 03/06/2026 | Sí |
| ¿Se previene recurrencia? | 03/06/2026 | Sí |

### 7. CIERRE

| Fecha de cierre | Aprobado por | Firma |
|---|---|---|
| 03/06/2026 | David Caicedo | |

---

## NC-003: Conexión MySQL sin contraseña

### 1. IDENTIFICACIÓN DE LA NO CONFORMIDAD

| Campo | Dato |
|---|---|
| Número de NC | NC-003 |
| Fecha de detección | 02/06/2026 |
| Detectado por | David Caicedo |
| Módulo / Componente afectado | `config/conexion.js` — Conexión a base de datos MySQL |
| Fuente de detección | Revisión de código |
| Severidad | Alta |

### 2. DESCRIPCIÓN DE LA NO CONFORMIDAD

**¿Qué ocurrió?**
La configuración de conexión a MySQL usa `password: ""` (vacío), lo que significa que la base de datos se accede sin autenticación. En un entorno de producción esto representa un riesgo de seguridad crítico.

**¿Dónde ocurrió?**
`C:\Stream\StreamPro\config\conexion.js`, línea 5-9:
```javascript
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",        // <-- Sin contraseña
    database: "stream_pro"
});
```

**¿Cuándo ocurrió?**
02/06/2026.

**Evidencia del hallazgo:**
Ver líneas 5-9 de `config/conexion.js`.

### 3. ANÁLISIS DE CAUSA RAÍZ

**Causa inmediata:**
XAMPP configura MySQL sin contraseña por defecto para entornos de desarrollo local.

**Causa raíz:**
El archivo de configuración no diferencia entre entorno local y producción. Las credenciales de BD deberían ser configurables.

**Tipo de causa:**
De proceso

### 4. CLASIFICACIÓN

| Criterio | Selección |
|---|---|
| **Tipo de no conformidad** | De seguridad |
| **¿Afecta a producción?** | Sí |
| **¿Tiene impacto en datos?** | Sí (acceso no autorizado a la BD) |
| **¿Es recurrente?** | No |

### 5. ACCIONES INMEDIATAS

| Acción | Responsable | Fecha límite | Estado |
|---|---|---|---|
| Hacer la contraseña configurable vía `process.env.DB_PASSWORD` | David Caicedo | 03/06/2026 | Completada |
| Establecer contraseña en entorno de producción | David Caicedo | Al momento del despliegue | Pendiente |

### 6. ACCIÓN CORRECTIVA

**Descripción de la acción:**
Parametrizar todos los valores de conexión a BD (host, user, password, database, port) mediante variables de entorno.

**Responsable:** David Caicedo

**Fecha estimada de implementación:** 05/06/2026

**Verificación de eficacia:**

| Criterio | Fecha de verificación | Resultado |
|---|---|---|
| ¿Se corrigió la no conformidad? | 03/06/2026 | Sí |
| ¿Se eliminó la causa raíz? | 03/06/2026 | Sí |
| ¿Se previene recurrencia? | 03/06/2026 | Sí |

### 7. CIERRE

| Fecha de cierre | Aprobado por | Firma |
|---|---|---|
| 03/06/2026 | David Caicedo | |

---

## NC-004: Ruta /home sin verificación de sesión

### 1. IDENTIFICACIÓN DE LA NO CONFORMIDAD

| Campo | Dato |
|---|---|
| Número de NC | NC-004 |
| Fecha de detección | 02/06/2026 |
| Detectado por | David Caicedo |
| Módulo / Componente afectado | `app.js` línea 39-41 — Ruta GET /home |
| Fuente de detección | Revisión de código |
| Severidad | Alta |

### 2. DESCRIPCIÓN DE LA NO CONFORMIDAD

**¿Qué ocurrió?**
La ruta GET `/home` en `app.js` renderiza el dashboard sin verificar si el usuario tiene una sesión activa. Esto permite que cualquier persona acceda al dashboard sin autenticarse.

**¿Dónde ocurrió?**
`app.js`, líneas 39-41:
```javascript
app.get('/home', function(req, res){
    res.render('home');   // <-- Sin verificación de sesión
});
```

**Evidencia del hallazgo:**
Ver `app.js` líneas 39-41. No hay condición `if (req.session.login)`.

### 3. ANÁLISIS DE CAUSA RAÍZ

**Causa inmediata:**
Se omitió la validación de sesión al definir la ruta GET directa.

**Causa raíz:**
No se estableció un middleware de autenticación global para las rutas protegidas.

**Tipo de causa:**
De proceso

### 4. ACCIONES INMEDIATAS

| Acción | Responsable | Fecha límite | Estado |
|---|---|---|---|
| Agregar validación `if (!req.session.login) { return res.redirect('/login'); }` | David Caicedo | 03/06/2026 | Completada |

### 5. ACCIÓN CORRECTIVA

**Descripción de la acción:**
Implementar un middleware de autenticación reutilizable para todas las rutas protegidas.

**Responsable:** David Caicedo

**Verificación de eficacia:**

| Criterio | Fecha de verificación | Resultado |
|---|---|---|
| ¿Se corrigió la no conformidad? | 03/06/2026 | Sí |

### 6. CIERRE

| Fecha de cierre | Aprobado por | Firma |
|---|---|---|
| 03/06/2026 | David Caicedo | |

---

## NC-005: Secret de sesión débil

### 1. IDENTIFICACIÓN DE LA NO CONFORMIDAD

| Campo | Dato |
|---|---|
| Número de NC | NC-005 |
| Fecha de detección | 02/06/2026 |
| Detectado por | David Caicedo |
| Módulo / Componente afectado | `app.js` línea 17 — Configuración de express-session |
| Fuente de detección | Revisión de código |
| Severidad | Media |

### 2. DESCRIPCIÓN DE LA NO CONFORMIDAD

**¿Qué ocurrió?**
El secret de sesión está configurado como `"acceso_app"`, un valor predecible y sin suficiente entropía. Un atacante podría falsificar cookies de sesión.

**¿Dónde ocurrió?**
`app.js`, línea 17: `secret: "acceso_app"`

**Evidencia del hallazgo:**
```javascript
app.use(session({
    secret: "acceso_app",    // Secret débil y predecible
    resave: false,
    saveUninitialized: false
}));
```

### 3. ANÁLISIS DE CAUSA RAÍZ

**Causa inmediata:**
Se usó un valor literal para facilitar la configuración inicial.

**Causa raíz:**
Desconocimiento de las implicaciones de seguridad de un secret de sesión débil.

**Tipo de causa:**
Técnica

### 4. ACCIONES INMEDIATAS

| Acción | Responsable | Fecha límite | Estado |
|---|---|---|---|
| Cambiar a `process.env.SESSION_SECRET \|\| crypto.randomBytes(32).toString('hex')` | David Caicedo | 03/06/2026 | Completada |

### 5. CIERRE

| Fecha de cierre | Aprobado por | Firma |
|---|---|---|
| 03/06/2026 | David Caicedo | |

---

*Formato basado en GFPI-F-135 V02 — Proceso de Gestión de Formación Profesional Integral SENA*
