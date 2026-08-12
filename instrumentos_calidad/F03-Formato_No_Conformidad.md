# FORMATO DE REGISTRO DE NO CONFORMIDAD DE SOFTWARE

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Programa:** Análisis y Desarrollo de Software

**Proyecto:** StreamPro — Plataforma de Streaming

**Versión:** 1.0.0

---

## 1. IDENTIFICACIÓN DE LA NO CONFORMIDAD

| Campo | Dato |
|---|---|
| Número de NC | NC- |
| Fecha de detección | |
| Detectado por | |
| Módulo / Componente afectado | |
| Fuente de detección | Auditoría / Prueba funcional / Revisión de código / Incidente de usuario / Mantenimiento |
| Severidad | Crítica / Alta / Media / Baja |

---

## 2. INSTRUCCIONES DE DILIGENCIAMIENTO

- **Severidad Crítica:** El error impide el funcionamiento del sistema o causa pérdida de datos
- **Severidad Alta:** La funcionalidad principal se ve afectada sin solución alternativa
- **Severidad Media:** La funcionalidad se ve afectada pero existe solución alternativa
- **Severidad Baja:** Error cosmético o de mejora que no afecta la operación

Describa de forma clara y objetiva el hallazgo, incluyendo evidencia cuando sea posible.

---

## 3. DESCRIPCIÓN DE LA NO CONFORMIDAD

**¿Qué ocurrió?**

[Describa el comportamiento observado que no cumple con lo esperado]

**¿Dónde ocurrió?**

[Especifique el módulo, pantalla, ruta o función donde se presentó]

**¿Cuándo ocurrió?**

[Indique fecha, hora y bajo qué condiciones]

**Evidencia del hallazgo:**

[Captura de pantalla, fragmento de código, logs de error, etc.]

---

## 4. ANÁLISIS DE CAUSA RAÍZ

**Causa inmediata:**

[¿Qué lo originó directamente?]

**Causa raíz:**

[¿Cuál es el problema de fondo? Ej: falta de validación, error de lógica, configuración incorrecta]

**Tipo de causa:**

Humana / Técnica / De proceso / De entorno

---

## 5. CLASIFICACIÓN

| Criterio | Selección |
|---|---|
| **Tipo de no conformidad** | De código / De funcionalidad / De seguridad / De rendimiento / De interfaz / De documentación |
| **¿Afecta a producción?** | Sí / No |
| **¿Tiene impacto en datos?** | Sí / No |
| **¿Es recurrente?** | Sí / No |

---

## 6. ACCIONES INMEDIATAS

| Acción | Responsable | Fecha límite | Estado |
|---|---|---|---|
| | | | Pendiente / En proceso / Completada |
| | | | Pendiente / En proceso / Completada |
| | | | Pendiente / En proceso / Completada |

---

## 7. ACCIÓN CORRECTIVA (para eliminar la causa raíz)

**Descripción de la acción:**

**Responsable:**

**Fecha estimada de implementación:**

**Verificación de eficacia:**

| Criterio | Fecha de verificación | Resultado |
|---|---|---|
| ¿Se corrigió la no conformidad? | | Sí / No |
| ¿Se eliminó la causa raíz? | | Sí / No |
| ¿Se previene recurrencia? | | Sí / No |

---

## 8. CIERRE

| Fecha de cierre | Aprobado por | Firma |
|---|---|---|
| | | |

---

## 9. EJEMPLO DILIGENCIADO (Referencia)

| Campo | Ejemplo |
|---|---|
| **NC N°** | NC-001 |
| **Fecha** | 02/06/2026 |
| **Detectado por** | David Caicedo |
| **Módulo** | Recuperación de contraseña |
| **Severidad** | Alta |
| **Descripción** | Al solicitar la recuperación de contraseña, el correo con el token no llega al usuario. Se verificó la configuración SMTP y la conexión con Gmail. El error ocurre porque la contraseña de aplicación de Gmail expiró. |
| **Causa raíz** | La contraseña de aplicación de Gmail en `config/correo.js` no se actualiza periódicamente |
| **Acción inmediata** | Generar nueva contraseña de aplicación en Gmail y actualizar `config/correo.js` |
| **Acción correctiva** | Implementar un recordatorio trimestral en el plan de mantenimiento para renovar credenciales SMTP |

---

*Formato basado en GFPI-F-135 V02 — Proceso de Gestión de Formación Profesional Integral SENA*
