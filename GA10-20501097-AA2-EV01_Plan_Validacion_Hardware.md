# Plan de Validación de Características Mínimas de Hardware para el Software StreamPro

---

## PORTADA

**Plan de Validación de Características Mínimas de Hardware para el Despliegue de la Aplicación Web StreamPro**

&nbsp;

**Nombre del aprendiz:** _________________________________________

&nbsp;

**Número de ficha:** _________________________________________

&nbsp;

**Programa de formación:** _________________________________________

&nbsp;

**Centro de formación / Regional:** _________________________________________

&nbsp;

**Fecha de entrega:** _________________________________________

&nbsp;

**Instructor:** _________________________________________

&nbsp;

&nbsp;

---

## INTRODUCCIÓN

En el contexto actual del desarrollo de aplicaciones web, la correcta planificación de la infraestructura de hardware resulta determinante para garantizar el rendimiento, la disponibilidad y la escalabilidad del software desplegado. Un dimensionamiento inadecuado de los recursos físicos puede derivar en problemas de latencia, caídas del servicio y una experiencia de usuario deficiente, especialmente en plataformas que manejan contenido multimedia y autenticación de usuarios.

StreamPro es una plataforma de streaming de contenido audiovisual (películas y series) desarrollada con tecnologías modernas del ecosistema JavaScript, específicamente Node.js como entorno de ejecución en el lado del servidor y Express.js como framework web. La aplicación gestiona un catálogo multimedia con reproducción de video en formato MP4, sistema de autenticación de usuarios con encriptación bcrypt, recuperación de contraseñas mediante correo electrónico, gestión de suscripciones a través de la pasarela de pagos MercadoPago y un panel de administración con operaciones CRUD completas.

El presente informe tiene como propósito establecer de manera ordenada y fundamentada cada uno de los elementos que se deben considerar para verificar que un servidor de despliegue cumple con las características mínimas de hardware necesarias para soportar el funcionamiento óptimo de StreamPro, proyectado para atender aproximadamente 250 usuarios activos no concurrentes. Este plan de validación abarca los componentes de procesamiento, memoria, almacenamiento, red y sistema operativo, proporcionando criterios técnicos medibles para cada uno de ellos.

---

## OBJETIVO

### Objetivo General

Elaborar un plan de validación que permita verificar las características mínimas de hardware requeridas para el despliegue exitoso de la aplicación web StreamPro, garantizando su funcionamiento estable y su capacidad para atender la carga proyectada de 250 usuarios activos no concurrentes.

### Objetivos Específicos

1. Identificar los componentes de hardware críticos para el funcionamiento de una aplicación web basada en Node.js y Express.js con base de datos MySQL.

2. Establecer los valores mínimos y recomendados de CPU, memoria RAM, almacenamiento y ancho de banda de red para el despliegue del software.

3. Definir procedimientos de validación verificables para cada componente de hardware del servidor.

4. Determinar el sistema operativo más adecuado para el despliegue considerando compatibilidad, rendimiento y gestión de recursos.

---

## DESARROLLO DE LA TEMÁTICA

### 1. Descripción General del Software

StreamPro es una aplicación web de streaming desarrollada con la siguiente arquitectura tecnológica:

| Componente | Tecnología | Versión |
|---|---|---|
| **Entorno de ejecución** | Node.js | 22.x |
| **Framework web** | Express.js | 5.1.0 |
| **Motor de plantillas** | EJS | — |
| **Base de datos** | MySQL | 8+ |
| **Driver de conexión** | mysql2 | 3.15.3 |
| **Gestión de sesiones** | express-session | 1.18.2 |
| **Encriptación de contraseñas** | bcrypt | 6.0.0 |
| **Servicio de correo** | Nodemailer | 8.0.5 |
| **Pasarela de pagos** | MercadoPago SDK | 2.12.0 |
| **Generación de UUID** | uuid | 13.0.0 |
| **Control de acceso** | cors | 2.8.5 |
| **Reproducción de video** | HTML5 Video (MP4) | — |

La aplicación se ejecuta en el puerto 3000 (configurable mediante variable de entorno `PORT`), sirve archivos estáticos desde el directorio `public/` (que incluye imágenes de portadas y archivos de video MP4), y mantiene una arquitectura monolítica donde el servidor de aplicación y el servidor de base de datos pueden coexistir en la misma máquina.

### 2. Arquitectura de la Base de Datos

La base de datos `stream_pro` en MySQL 8+ comprende las siguientes tablas principales:

| Tabla | Propósito |
|---|---|
| `usuarios` | Registro y autenticación de usuarios |
| `administradores` | Acceso al panel de administración |
| `peliculas` | Catálogo de películas con metadatos |
| `series` | Catálogo de series con metadatos |
| `temporadas` | Temporadas asociadas a cada serie |
| `capitulos` | Episodios individuales por temporada |
| `suscripciones` | Registro de suscripciones y pagos |
| `tokens_recuperacion` | Tokens para recuperación de contraseñas |

### 3. Elementos de Validación de Hardware

A continuación se detallan, de manera ordenada, los elementos que se deben verificar para garantizar que el servidor de despliegue posee las características mínimas de hardware.

#### 3.1. Procesador (CPU)

**Función en la aplicación:** El procesador es el componente encargado de ejecutar el runtime de Node.js (motor V8), gestionar las peticiones HTTP a través de Express.js, procesar las consultas SQL hacia MySQL, ejecutar el hashing de contraseñas con bcrypt y servir los archivos estáticos de video e imágenes.

**Consideraciones técnicas:**

- Node.js opera con un modelo de *single-threaded event loop*, por lo que un único proceso aprovecha principalmente un núcleo de procesamiento a la vez. Sin embargo, el servidor de base de datos MySQL sí aprovecha múltiples núcleos para la ejecución de consultas concurrentes.
- La operación de hashing con bcrypt es intencionalmente costosa a nivel de CPU, lo que incrementa la carga de procesamiento durante los procesos de registro e inicio de sesión.
- Para 250 usuarios activos no concurrentes, el tráfico simultáneo real es moderado, pero el servicio de streaming de video demanda capacidad de procesamiento adicional para la lectura y transmisión de archivos.

**Valores de validación:**

| Nivel | Especificación | Justificación |
|---|---|---|
| **Mínimo** | 2 núcleos físicos / 4 hilos, 2.0 GHz | Suficiente para ejecutar Node.js + MySQL en la misma máquina con carga moderada |
| **Recomendado** | 4 núcleos físicos / 8 hilos, 2.5 GHz o superior | Permite separar cargas entre aplicación y base de datos, y soporta picos de tráfico |
| **Óptimo** | 6+ núcleos físicos / 12+ hilos, 3.0 GHz+ | Escalabilidad a futuro y mayor capacidad de streaming simultáneo |

**Procedimiento de validación:**

1. Ejecutar `lscpu` (Linux) o revisar las propiedades del sistema (Windows) para verificar la cantidad de núcleos e hilos.
2. Verificar la frecuencia del reloj del procesador con `cat /proc/cpuinfo` (Linux).
3. Ejecutar `nproc` para confirmar el número de procesadores disponibles para el sistema operativo.
4. Realizar una prueba de estrés con `stress-ng --cpu 4 --timeout 60s` para verificar estabilidad bajo carga.

#### 3.2. Memoria RAM

**Función en la aplicación:** La memoria RAM es utilizada por el runtime de Node.js para mantener el *heap* de ejecución y el *event loop*, por MySQL para el *buffer pool* y caché de consultas, por express-session para el almacenamiento de sesiones en memoria (MemoryStore), y por el sistema operativo para el caché de archivos estáticos (videos e imágenes).

**Consideraciones técnicas:**

- El almacenamiento de sesiones en memoria (express-session con MemoryStore) implica que cada sesión activa consume RAM del servidor. Con 250 usuarios activos, se requieren al menos 250 sesiones concurrentes en memoria.
- MySQL requiere memoria suficiente para su *InnoDB buffer pool*, que idealmente debe ocupar entre el 50% y el 70% de la RAM disponible en un servidor dedicado a base de datos.
- El sistema operativo reserva memoria para el caché del sistema de archivos, lo cual es crítico cuando se sirven archivos de video MP4 directamente desde disco.
- Node.js tiene un límite de memoria *heap* por defecto de aproximadamente 1.5 GB en arquitecturas de 64 bits, configurable mediante la bandera `--max-old-space-size`.

**Valores de validación:**

| Nivel | Especificación | Justificación |
|---|---|---|
| **Mínimo** | 4 GB DDR4 | Permite ejecutar Node.js (512 MB), MySQL (2 GB) y el sistema operativo (1.5 GB) de forma básica |
| **Recomendado** | 8 GB DDR4 | Proporciona margen para 250 sesiones en memoria, buffer pool de MySQL ampliado y caché de archivos |
| **Óptimo** | 16 GB DDR4 o superior | Escalabilidad para más usuarios y posibilidad de separar servicios en contenedores |

**Procedimiento de validación:**

1. Ejecutar `free -h` (Linux) o revisar el Administrador de Tareas (Windows) para verificar la memoria total instalada.
2. Ejecutar `dmidecode -t memory` (Linux, requiere root) para obtener especificaciones detalladas de la RAM (tipo, velocidad, slots).
3. Verificar la memoria disponible con `vmstat 1 5` y observar las columnas `free`, `buff` y `cache`.
4. Confirmar que al menos el 70% de la RAM especificada sea accesible por el sistema operativo.

#### 3.3. Almacenamiento (Storage)

**Función en la aplicación:** El almacenamiento se utiliza para: los archivos de la aplicación (código fuente, dependencias de `node_modules`), los archivos multimedia (videos MP4 en `public/video/`, imágenes de portadas en `public/portadas/` e `public/img/`), la base de datos MySQL, los registros de logs y el sistema operativo.

**Consideraciones técnicas:**

- Los archivos de video MP4 constituyen el mayor consumo de espacio. En la configuración actual, los videos se almacenan localmente en el directorio `public/video/`. Un catálogo de streaming profesional requiere cientos de gigabytes o terabytes de espacio.
- MySQL almacena sus datos en formato InnoDB; cada tabla genera archivos `.ibd` que crecen con los registros. Para un catálogo de 250 usuarios con registros de suscripciones y tokens, el consumo es moderado.
- Los archivos de `node_modules` para este proyecto ocupan aproximadamente 50-100 MB.
- La velocidad de lectura del disco impacta directamente en el tiempo de carga de los videos: un disco mecánico HDD tendrá latencias significativamente mayores que un SSD.

**Estimación de espacio requerido:**

| Componente | Espacio estimado |
|---|---|
| Sistema operativo (Ubuntu Server) | 2-4 GB |
| Node.js + dependencias (`node_modules`) | 100-200 MB |
| Aplicación (código fuente + vistas + estáticos) | 50-100 MB |
| Videos MP4 (catálogo actual: ~9 archivos) | 500 MB - 2 GB |
| Videos MP4 (catálogo proyectado: 100+ títulos) | 20-100 GB |
| Base de datos MySQL (`stream_pro`) | 200-500 MB |
| Logs del sistema y de la aplicación | 500 MB - 1 GB |
| Espacio libre recomendado (mínimo 20%) | Variable |

**Valores de validación:**

| Nivel | Especificación | Justificación |
|---|---|---|
| **Mínimo** | 20 GB SSD | Suficiente para la instalación base, aplicación y catálogo de videos reducido |
| **Recomendado** | 100 GB SSD | Permite un catálogo de videos de tamaño medio con margen de crecimiento |
| **Óptimo** | 500 GB SSD - 1 TB NVMe | Soporta un catálogo extenso de contenido multimedia con alto rendimiento de lectura |

**Procedimiento de validación:**

1. Ejecutar `df -h` para verificar el espacio total y disponible en cada partición.
2. Ejecutar `lsblk` para identificar el tipo de dispositivo de almacenamiento.
3. Ejecutar `cat /sys/block/sda/queue/rotational` (Linux): si devuelve `0`, es SSD; si devuelve `1`, es HDD.
4. Realizar una prueba de velocidad de lectura con `hdparm -Tt /dev/sda` (Linux) o CrystalDiskMark (Windows). Se recomienda una velocidad de lectura secuencial mínima de 400 MB/s para SSD.

#### 3.4. Red (Network)

**Función en la aplicación:** La conexión de red permite el acceso de los 250 usuarios a la aplicación web a través del protocolo HTTP/HTTPS en el puerto 3000, la comunicación entre la aplicación y la base de datos MySQL (puerto 3306, si están en servidores separados), el envío de correos electrónicos a través de SMTP (Gmail, puerto 587) y la comunicación con la API de MercadoPago para el procesamiento de pagos.

**Consideraciones técnicas:**

- El streaming de video es el componente que más ancho de banda consume. Un video MP4 de calidad estándar (720p) tiene un bitrate aproximado de 2.5 Mbps. Si 10 usuarios reproducen video simultáneamente, se requieren al menos 25 Mbps de ancho de banda de subida.
- El tráfico HTTP para navegación sin reproducción de video es mínimo (aproximadamente 1-5 Mbps para 250 usuarios no concurrentes).
- Para un servidor de producción, se recomienda una conexión simétrica (mismo ancho de banda de subida y bajada) o al menos un ancho de banda de subida proporcional a la demanda de streaming.
- La latencia de red debe ser inferior a 100 ms para garantizar una experiencia de navegación aceptable.

**Valores de validación:**

| Nivel | Especificación | Justificación |
|---|---|---|
| **Mínimo** | 50 Mbps simétricos | Soporta navegación y streaming simultáneo de 5-8 usuarios |
| **Recomendado** | 100 Mbps - 1 Gbps simétricos | Soporta streaming simultáneo de 15-25 usuarios con holgura |
| **Óptimo** | 1 Gbps+ con CDN | Distribución eficiente de contenido multimedia a toda la base de usuarios |

**Procedimiento de validación:**

1. Ejecutar `speedtest-cli` (requiere instalación previa) o acceder a un servicio de medición de velocidad desde el servidor.
2. Ejecutar `iperf3` entre el servidor y un cliente de prueba para medir throughput real.
3. Verificar la latencia con `ping -c 10 google.com` (Linux) o `ping -n 10 google.com` (Windows). La latencia promedio debe ser inferior a 100 ms.
4. Verificar que los puertos requeridos estén abiertos: `ss -tlnp` (Linux) o `netstat -an` (Windows). Puertos críticos: 3000 (aplicación), 3306 (MySQL), 587 (SMTP).

#### 3.5. Sistema Operativo

**Función en la aplicación:** El sistema operativo gestiona los recursos de hardware, proporciona el entorno de ejecución para Node.js y MySQL, administra los procesos, la red, los archivos y la seguridad del servidor.

**Consideraciones técnicas:**

- Se recomienda un sistema operativo de la familia Linux para entornos de producción por su estabilidad, bajo consumo de recursos, seguridad nativa y amplia compatibilidad con Node.js y MySQL.
- Ubuntu Server LTS (Long Term Support) es la distribución recomendada para este proyecto por su ciclo de soporte de 5 años, amplia documentación, repositorios actualizados y compatibilidad comprobada con Node.js 22.x y MySQL 8+.
- Windows Server es una alternativa válida pero consume más recursos de RAM y CPU en estado idle, lo que reduce los recursos disponibles para la aplicación.
- La arquitectura del sistema operativo debe ser de 64 bits (x86_64), ya que Node.js 22.x y MySQL 8+ están optimizados para esta arquitectura.

**Valores de validación:**

| Nivel | Especificación | Justificación |
|---|---|---|
| **Mínimo** | Ubuntu Server 22.04 LTS / 24.04 LTS (64 bits) | Soporte a largo plazo, compatibilidad garantizada con Node.js 22.x y MySQL 8+ |
| **Recomendado** | Ubuntu Server 24.04 LTS (64 bits) | Última versión LTS con soporte hasta 2029, kernel optimizado y paquetes actualizados |
| **Alternativa** | Debian 12 (Bookworm) / Rocky Linux 9 | Distribuciones enterprise con estabilidad comprobada para producción |

**Procedimiento de validación:**

1. Ejecutar `cat /etc/os-release` para verificar la distribución y versión del sistema operativo.
2. Ejecutar `uname -m` para confirmar la arquitectura (debe devolver `x86_64`).
3. Ejecutar `uname -r` para verificar la versión del kernel (recomendado: 5.15 o superior).
4. Verificar que los paquetes esenciales estén instalados: `node --version` (debe retornar `v22.x.x`), `mysql --version` (debe retornar `8.x.x`), `curl --version`.

### 4. Resumen de Requerimientos de Hardware

| Componente | Mínimo | Recomendado | Óptimo |
|---|---|---|---|
| **CPU** | 2 núcleos / 4 hilos, 2.0 GHz | 4 núcleos / 8 hilos, 2.5 GHz+ | 6+ núcleos / 12+ hilos, 3.0 GHz+ |
| **RAM** | 4 GB DDR4 | 8 GB DDR4 | 16 GB DDR4+ |
| **Almacenamiento** | 20 GB SSD | 100 GB SSD | 500 GB - 1 TB NVMe |
| **Red** | 50 Mbps simétricos | 100 Mbps - 1 Gbps | 1 Gbps+ con CDN |
| **Sistema Operativo** | Ubuntu Server 22.04 LTS (64 bits) | Ubuntu Server 24.04 LTS (64 bits) | Ubuntu Server 24.04 LTS (64 bits) |

### 5. Protocolo de Validación Paso a Paso

El siguiente procedimiento permite verificar de manera sistemática que un servidor candidato cumple con los requisitos mínimos de hardware para desplegar StreamPro:

#### Paso 1: Verificación del Sistema Operativo

```bash
# Verificar distribución y versión
cat /etc/os-release

# Verificar arquitectura (debe ser x86_64)
uname -m

# Verificar versión del kernel
uname -r
```

**Criterio de aprobación:** Sistema operativo de 64 bits, preferiblemente Ubuntu Server 22.04 LTS o superior, kernel 5.15 o posterior.

#### Paso 2: Verificación del Procesador

```bash
# Verificar número de núcleos e hilos
lscpu | grep -E "^(CPU\(s\):|Core\(s\) per socket:|Thread\(s\) per core:|Model name:)"

# Verificar núcleos disponibles para el SO
nproc

# Verificar frecuencia
cat /proc/cpuinfo | grep "MHz" | head -1
```

**Criterio de aprobación:** Mínimo 2 núcleos físicos (4 hilos), frecuencia de 2.0 GHz o superior.

#### Paso 3: Verificación de Memoria RAM

```bash
# Verificar memoria total y disponible
free -h

# Verificar especificaciones de RAM
dmidecode -t memory | grep -E "Size:|Speed:|Type:"
```

**Criterio de aprobación:** Mínimo 4 GB de RAM instalada y reconocida por el sistema operativo.

#### Paso 4: Verificación de Almacenamiento

```bash
# Verificar espacio disponible
df -h

# Identificar tipo de disco (0 = SSD, 1 = HDD)
cat /sys/block/sda/queue/rotational

# Verificar velocidad de lectura
hdparm -Tt /dev/sda
```

**Criterio de aprobación:** Mínimo 20 GB disponibles, disco SSD (rotational = 0), velocidad de lectura secuencial superior a 400 MB/s.

#### Paso 5: Verificación de Red

```bash
# Verificar latencia
ping -c 10 8.8.8.8

# Verificar puertos abiertos
ss -tlnp | grep -E "(3000|3306|587)"

# Medir ancho de banda (requiere speedtest-cli instalado)
speedtest-cli
```

**Criterio de aprobación:** Latencia promedio inferior a 100 ms, ancho de banda de subida mínimo de 50 Mbps, puertos requeridos accesibles.

#### Paso 6: Verificación de Software Requerido

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar MySQL
mysql --version
```

**Criterio de aprobación:** Node.js v22.x.x, npm compatible, MySQL 8.x.x instalados y funcionales.

### 6. Consideraciones de Escalabilidad para 250 Usuarios

Dado que la aplicación está proyectada para 250 usuarios activos no concurrentes, se deben tener en cuenta las siguientes consideraciones:

1. **Concurrencia real estimada:** De 250 usuarios activos, se estima que entre el 10% y el 20% (25-50 usuarios) podrían estar conectados simultáneamente en horas pico. De estos, aproximadamente 5-15 podrían estar reproduciendo video al mismo tiempo.

2. **Almacenamiento de sesiones:** Con express-session en MemoryStore, cada sesión consume entre 50-200 KB de RAM. Para 50 sesiones simultáneas, esto representa entre 2.5 MB y 10 MB de RAM. Para una arquitectura escalable, se recomienda migrar a un almacén de sesiones externo como Redis.

3. **Ancho de banda para streaming:** Cada reproducción de video en 720p consume aproximadamente 2.5 Mbps. Para 10 reproducciones simultáneas, se requieren 25 Mbps de ancho de banda de subida dedicado exclusivamente al streaming.

4. **Carga de la base de datos:** Con 250 usuarios registrados, las operaciones de lectura y escritura en MySQL son ligeras. El cuello de botella principal no es la base de datos sino la entrega de contenido multimedia.

5. **Recomendación de mejora:** Para escalar más allá de los 250 usuarios, se recomienda implementar:
   - Un servidor de almacenamiento de objetos (como Amazon S3 o MinIO) para los archivos de video.
   - Una red de distribución de contenidos (CDN) para reducir la carga del servidor origen.
   - Un gestor de procesos como PM2 para aprovechar múltiples núcleos de CPU.
   - Redis como almacén de sesiones para permitir escalamiento horizontal.

### 7. Matriz de Validación Final

| # | Componente | Herramienta de Validación | Valor Mínimo | Valor Encontrado | Estado |
|---|---|---|---|---|---|
| 1 | CPU | `lscpu`, `nproc` | 2 núcleos / 4 hilos | _____ | Aprobado / Rechazado |
| 2 | RAM | `free -h` | 4 GB | _____ | Aprobado / Rechazado |
| 3 | Almacenamiento | `df -h`, `cat /sys/block/sda/queue/rotational` | 20 GB SSD | _____ | Aprobado / Rechazado |
| 4 | Red (ancho de banda) | `speedtest-cli` | 50 Mbps simétricos | _____ | Aprobado / Rechazado |
| 5 | Red (latencia) | `ping -c 10 8.8.8.8` | < 100 ms promedio | _____ | Aprobado / Rechazado |
| 6 | Sistema Operativo | `cat /etc/os-release`, `uname -m` | Ubuntu Server 22.04 LTS 64 bits | _____ | Aprobado / Rechazado |
| 7 | Node.js | `node --version` | v22.x.x | _____ | Aprobado / Rechazado |
| 8 | MySQL | `mysql --version` | 8.x.x | _____ | Aprobado / Rechazado |
| 9 | Puertos requeridos | `ss -tlnp` | 3000, 3306, 587 abiertos | _____ | Aprobado / Rechazado |
| 10 | Espacio libre | `df -h` | 20% libre | _____ | Aprobado / Rechazado |

---

## CONCLUSIONES

1. La aplicación StreamPro, desarrollada con Node.js 22.x y Express.js 5.1.0, requiere un servidor con características de hardware que garanticen el manejo eficiente de la carga de trabajo generada por 250 usuarios activos no concurrentes. Los requerimientos mínimos identificados son: procesador de 2 núcleos / 4 hilos a 2.0 GHz, 4 GB de RAM DDR4, 20 GB de almacenamiento SSD y una conexión de red de 50 Mbps simétricos.

2. El componente de mayor impacto en los requerimientos de hardware es el streaming de video MP4, ya que la reproducción simultánea de contenido multimedia demanda tanto ancho de banda de red como velocidad de lectura de almacenamiento. Por esta razón, se recomienda como configuración óptima un servidor con 100 GB o más de almacenamiento SSD/NVMe y una conexión de red de al menos 100 Mbps a 1 Gbps simétricos.

3. La arquitectura actual de StreamPro almacena las sesiones en memoria (express-session MemoryStore) y sirve los archivos de video directamente desde el sistema de archivos local. Esta configuración es adecuada para la escala proyectada de 250 usuarios, pero para un crecimiento futuro se recomienda implementar Redis como almacén de sesiones y una CDN para la distribución de contenido multimedia.

4. El sistema operativo recomendado para el despliegue es Ubuntu Server 24.04 LTS en arquitectura de 64 bits (x86_64), ya que proporciona el equilibrio adecuado entre estabilidad, bajo consumo de recursos, compatibilidad con Node.js 22.x y MySQL 8+, y un ciclo de soporte de 5 años que garantiza actualizaciones de seguridad.

5. El protocolo de validación presentado en este documento proporciona un conjunto de pasos verificables y comandos concretos que permiten comprobar de manera objetiva si un servidor candidato cumple con los requisitos mínimos de hardware antes del despliegue de la aplicación, asegurando así la calidad del servicio desde la fase inicial de implementación.

---

## REFERENCIAS BIBLIOGRÁFICAS

Express. (2024). *Express.js — Fast, unopinionated, minimalist web framework for Node.js*. https://expressjs.com/

Joyent, Inc. (2024). *Node.js v22.x Documentation*. https://nodejs.org/dist/latest-v22.x/docs/api/

Microsoft. (2024). *bcrypt npm package*. https://www.npmjs.com/package/bcrypt

MySQL, Oracle Corporation. (2024). *MySQL 8.4 Reference Manual*. https://dev.mysql.com/doc/refman/8.4/en/

Nodemailer. (2024). *Nodemailer documentation*. https://nodemailer.com/

TJ Holowaychuk. (2024). *express-session npm package*. https://www.npmjs.com/package/express-session

Ubuntu. (2024). *Ubuntu 24.04 LTS (Noble Numbat) — Release Notes*. https://releases.ubuntu.com/24.04/

Mercado Pago Developers. (2024). *Mercado Pago API Documentation*. https://www.mercadopago.com.co/developers/es/docs

Node Foundation. (2024). *Node.js memory limits and heap sizing*. https://nodejs.org/en/docs/guides/memory/

Oracle Corporation. (2024). *MySQL Server hardware and operating system requirements*. https://dev.mysql.com/doc/refman/8.4/en/requirements.html

Tanenbaum, A. S., & Bos, H. (2015). *Modern Operating Systems* (4th ed.). Pearson.

Stallings, W. (2018). *Operating Systems: Internals and Design Principles* (9th ed.). Pearson.

---

*Documento elaborado como evidencia de aprendizaje para el componente formativo de Sistemas Operativos y Licenciamiento de Software.*

*SENA — Servicio Nacional de Aprendizaje, Colombia*
