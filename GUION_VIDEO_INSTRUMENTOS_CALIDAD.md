# GUION DE VIDEO — DILIGENCIAMIENTO DE INSTRUMENTOS PARA DOCUMENTAR PROCESOS DE CALIDAD DE SOFTWARE

**Evidencia:** GA11-220501098-AA1-EV01 — Diseño y diligenciamiento de instrumentos para documentar procesos de calidad del software

**Duración estimada:** 7-8 minutos

**Formato:** Video explicativo con capturas de pantalla del proyecto StreamPro

---

## INSTRUCCIONES PARA LA GRABACIÓN

- Use un tono **claro, pausado y didáctico**
- Muestre los formatos en pantalla mientras los explica
- Tenga los archivos abiertos para mostrar el diligenciamiento en tiempo real
- Incluya capturas del código fuente y del sistema StreamPro funcionando
- Al final, muestre un instrumento ya diligenciado como ejemplo

---

## ESTRUCTURA DEL VIDEO

---

### ESCENA 1 — INTRODUCCIÓN (Duración: 30 segundos)

```
[Aparece en pantalla: Logo SENA + título "Instrumentos de Calidad de Software"]

NARRADOR:
"Hola, soy [tu nombre], aprendiz del programa Análisis y Desarrollo de Software del SENA.
En este video te voy a explicar cómo diligenciar los instrumentos para documentar
procesos de calidad de software, usando como ejemplo nuestro proyecto StreamPro.
Estos instrumentos están diseñados para ser sencillos, amigables y fáciles de entender."

[Mostrar: pantalla dividida con los 4 formatos abiertos]
```

---

### ESCENA 2 — ¿QUÉ SON Y PARA QUÉ SIRVEN? (Duración: 1 minuto)

```
[Mostrar: esquema visual con los 4 instrumentos y su propósito]

NARRADOR:
"Los instrumentos de calidad de software son formatos estandarizados que nos permiten
registrar, organizar y dar seguimiento a las actividades de aseguramiento de la calidad.
Vamos a ver cuatro instrumentos clave:

1. La Lista de Verificación de Calidad — nos ayuda a verificar que el código y las
   funcionalidades cumplen con los estándares definidos.

2. El Formato de Pruebas Funcionales — documenta la ejecución de casos de prueba
   y sus resultados.

3. El Registro de No Conformidad — nos permite documentar hallazgos que no cumplen
   con los requisitos.

4. La Matriz de Trazabilidad — relaciona cada requisito con los componentes donde
   se implementó."

[Mostrar: cada instrumento brevemente en pantalla mientras se nombra]
```

---

### ESCENA 3 — ESTRUCTURA GFPI-F-135 V02 (Duración: 45 segundos)

```
[Mostrar: documento GFPI-F-135 V02 o diagrama de su estructura]

NARRADOR:
"Todos estos instrumentos siguen la estructura del formato institucional
GFPI-F-135 V02 del SENA. Esta estructura tiene cinco partes principales:

Primero, la identificación, donde colocamos el programa de formación,
el código de la evidencia, el proyecto y la fecha.

Segundo, las instrucciones de diligenciamiento, que explican de forma clara
cómo llenar cada campo del formato.

Tercero, el cuerpo del instrumento, que contiene las tablas y casillas
que vamos a diligenciar.

Cuarto, las observaciones, donde registramos hallazgos importantes.

Y quinto, las firmas de quienes elaboraron, revisaron y aprobaron."

[Mostrar: cada parte resaltada en el formato mientras se menciona]
```

---

### ESCENA 4 — LISTA DE VERIFICACIÓN F01 (Duración: 1 minuto 15 segundos)

```
[Mostrar: archivo F01-Lista_Verificacion_Calidad.md abierto]

NARRADOR:
"Empecemos con la Lista de Verificación de Calidad, archivo F01.

Lo primero es completar la tabla de identificación: colocamos nuestro nombre
como verificadores, la fecha, el módulo que vamos a evaluar y la versión del software.

Luego, revisamos cada ítem de la lista. Por ejemplo, en la categoría de
Calidad del Código tenemos ítems como: 'El código sigue una nomenclatura clara',
'Se manejan correctamente los errores', 'No hay credenciales hardcodeadas'.

Para cada ítem marcamos con una X en la columna S si cumple,
N si no cumple, o N/A si no aplica.

[MOSTAR EN PANTALLA: ejemplo diligenciado]

Por ejemplo, aquí estamos evaluando el módulo de Autenticación de StreamPro.
En el ítem 4, 'Sin credenciales hardcodeadas', marcamos N porque en el archivo
config/correo.js encontramos la contraseña SMTP en texto plano. En observaciones
anotamos el archivo y la línea exacta donde ocurre.

Al final calculamos el porcentaje de cumplimiento:
7 de 8 ítems cumplidos nos da un 87.5 por ciento."
```

---

### ESCENA 5 — FORMATO DE PRUEBAS FUNCIONALES F02 (Duración: 1 minuto 30 segundos)

```
[Mostrar: archivo F02-Formato_Pruebas_Funcionales.md abierto]

NARRADOR:
"Ahora veamos el Formato de Pruebas Funcionales, archivo F02.

[MOSTAR EN PANTALLA: caso de prueba CP-001]

Cada caso de prueba tiene un identificador único, por ejemplo CP-001 para
'Registro de nuevo usuario'. El formato ya viene con la descripción,
las precondiciones y los pasos a seguir.

Lo que nosotros debemos hacer es:
Primero, leer cuidadosamente qué es lo que vamos a probar.
Segundo, ejecutar los pasos en el sistema.
Tercero, escribir en 'Resultado obtenido' qué ocurrió realmente.
Cuarto, marcar si la prueba fue Exitosa o Fallida.
Y quinto, tomar una captura de pantalla como evidencia.

[MOSTAR EN PANTALLA: StreamPro ejecutándose + captura]

Por ejemplo, para el CP-001: abrimos la página de registro, completamos
los campos con los datos de prueba, hacemos clic en Registrarse, y verificamos
que nos redirige al login. Si todo funciona, marcamos Exitosa.

Al final, en el resumen, contamos cuántas pruebas fueron exitosas
y cuántas fallidas para calcular el porcentaje de éxito."
```

---

### ESCENA 6 — REGISTRO DE NO CONFORMIDAD F03 (Duración: 1 minuto 15 segundos)

```
[Mostrar: archivo F03-Formato_No_Conformidad.md abierto]

NARRADOR:
"El tercer instrumento es el Registro de No Conformidad, archivo F03.
Este formato lo usamos cuando encontramos algo que no cumple con lo esperado.

[MOSTAR EN PANTALLA: ejemplo diligenciado NC-001]

Cada no conformidad tiene un número correlativo: NC-001, NC-002, etc.
Asignamos una severidad: Crítica si el sistema no funciona o se pierden datos,
Alta si una funcionalidad principal está afectada, Media si existe alternativa,
o Baja si es cosmético.

La parte más importante es el análisis de causa raíz. Debemos preguntarnos
'¿por qué?' varias veces hasta llegar al origen del problema.

Por ejemplo, en StreamPro tuvimos una no conformidad donde el correo de
recuperación de contraseña no llegaba al usuario. La causa inmediata era
que la conexión SMTP fallaba, pero la causa raíz era que la contraseña
de aplicación de Gmail había expirado y no estaba actualizada en el archivo
config/correo.js.

Finalmente, definimos acciones inmediatas para contener el problema y
acciones correctivas para eliminar la causa raíz de forma permanente."
```

---

### ESCENA 7 — MATRIZ DE TRAZABILIDAD F04 (Duración: 1 minuto)

```
[Mostrar: archivo F04-Matriz_Trazabilidad_Requisitos.md abierto]

NARRADOR:
"El cuarto instrumento es la Matriz de Trazabilidad de Requisitos, archivo F04.

[MOSTAR EN PANTALLA: sección de la matriz]

Esta matriz cruza cada requisito funcional con los componentes donde
se implementó. Por ejemplo, el requisito RQ-001 dice: 'El sistema debe
permitir el registro de nuevos usuarios', y está asociado a los archivos
rutas/registerUser.js y views/registerUser.ejs.

Para diligenciarla, debemos revisar cada requisito en el código fuente
y marcar si está completamente implementado (S), no implementado (N),
o implementado parcialmente (P).

En la columna de evidencia escribimos qué prueba o revisión confirma
el cumplimiento. Por ejemplo, para RQ-001 podríamos poner
'CP-001 ejecutado exitosamente el 02/06/2026'.

Es importante actualizar esta matriz durante todo el proyecto,
no solo al final."
```

---

### ESCENA 8 — CONSEJOS Y ERRORES COMUNES (Duración: 45 segundos)

```
[Mostrar: lista de consejos en pantalla]

NARRADOR:
"Antes de terminar, quiero compartir algunos consejos importantes:

Primero, diligencien los instrumentos a medida que avanzan, no los dejen
para el final. Segundo, sean honestos en sus evaluaciones. Un instrumento
con puros 'S' sin verificar no sirve de nada.

Tercero, adjunten evidencia siempre que sea posible: capturas de pantalla,
logs, fragmentos de código.

Y cuarto, eviten errores comunes como dejar campos en blanco, usar
observaciones vagas como 'todo bien', o confundir la causa inmediata
con la causa raíz en las no conformidades."
```

---

### ESCENA 9 — CIERRE (Duración: 30 segundos)

```
[Mostrar: resumen de los 4 instrumentos y despedida]

NARRADOR:
"En resumen, estos cuatro instrumentos —Lista de Verificación,
Formato de Pruebas Funcionales, Registro de No Conformidad y
Matriz de Trazabilidad— nos permiten documentar el proceso de calidad
de software de manera organizada y profesional.

Recuerden que la calidad no es un accidente, es el resultado de procesos
sistemáticos de verificación, validación y mejora continua.

Mi nombre es [tu nombre], esto fue para la evidencia
GA11-220501098-AA1-EV01 del programa Análisis y Desarrollo de Software.
Muchas gracias por su atención."

[Mostrar: pantalla final con datos del proyecto StreamPro y SENA]
```

---

## ANEXO: CHECKLIST DE GRABACIÓN

| Aspecto | Sí | No |
|---|---|---|
| ¿El video inicia con logo del SENA? | | |
| ¿Se menciona el código de evidencia GA11-220501098-AA1-EV01? | | |
| ¿Se muestran los 4 formatos en pantalla? | | |
| ¿Se explica la estructura GFPI-F-135 V02? | | |
| ¿Se muestra al menos un ejemplo diligenciado? | | |
| ¿Las capturas de pantalla son legibles? | | |
| ¿El audio es claro y sin ruido de fondo? | | |
| ¿La duración total está entre 7 y 8 minutos? | | |
| ¿Se mencionan los errores comunes? | | |
| ¿El cierre incluye los datos del aprendiz y programa? | | |

---

*Guion elaborado como parte de la evidencia GA11-220501098-AA1-EV01 del programa Análisis y Desarrollo de Software — SENA 2026*
