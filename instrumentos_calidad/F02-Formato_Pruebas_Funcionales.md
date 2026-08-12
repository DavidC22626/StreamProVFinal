# FORMATO DE PRUEBAS FUNCIONALES DE SOFTWARE

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

**Versión:** 1.0.0

---

## 1. IDENTIFICACIÓN

| Campo | Dato |
|---|---|
| Nombre del evaluador | |
| Fecha de la prueba | |
| Módulo / Funcionalidad evaluada | |
| Ambiente de pruebas | Local / Producción (Render) |
| Versión del software | 1.0.0 |

---

## 2. INSTRUCCIONES DE DILIGENCIAMIENTO

1. **ID del caso:** Use el formato CP-XXX (Caso de Prueba 001, 002, etc.)
2. **Descripción:** Describa brevemente qué funcionalidad se va a probar
3. **Precondiciones:** Indique qué debe estar configurado antes de ejecutar la prueba
4. **Datos de entrada:** Especifique los valores o datos que se utilizarán
5. **Pasos:** Enumere en orden los pasos para ejecutar la prueba
6. **Resultado esperado:** Describa qué debería ocurrir si todo funciona correctamente
7. **Resultado obtenido:** Describa qué ocurrió realmente al ejecutar la prueba
8. **Estado:** Marque **Exitosa** si coincide con lo esperado, **Fallida** si no

---

## 3. CASOS DE PRUEBA

### 3.1 Módulo: Autenticación

| | |
|---|---|
| **ID del caso** | CP-001 |
| **Descripción** | Registro de nuevo usuario |
| **Precondiciones** | Base de datos MySQL activa, servidor Node.js corriendo en puerto 3000 |
| **Datos de entrada** | Nombre: "Carlos Pérez", Nacionalidad: "Colombiana", Teléfono: "3001234567", Email: "carlos@email.com", Contraseña: "Pass1234", Confirmar: "Pass1234" |
| **Pasos** | 1. Navegar a http://localhost:3000/registerUser |
| | 2. Completar todos los campos del formulario |
| | 3. Hacer clic en "Registrarse" |
| | 4. Verificar redirección a la página de login |
| **Resultado esperado** | El usuario se crea en la tabla `usuarios`, la contraseña se almacena con hash bcrypt, se redirige al login |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | [Captura de pantalla o referencia] |

---

| | |
|---|---|
| **ID del caso** | CP-002 |
| **Descripción** | Inicio de sesión como usuario registrado |
| **Precondiciones** | Usuario previamente registrado en la base de datos |
| **Datos de entrada** | Email: "carlos@email.com", Contraseña: "Pass1234" |
| **Pasos** | 1. Navegar a http://localhost:3000/login |
| | 2. Ingresar credenciales |
| | 3. Hacer clic en "Iniciar sesión" |
| | 4. Verificar redirección al dashboard (home) |
| **Resultado esperado** | El usuario ingresa al dashboard, la sesión se almacena con `req.session`, se muestra el catálogo |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | |

---

| | |
|---|---|
| **ID del caso** | CP-003 |
| **Descripción** | Inicio de sesión con credenciales inválidas |
| **Precondiciones** | Ninguna |
| **Datos de entrada** | Email: "invalido@email.com", Contraseña: "WrongPass1" |
| **Pasos** | 1. Navegar a http://localhost:3000/login |
| | 2. Ingresar credenciales incorrectas |
| | 3. Hacer clic en "Iniciar sesión" |
| **Resultado esperado** | El sistema muestra mensaje de error "Credenciales inválidas", no se crea sesión |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | |

---

### 3.2 Módulo: Catálogo y Reproducción

| | |
|---|---|
| **ID del caso** | CP-004 |
| **Descripción** | Visualización del catálogo de películas |
| **Precondiciones** | Sesión de usuario activa, tabla `peliculas` con al menos 3 registros |
| **Datos de entrada** | N/A |
| **Pasos** | 1. Iniciar sesión como usuario |
| | 2. Navegar a la sección de películas en el dashboard |
| | 3. Verificar que se muestran las tarjetas de películas con portada, título y descripción |
| **Resultado esperado** | El catálogo carga correctamente mostrando todas las películas disponibles en la base de datos |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | |

---

| | |
|---|---|
| **ID del caso** | CP-005 |
| **Descripción** | Reproducción de video de una película |
| **Precondiciones** | Sesión activa, archivo de video MP4 disponible en `/public/video/` |
| **Datos de entrada** | ID de película existente |
| **Pasos** | 1. Hacer clic en una tarjeta de película |
| | 2. Esperar que cargue el reproductor de video |
| | 3. Hacer clic en reproducir |
| | 4. Verificar que el video se reproduce con audio |
| **Resultado esperado** | El reproductor HTML5 carga el video, los controles (play, pausa, volumen) funcionan |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | |

---

### 3.3 Módulo: Administración (CRUD)

| | |
|---|---|
| **ID del caso** | CP-006 |
| **Descripción** | Agregar una nueva película desde el panel de administración |
| **Precondiciones** | Sesión de administrador activa |
| **Datos de entrada** | Título: "Nueva Película Test", Descripción: "Prueba CRUD", URL video: "/video/test.mp4", URL portada: "/portadas/test.jpg", Género: "Acción", Año: 2026 |
| **Pasos** | 1. Iniciar sesión como administrador |
| | 2. Abrir el modal de agregar película |
| | 3. Completar todos los campos del formulario |
| | 4. Guardar los cambios |
| | 5. Verificar que la nueva película aparece en el catálogo |
| **Resultado esperado** | La película se inserta en la tabla `peliculas` y se muestra en el catálogo sin recargar la página |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | |

---

| | |
|---|---|
| **ID del caso** | CP-007 |
| **Descripción** | Editar una película existente |
| **Precondiciones** | Sesión de administrador activa, película existente en BD |
| **Datos de entrada** | Cambiar título a "Título Editado Test" |
| **Pasos** | 1. Hacer clic en editar sobre una película |
| | 2. Modificar el campo título |
| | 3. Guardar cambios |
| | 4. Verificar que el título se actualizó en el catálogo |
| **Resultado esperado** | La película se actualiza en la BD y el cambio se refleja en la interfaz |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | |

---

### 3.4 Módulo: Suscripción y Pagos

| | |
|---|---|
| **ID del caso** | CP-008 |
| **Descripción** | Proceso de suscripción con MercadoPago |
| **Precondiciones** | Sesión de usuario activa, credenciales de prueba de MercadoPago configuradas |
| **Datos de entrada** | Seleccionar plan premium ($13.000 COP/mes) |
| **Pasos** | 1. Navegar a la página de suscripción |
| | 2. Hacer clic en "Suscribirse" |
| | 3. Ser redirigido al checkout de MercadoPago |
| | 4. Completar pago con tarjeta de prueba |
| | 5. Verificar redirección de vuelta a la plataforma |
| **Resultado esperado** | La suscripción se registra en la tabla `suscripciones`, el usuario obtiene acceso premium |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | |

---

### 3.5 Módulo: Recuperación de Contraseña

| | |
|---|---|
| **ID del caso** | CP-009 |
| **Descripción** | Solicitud de recuperación de contraseña |
| **Precondiciones** | Usuario registrado con correo válido, configuración SMTP de Gmail activa |
| **Datos de entrada** | Email registrado |
| **Pasos** | 1. Navegar a http://localhost:3000/recuperarPassword |
| | 2. Ingresar el correo electrónico |
| | 3. Hacer clic en "Enviar token" |
| | 4. Revisar la bandeja de entrada del correo |
| **Resultado esperado** | Se genera un token UUID, se almacena en `tokens_recuperacion` con expiración de 15 min, se envía correo con Nodemailer |
| **Resultado obtenido** | |
| **Estado** | Exitosa / Fallida |
| **Evidencia** | |

---

## 4. RESUMEN DE RESULTADOS

| Indicador | Valor |
|---|---|
| Total de casos ejecutados | |
| Casos exitosos | |
| Casos fallidos | |
| Porcentaje de éxito | |

---

## 5. OBSERVACIONES Y RECOMENDACIONES

[Registre aquí hallazgos importantes, errores encontrados, sugerencias de mejora]

---

## 6. FIRMAS

| Rol | Nombre | Firma |
|---|---|---|
| Elaboró | | |
| Revisó | | |
| Aprobó | | |

---

*Formato basado en GFPI-F-135 V02 — Proceso de Gestión de Formación Profesional Integral SENA*
