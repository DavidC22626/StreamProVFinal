# GUION CORTO — INSTRUMENTOS DE CALIDAD DE SOFTWARE (3 MIN)

**Evidencia:** GA11-220501098-AA1-EV01

---

### Toma 1 — Introducción (20 seg)

**[Cámara: plano medio, fondo SENA o escritorio. Tono directo.]**

"Hola, soy [tu nombre], aprendiz de Análisis y Desarrollo de Software del SENA. En este video te explico cómo diligenciar los cuatro instrumentos para documentar procesos de calidad de software, aplicados a nuestro proyecto StreamPro."

---

### Toma 2 — Los 4 instrumentos (40 seg)

**[Pantalla: mostrar los 4 archivos abiertos en el editor]**

"Son cuatro formatos, todos basados en el GFPI-F-135 V02:

**F01 — Lista de Verificación:** 25 ítems que revisan código, funcionalidad, seguridad e interfaz. Se marca S, N o N/A y al final se saca el porcentaje de cumplimiento. El nuestro dio 72%.

**F02 — Pruebas Funcionales:** 9 casos de prueba con pasos, resultado esperado y resultado obtenido. Todos los nuestros fueron exitosos, 100%.

**F03 — No Conformidad:** Registra hallazgos que no cumplen. Incluye causa raíz, acciones correctivas y verificación de eficacia. Documentamos 5.

**F04 — Matriz de Trazabilidad:** Cruza los 28 requisitos del sistema contra los componentes donde se implementaron. Nuestro cumplimiento es del 96%."

---

### Toma 3 — Cómo se diligencia cada uno (1 min)

**[Pantalla: mostrar el F01 diligenciado, señalando partes específicas]**

"Para el **F01**: completa la identificación, revisa cada ítem contra el código real, marca con X, y en observaciones anota el archivo y línea exacta. Por ejemplo: en 'credenciales hardcodeadas' marcamos N y anotamos `config/correo.js línea 12`."

**[Cambiar a F02 diligenciado]**

"Para el **F02**: cada caso prueba una funcionalidad concreta. Ejecutas los pasos, escribes qué pasó realmente y marcas si fue exitosa o fallida. Todas nuestras pruebas pasaron."

**[Cambiar a F03 diligenciado]**

"Para el **F03**: describe el problema, haz análisis de causa raíz preguntando '¿por qué?' varias veces, define acciones inmediatas y correctivas, y al final verifica que la corrección funcionó."

**[Cambiar a F04 diligenciado]**

"Para el **F04**: revisa cada requisito en el código, marca S-N-P según su estado, y anota qué prueba lo confirma."

---

### Toma 4 — Hallazgos principales (30 seg)

**[Pantalla: lista de hallazgos o tabla]**

"¿Qué encontramos en StreamPro? Diez hallazgos: credenciales SMTP y de MercadoPago hardcodeadas, conexión MySQL sin contraseña, rutas sin validación de sesión, secret de sesión débil, entre otros. En seguridad solo cumplíamos al 40%. El resto de hallazgos los documentamos en los formatos de no conformidad."

---

### Toma 5 — Cierre (30 seg)

**[Cámara: plano medio otra vez]**

"En resumen: estos cuatro instrumentos permiten documentar la calidad de forma organizada. La lista de verificación te da el panorama general, las pruebas funcionales validan que todo opere, las no conformidades registran los problemas con su solución, y la matriz de trazabilidad asegura que ningún requisito quede sin implementar.

Mi nombre es [tu nombre], evidencia GA11-220501098-AA1-EV01. Gracias."

---

**Duración total aproximada:** 3 minutos

**Checklist rápido:**
- [ ] Mostrar logo SENA al inicio
- [ ] Mostrar cada formato diligenciado (F01 a F04)
- [ ] Mencionar código de evidencia
- [ ] Cerrar con datos del programa
