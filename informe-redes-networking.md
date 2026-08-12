# SERVICIO NACIONAL DE APRENDIZAJE – SENA
## Tecnología en Análisis y Desarrollo de Software
### Ficha: 3070420

---

# CONCEPTOS Y PRINCIPIOS DE HARDWARE E INSTALACIÓN DE SOFTWARE

**Evidencia:** GA10-220501097-AA1-EV01  
**Conceptos básicos de redes y networking para la implantación de StreamPro**

| Campo | Información |
|---|---|
| **Aprendiz** | David Camilo Caicedo |
| **Programa** | Análisis y Desarrollo de Software |
| **Ficha** | 3070420 |
| **Proyecto** | StreamPro – Plataforma de Streaming |
| **Evidencia** | GA10-220501097-AA1-EV01 |
| **Fecha** | 1 de mayo de 2026 |

---

## 1. Introducción

StreamPro es una plataforma web de streaming de películas y series, desarrollada con Node.js, Express, EJS y MySQL. Para su correcta implantación en un entorno de producción, es necesario definir la infraestructura tecnológica que soportará el sistema: el sistema operativo del servidor, los protocolos de red que gestionarán la transmisión de datos y los medios físicos o inalámbricos que transportarán la información entre los usuarios y el servidor.

---

## 2. Sistema Operativo Seleccionado para StreamPro

### 2.1 Selección: Ubuntu Server 22.04 LTS

Considerando las tecnologías utilizadas en StreamPro (Node.js, Express, MySQL), el sistema operativo más adecuado para el servidor de producción es **Ubuntu Server 22.04 LTS** (Long-Term Support).

### 2.2 Características Requeridas

Las siguientes características son determinantes para la operación óptima de la plataforma:

- **Soporte de largo plazo (LTS):** Ubuntu 22.04 LTS ofrece soporte de seguridad y actualizaciones hasta abril de 2027, garantizando estabilidad en un entorno productivo.
- **Compatibilidad con el stack tecnológico:** Soporte nativo para Node.js 18+, npm, MySQL 8.0 y el servidor web Nginx como proxy inverso.
- **Arquitectura de 64 bits (x86_64):** Requerida para gestionar múltiples conexiones simultáneas y el procesamiento de streams de video.
- **Gestión de usuarios y permisos (sistema de archivos ext4):** Permite controlar el acceso a los archivos de contenido multimedia de la plataforma.
- **Kernel Linux optimizado:** El scheduler de procesos de Linux maneja eficientemente la concurrencia de Node.js (event loop) bajo alta carga de usuarios.
- **Firewall integrado (UFW):** Permite restringir puertos no necesarios, exponiendo únicamente el puerto 80 (HTTP), 443 (HTTPS) y el de administración SSH.
- **Gestión de servicios con systemd:** Permite configurar StreamPro como un servicio que se inicia automáticamente al reiniciar el servidor.
- **Soporte para SSL/TLS con Let's Encrypt:** Esencial para cifrar las transmisiones de video y proteger las credenciales de los usuarios.
- **Gratuito y de código abierto:** Elimina costos de licenciamiento a diferencia de Windows Server.

| Parámetro | Especificación Mínima Recomendada |
|---|---|
| **Sistema Operativo** | Ubuntu Server 22.04.3 LTS (Jammy Jellyfish) |
| **Arquitectura** | x86_64 (64 bits) |
| **RAM mínima** | 2 GB (recomendado 4 GB para producción) |
| **Almacenamiento** | 20 GB SSD (+ espacio para contenido multimedia) |
| **Procesador** | 2 núcleos mínimo (recomendado 4 para streaming) |
| **Kernel** | Linux 5.15+ |
| **Sistema de archivos** | ext4 |
| **Acceso remoto** | OpenSSH Server habilitado |

---

## 3. Organizaciones que Construyen Estándares de Redes y Networking

Para garantizar la interoperabilidad y el correcto funcionamiento de StreamPro en internet, los protocolos y tecnologías utilizados deben adherirse a estándares internacionales. Las principales organizaciones que los definen son:

| Organización | Nombre completo | Relevancia para StreamPro |
|---|---|---|
| **IEEE** | Institute of Electrical and Electronics Engineers | Define estándares Wi-Fi (IEEE 802.11) y Ethernet (IEEE 802.3) usados para conectar servidores y usuarios. |
| **IETF** | Internet Engineering Task Force | Publica los RFC que definen HTTP/1.1, HTTP/2, HTTP/3, TCP/IP, TLS y HTTPS; todos usados por StreamPro. |
| **ISO/IEC** | International Organization for Standardization / IEC | Mantiene el modelo OSI (ISO/IEC 7498), marco conceptual de referencia para entender las capas de red. |
| **ITU-T** | International Telecommunication Union – Telecom | Regula estándares de telecomunicaciones globales, relevantes para la transmisión de datos multimedia. |
| **W3C** | World Wide Web Consortium | Define estándares de la web como HTML5, CSS y el protocolo WebSocket, utilizado para funciones en tiempo real. |
| **ISOC** | Internet Society | Organismo paraguas que supervisa la gobernanza de internet y coordina al IETF y al IAB. |
| **IANA** | Internet Assigned Numbers Authority | Administra los identificadores únicos de Internet (direcciones IP, puertos, protocolos), incluyendo el puerto 3000 de StreamPro. |

---

## 4. Las Dos Grandes Familias de Protocolos de Transmisión

Respecto a la transmisión y recepción de datos, existen dos grandes familias o modelos de referencia que estructuran toda la comunicación en redes:

### 4.1 Familia TCP/IP (Transmission Control Protocol / Internet Protocol)

Es el conjunto de protocolos que sustenta todo internet. Se organiza en cuatro capas: acceso a red, internet, transporte y aplicación. Para StreamPro, esta familia es la más relevante:

- **TCP (Capa de Transporte):** Protocolo orientado a la conexión que garantiza la entrega ordenada y sin errores de los datos. StreamPro lo usa para las peticiones HTTP de la interfaz web, el sistema de login, las consultas a la API REST y las transacciones de pago con MercadoPago.
- **UDP (Capa de Transporte):** Protocolo sin conexión, más rápido pero sin garantía de entrega. En plataformas de streaming avanzadas se usa para la transmisión de video en tiempo real (protocolos como RTP/RTSP se apoyan en UDP). También se usa para consultas DNS que resuelven el dominio de StreamPro.
- **IP (Capa de Red):** Se encarga del direccionamiento y enrutamiento de los paquetes desde el servidor hacia cada usuario.
- **HTTP/HTTPS (Capa de Aplicación):** Protocolo de transferencia de hipertexto que gestiona las peticiones de los navegadores. StreamPro opera sobre HTTPS (HTTP + TLS) para proteger los datos de los usuarios.
- **DNS (Domain Name System):** Traduce el nombre del dominio de StreamPro a la dirección IP del servidor.
- **SMTP (Capa de Aplicación):** Protocolo de envío de correo electrónico, utilizado por Nodemailer para la recuperación de contraseñas.

| Capa TCP/IP | Protocolos | Uso en StreamPro |
|---|---|---|
| **Aplicación** | HTTP/HTTPS, DNS, SMTP, WebSocket | Interfaz web, resolución de nombres, envío de correos, funciones en tiempo real |
| **Transporte** | TCP, UDP | Entrega confiable de datos (TCP) y transmisión rápida de video (UDP) |
| **Internet** | IP, ICMP, ARP | Enrutamiento de paquetes entre el servidor y los usuarios |
| **Acceso a Red** | Ethernet, Wi-Fi (802.11), PPP | Conexión física o inalámbrica del servidor y los usuarios |

### 4.2 Familia OSI (Open Systems Interconnection)

El modelo OSI, definido por ISO/IEC, es un modelo conceptual de referencia que organiza las comunicaciones en siete capas. Aunque TCP/IP es el modelo práctico utilizado en internet, OSI sirve como marco teórico para diagnosticar problemas de red y comprender cómo interactúan las diferentes tecnologías en la plataforma:

| Capa | Nombre | Función y ejemplo en StreamPro |
|---|---|---|
| **7 – Aplicación** | Application | HTTP/HTTPS gestiona las solicitudes de los usuarios a StreamPro (login, catálogo, suscripción). |
| **6 – Presentación** | Presentation | Cifrado TLS/SSL de las transmisiones de video y datos de sesión; compresión de contenido. |
| **5 – Sesión** | Session | Gestión de las sesiones de usuario (express-session en Node.js). |
| **4 – Transporte** | Transport | TCP garantiza la integridad de los datos entre cliente y servidor; UDP para streaming en tiempo real. |
| **3 – Red** | Network | IP enruta los paquetes de datos desde el servidor al usuario a través de internet. |
| **2 – Enlace de Datos** | Data Link | Ethernet o Wi-Fi encapsula los datos en tramas de red local. |
| **1 – Física** | Physical | Cables de fibra óptica, UTP o señales Wi-Fi transportan los bits físicamente. |

---

## 5. Medios de Transmisión

Los medios de transmisión son los canales físicos o electromagnéticos a través de los cuales viajan los datos entre los usuarios y el servidor de StreamPro. Se clasifican en dos grandes grupos:

### 5.1 Medios Guiados (Cableados)

Son aquellos en los que la señal se propaga a través de un conductor físico. Ofrecen mayor velocidad, estabilidad y seguridad frente a interferencias:

#### 5.1.1 Cable de Par Trenzado (UTP – Unshielded Twisted Pair)

| Característica | Detalle |
|---|---|
| **Descripción** | Cables de cobre trenzados en pares para reducir la interferencia electromagnética entre ellos. |
| **Categorías** | Cat 5e (1 Gbps), Cat 6 (10 Gbps hasta 55m), Cat 6a (10 Gbps hasta 100m), Cat 7 (10 Gbps+). |
| **Conector** | RJ-45. |
| **Distancia máxima** | 100 metros. |
| **Uso principal** | Redes LAN en oficinas, hogares y centros de datos. |
| **Relevancia para StreamPro** | Conexión cableada de los usuarios al router; cableado estructurado en el datacenter donde se aloja el servidor. Es la opción más económica para conexiones de corta distancia. |

#### 5.1.2 Cable Coaxial

| Característica | Detalle |
|---|---|
| **Descripción** | Conductor central de cobre rodeado de un aislante dieléctrico, una malla metálica de blindaje y una cubierta exterior. |
| **Ancho de banda** | Hasta 10 Gbps (dependiendo del tipo). |
| **Conector** | BNC, F-type. |
| **Distancia máxima** | 500 metros (dependiendo del tipo). |
| **Uso principal** | Televisión por cable (CATV), conexiones de internet por cable, redes antiguas. |
| **Relevancia para StreamPro** | Muchos usuarios acceden a StreamPro a través de internet proporcionado por cable coaxial de su ISP. También se usa en sistemas de videovigilancia del datacenter. |

#### 5.1.3 Fibra Óptica

| Característica | Detalle |
|---|---|
| **Descripción** | Filamentos delgados de vidrio o plástico que transmiten datos mediante pulsos de luz. |
| **Tipos** | Monomodo (larga distancia, hasta 100+ km, un solo haz de luz), Multimodo (corta distancia, hasta 550m, múltiples haces). |
| **Ancho de banda** | 10 Gbps a 100+ Gbps. |
| **Velocidad** | Cercana a la velocidad de la luz en el medio. |
| **Inmunidad** | Totalmente inmune a interferencia electromagnética. |
| **Uso principal** | Backbones de internet, conexiones de centros de datos, FTTH (Fiber to the Home). |
| **Relevancia para StreamPro** | Es el medio **más recomendado** para la conexión principal del servidor de StreamPro al backbone de internet. Permite transmitir grandes volúmenes de datos de video a múltiples usuarios simultáneamente sin degradación de señal. |

### 5.2 Medios No Guiados (Inalámbricos)

Son aquellos en los que la señal se propaga sin un conductor físico, a través del aire o el espacio mediante ondas electromagnéticas:

#### 5.2.1 Ondas de Radio

| Característica | Detalle |
|---|---|
| **Frecuencia** | 3 kHz a 300 MHz. |
| **Alcance** | Largo alcance, puede atravesar paredes y obstáculos. |
| **Uso principal** | Radio AM/FM, comunicaciones marítimas y aeronáuticas. |
| **Relevancia para StreamPro** | No es el medio principal de acceso para la plataforma, pero puede usarse para comunicaciones auxiliares o en zonas remotas. |

#### 5.2.2 Microondas

| Característica | Detalle |
|---|---|
| **Frecuencia** | 300 MHz a 300 GHz. |
| **Tipos** | Terrestres (enlace punto a punto con línea de vista), Satelitales (cobertura global). |
| **Alcance** | Decenas de km (terrestre), cobertura global (satelital). |
| **Latencia** | Baja (terrestre), Alta (satelital: 500-700ms). |
| **Uso principal** | Enlaces entre torres de telecomunicaciones, conexiones satelitales (Starlink, HughesNet). |
| **Relevancia para StreamPro** | Los enlaces de microondas terrestres pueden conectar centros de datos entre sí. Las conexiones satelitales permiten que usuarios en zonas rurales accedan a StreamPro donde no hay fibra óptica. |

#### 5.2.3 Infrarrojo

| Característica | Detalle |
|---|---|
| **Frecuencia** | 300 GHz a 400 THz. |
| **Alcance** | Corto alcance, requiere línea de vista directa. |
| **Uso principal** | Controles remotos, comunicación entre dispositivos cercanos (antiguos teléfonos, impresoras). |
| **Relevancia para StreamPro** | No aplica directamente para la plataforma de streaming. Se limita a interacción con controles remotos de Smart TVs. |

#### 5.2.4 Wi-Fi (IEEE 802.11)

| Característica | Detalle |
|---|---|
| **Estándares** | 802.11n (Wi-Fi 4), 802.11ac (Wi-Fi 5), 802.11ax (Wi-Fi 6), 802.11be (Wi-Fi 7). |
| **Frecuencias** | 2.4 GHz y 5 GHz (y 6 GHz en Wi-Fi 6E/7). |
| **Velocidad** | Hasta 46 Gbps (Wi-Fi 7 teórico); Wi-Fi 6 alcanza hasta 9.6 Gbps. |
| **Alcance** | ~50 metros (interior), ~100 metros (exterior). |
| **Uso principal** | Redes inalámbricas en hogares, oficinas, espacios públicos. |
| **Relevancia para StreamPro** | Es el **principal medio de acceso inalámbrico** de los usuarios a la plataforma desde Smart TVs, laptops, tablets y consolas de videojuegos. Wi-Fi 6 es el recomendado para streaming 4K sin buffering. |

#### 5.2.5 Telefonía Móvil (4G LTE / 5G)

| Característica | Detalle |
|---|---|
| **Generaciones** | 4G LTE (hasta 1 Gbps teórico), 5G (hasta 20 Gbps teórico). |
| **Frecuencias** | Sub-6 GHz y ondas milimétricas (mmWave) para 5G. |
| **Latencia** | 4G: 30-50ms, 5G: 1-10ms. |
| **Uso principal** | Conexión a internet desde smartphones, tablets y dispositivos IoT en movilidad. |
| **Relevancia para StreamPro** | Permite a los usuarios acceder a la plataforma desde smartphones y tablets en cualquier lugar. 5G ofrece la calidad necesaria para streaming de video en alta definición con latencia mínima. |

### 5.3 Medios de Transmisión Recomendados para StreamPro

Para garantizar una experiencia de streaming óptima, se recomienda la siguiente infraestructura de medios de transmisión según cada capa del servicio:

#### Infraestructura del Servidor (Backend)

- **Fibra óptica monomodo** como medio principal para la conexión del servidor al backbone de internet, por su ancho de banda de 10-100+ Gbps, inmunidad a interferencia y capacidad de soportar múltiples streams simultáneos sin degradación.
- **Cable de par trenzado Cat 6a** para conexiones internas dentro del rack o datacenter (entre servidores, switches y routers), por su costo accesible y velocidad de 10 Gbps en distancias cortas (hasta 100m).

#### Acceso de Usuarios Finales a StreamPro

- **Fibra óptica FTTH** para usuarios con conexión fija desde el hogar, ya que ofrece 100-1000 Mbps suficientes para streaming 4K (~25 Mbps requeridos) sin buffering.
- **Wi-Fi 6 (IEEE 802.11ax)** para acceso inalámbrico desde el hogar, con mejor manejo de múltiples dispositivos conectados simultáneamente (OFDMA) y velocidad suficiente para HD/4K.
- **5G** para acceso móvil desde smartphones y tablets, ofreciendo latencia de 1-10ms y velocidades de 1-10 Gbps reales para streaming en movimiento.

| Capa | Medio Recomendado | Justificación |
|---|---|---|
| **Servidor → Internet** | Fibra óptica monomodo | Máximo ancho de banda para múltiples streams simultáneos |
| **Red interna del servidor** | Par trenzado Cat 6a | Económico, confiable, 10 Gbps para distancias cortas |
| **Usuario → Internet (hogar)** | Fibra óptica FTTH + Wi-Fi 6 | Mejor calidad de streaming sin interrupciones |
| **Usuario → Internet (móvil)** | 5G | Streaming en movimiento con latencia mínima |

---

## 6. Conclusión

El desarrollo y despliegue de la plataforma **StreamPro** requiere una comprensión sólida de los conceptos de redes y networking. La selección de **Ubuntu Server 22.04 LTS** como sistema operativo proporciona la base estable y segura necesaria para ejecutar la aplicación Node.js con Express, gestionar sesiones de usuario, procesar pagos con MercadoPago y mantener la base de datos MySQL.

Los estándares definidos por organizaciones como **IEEE**, **IETF**, **ISO/IEC**, **ITU-T**, **W3C** e **ISOC** garantizan que cada componente — desde la conexión física del usuario hasta la reproducción de video en el navegador — funcione de manera interoperable a nivel global.

Las dos grandes familias de protocolos de transmisión, **TCP/IP** (modelo práctico que sustenta internet) y **OSI** (modelo conceptual de referencia), proporcionan el marco para comprender y diseñar la arquitectura de red de la plataforma. TCP asegura la integridad de datos en transacciones críticas (login, pagos, registros), mientras que UDP optimiza la velocidad en servicios como DNS y el streaming en tiempo real.

Finalmente, los medios de transmisión **guiados** (fibra óptica monomodo para el servidor, Cat 6a para conexiones internas) y **no guiados** (Wi-Fi 6 y 5G para acceso de usuarios) constituyen la infraestructura física que hace posible que el contenido multimedia llegue desde los servidores de StreamPro hasta los dispositivos de los usuarios finales con la calidad y velocidad esperadas de un servicio de streaming moderno.

---

## Referencias

1. IEEE Standards Association. (2024). *IEEE 802 Standards*. https://standards.ieee.org/
2. IETF. (2024). *RFC Editor*. https://www.rfc-editor.org/
3. ISO/IEC. (2022). *ISO/IEC 7498-1:1994 - Modelo OSI*. https://www.iso.org/
4. ITU-T. (2024). *Recomendaciones ITU*. https://www.itu.int/
5. W3C. (2024). *Web Standards*. https://www.w3.org/
6. Ubuntu Documentation. (2024). *Ubuntu Server Guide*. https://ubuntu.com/server/docs
7. Tanenbaum, A. S. (2021). *Computer Networks* (6th ed.). Pearson.
8. Kurose, J. F., & Ross, K. W. (2020). *Computer Networking: A Top-Down Approach* (8th ed.). Pearson.
