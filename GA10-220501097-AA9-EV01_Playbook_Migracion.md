# PLAYBOOK DE MIGRACIÓN — STREAMPRO

## Guía rápida por escenarios para ejecutar migraciones paso a paso

---

&nbsp;

**Evidencia:** GA10-220501097-AA9-EV01 — Documentación de plan de migración y respaldo de los datos del software

**Programa:** Análisis y Desarrollo de Software

**Centro de Formación:** Centro de Gestión de Mercados, Logística y Tecnologías de la Información

**Regional:** Distrito Capital

**SENA — Servicio Nacional de Aprendizaje**

**Aprendiz:** David Caicedo

**Año:** 2026

&nbsp;

&nbsp;

&nbsp;

---

## CÓMO USAR ESTE PLAYBOOK

Este documento está organizado como un **playbook**: cada escenario de migración es una "jugada" independiente que contiene todo lo necesario para ejecutarla de principio a fin.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     CÓMO NAVEGAR ESTE PLAYBOOK                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ¿Qué tipo de migración necesitas hacer?                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ●  ¿De local (Windows/XAMPP) a un servidor en la nube?             │   │
│  │     → Ve al PLAY 1: Local → VPS (página 5)                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ●  ¿Los videos y portadas están en disco local y quieres          │   │
│  │     moverlos a la nube (CDN)?                                       │   │
│  │     → Ve al PLAY 2: Almacenamiento → CDN (página 8)                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ●  ¿Solo necesitas actualizar la versión de Node.js o MySQL?       │   │
│  │     → Ve al PLAY 3: Cambio de Versión (página 10)                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ●  ¿Cambiaste de PC y necesitas mover todo el entorno de           │   │
│  │     desarrollo?                                                      │   │
│  │     → Ve al PLAY 4: Cambio de Equipo (página 12)                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ⚠ ¿No sabes cuál aplicar? → Ve a la matriz de selección (página 4)       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## MATRIZ DE SELECCIÓN DE PLAY

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                   ¿QUÉ PLAY USAR? — MATRIZ DE DECISIÓN RÁPIDA                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  PREGUNTA CLAVE                                 →    PLAY RECOMENDADO                 │
│  ──────────────────────────────────────────────     ────────────────                  │
│                                                                                      │
│  1. ¿Cambias de servidor (local → nube)?        →    PLAY 1: Local → VPS             │
│  2. ¿Cambias de sistema operativo                →    PLAY 1: Local → VPS             │
│     (Windows → Linux)?                          →                                      │
│  3. ¿Quieres que los videos se sirvan           →    PLAY 2: Almacenamiento → CDN    │
│     desde una CDN?                                                                     │
│  4. ¿Solo quieres actualizar Node.js?           →    PLAY 3: Cambio de Versión        │
│  5. ¿Solo quieres actualizar MySQL?             →    PLAY 3: Cambio de Versión        │
│  6. ¿Cambiaste de computador?                   →    PLAY 4: Cambio de Equipo         │
│                                                                                      │
│  🔹 ¿Vas a hacer un play combinado? Ej: Local→VPS + CDN + actualizar Node.js         │
│     → Ejecuta los plays en orden: PLAY 3 → PLAY 2 → PLAY 1                           │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## GLOSARIO RÁPIDO

| Término | Significado |
|---------|-------------|
| **Backup** | Copia de seguridad de datos |
| **Checksum** | Huella digital de un archivo para verificar integridad |
| **CDN** | Red de distribución de contenido (sirve archivos más rápido) |
| **PM2** | Gestor de procesos que mantiene Node.js siempre corriendo |
| **Nginx** | Servidor web que actúa como puerta de entrada (proxy inverso) |
| **Rollback** | Procedimiento para volver al estado anterior si algo sale mal |
| **VPS** | Servidor privado virtual (una computadora en la nube) |
| **mysql2** | Controlador que usa Node.js para conectarse a MySQL |

---

## ANTES DE EMPEZAR: EVALUACIÓN DE LA INFRAESTRUCTURA ACTUAL

Antes de ejecutar cualquier play, evalúa el estado actual de tu sistema.

### Volumen de Datos

| Componente | Dónde está | Cómo medirlo | Tamaño típico |
|------------|-----------|-------------|:-------------:|
| Base de datos | MySQL | `SELECT COUNT(*) FROM cada_tabla` | 1 - 50 MB |
| Videos | `public/video/` | Propiedades de carpeta | 100 MB - 5 GB |
| Portadas | `public/portadas/` | Propiedades de carpeta | 10 - 500 MB |
| Código | app.js, rutas/, views/ | Propiedades de carpeta | < 5 MB |
| **Total** | | | **~111 MB - 5.5 GB** |

### Disponibilidad

| Pregunta | Respuesta para StreamPro |
|----------|-------------------------|
| ¿Cuánto tiempo puede estar caído el servicio? | Máximo **4 horas** |
| ¿Cuál es el mejor horario? | Domingo 2:00 AM - 6:00 AM |
| ¿Hay que notificar a los usuarios? | Sí, con 48 horas de antelación |

### Seguridad

| Riesgo | ¿Cómo evitarlo? |
|--------|----------------|
| Datos interceptados al transferirlos | Usar SCP o SFTP (nunca FTP plano) |
| Credenciales expuestas | No subir `config/*.js` a GitHub |
| Backups robados o perdidos | Cifrarlos y guardar 2 copias en lugares distintos |
| Backup corrupto | Verificar con checksum + restauración de prueba |

---

## ROLES Y RESPONSABILIDADES DEL EQUIPO

Cada migración necesita un equipo con roles claros:

| Rol | ¿Quién lo asume? | ¿Qué hace? |
|-----|-----------------|------------|
| **👤 Administrador de Datos** | Líder del proyecto | Supervisa la migración, verifica integridad de datos, autoriza el pase a producción, firma el acta de cierre |
| **👨‍💻 Desarrollador de Software** | Programador asignado | Adapta configuraciones, transfiere archivos, ejecuta pruebas técnicas |
| **🔒 Equipo de Seguridad** | Admin del sistema | Verifica que los datos estén protegidos durante y después de la migración |

**Regla clave:** Cada actividad debe tener un responsable asignado. Si no hay equipo de seguridad, el Administrador de Datos asume ese rol.

---

## CRONOGRAMA DE IMPLEMENTACIÓN

La migración completa toma **10 días** distribuidos en 4 fases:

```
DÍA 1  ●─────────────────── 3 ───────────────────●── 4 ────── 6 ──────●── 7 ── 8 ──●── 9 ── 10 ──●
      ○ PLANIFICACIÓN ○                         ○ DESARROLLO ○        ○ PRUEBAS ○    ○ IMPLE. ○
                                                                                                    
      • Definir alcance                        • Instalar software     • Unitarias     • Corte final   
      • Evaluar infraestructura                • Hacer backups         • Integración   • Iniciar app   
      • Elegir escenario (E1-E5)               • Transferir archivos   • Carga         • Monitorear    
      • Asignar roles                          • Configurar destino    • Seguridad     • Acta de cierre
      • Plan de contingencia                                              • Regresión                      
      • Notificar usuarios                                                                               
```

| Fase | Días | ¿Qué se entrega? |
|------|:----:|------------------|
| **Planificación** | 1-3 | Plan aprobado y usuarios notificados |
| **Desarrollo** | 4-6 | Backups verificados + entorno destino listo |
| **Pruebas** | 7-8 | Informe de pruebas APROBADO |
| **Implementación** | 9-10 | Sistema migrado + acta firmada |

---

# PLAY 1: MIGRACIÓN LOCAL → VPS

## Tarjeta del Play

```
┌────────────────────────────────────────────────────────────────────────────┐
│  PLAY 1: LOCAL → VPS                                                       │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🎯 Objetivo:  Trasladar StreamPro desde un entorno local                  │
│                 (Windows + XAMPP) a un servidor VPS en la nube              │
│                 (Ubuntu + MySQL nativo)                                     │
│                                                                             │
│  ⏱ Duración estimada:  3 - 4 horas                                         │
│                                                                             │
│  ⚠ Nivel de riesgo:     ALTO                                              │
│                                                                             │
│  🔧 Complejidad:         ●●●●○                                             │
│                                                                             │
│  📦 Componentes que cambian:                                               │
│     • Sistema operativo: Windows → Ubuntu                                   │
│     • MySQL: XAMPP → MySQL nativo                                           │
│     • Gestión de procesos: manual → PM2                                     │
│     • Exposición: localhost → dominio + SSL                                 │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

## Pre-requisitos

Antes de empezar, asegúrate de tener:

```
☐ Acceso SSH al servidor VPS (usuario con permisos sudo)
☐ Un dominio o subdominio apuntando al VPS (ej: streampro.tudominio.com)
☐ Puertos abiertos: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3000 (app)
☐ Node.js 22.x instalado en el VPS
☐ MySQL 8.x instalado en el VPS
☐ Al menos 10 GB de espacio libre en el VPS
☐ La aplicación StreamPro funcionando correctamente en local
☐ Este playbook impreso o en otra pantalla
```

## Las Jugadas (Plays)

### Jugada 1.1: Preparar el VPS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 1.1 — PREPARAR EL VPS                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASO 1: Conéctate al VPS por SSH                                           │
│  ────────────────────────────────────────────                               │
│  ssh usuario@ip-del-vps                                                     │
│                                                                             │
│  PASO 2: Actualiza el sistema                                               │
│  ────────────────────────────────────────────                               │
│  sudo apt update && sudo apt upgrade -y                                     │
│                                                                             │
│  PASO 3: Instala Node.js 22.x                                               │
│  ────────────────────────────────────────────                               │
│  curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesetup.sh          │
│  sudo bash nodesetup.sh                                                     │
│  sudo apt install nodejs -y                                                  │
│  node -v   # Debe mostrar v22.x.x                                           │
│                                                                             │
│  PASO 4: Instala MySQL 8                                                    │
│  ────────────────────────────────────────────                               │
│  sudo apt install mysql-server -y                                           │
│  sudo mysql_secure_installation  # Configura contraseña de root             │
│  mysql --version  # Debe mostrar 8.x                                        │
│                                                                             │
│  PASO 5: Crea la base de datos                                              │
│  ────────────────────────────────────────────                               │
│  sudo mysql -u root -p                                                     │
│  CREATE DATABASE stream_pro CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;│
│  CREATE USER 'streampro'@'localhost' IDENTIFIED BY 'tu_contraseña_segura'; │
│  GRANT ALL PRIVILEGES ON stream_pro.* TO 'streampro'@'localhost';           │
│  FLUSH PRIVILEGES;                                                          │
│  EXIT;                                                                      │
│                                                                             │
│  ✅ VERIFICACIÓN: mysql -u streampro -p stream_pro -e "SHOW TABLES;"        │
│     → Debe mostrar: "Empty set" (aún no hay tablas)                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 1.2: Respaldar todo en el origen

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 1.2 — RESPALDAR (en tu PC local)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASO 1: Abre PowerShell o cmd como administrador                           │
│                                                                             │
│  PASO 2: Navega a la carpeta del proyecto                                  │
│  ────────────────────────────────────────────                               │
│  cd C:\Stream\StreamPro                                                     │
│                                                                             │
│  PASO 3: Respalda la base de datos                                          │
│  ────────────────────────────────────────────                               │
│  mysqldump -u root stream_pro > stream_pro_backup_final.sql                 │
│                                                                             │
│  ⚠ Si mysqldump no está en PATH:                                           │
│     "C:\xampp\mysql\bin\mysqldump" -u root stream_pro > backup.sql         │
│                                                                             │
│  PASO 4: Verifica que el backup se creó                                     │
│  ────────────────────────────────────────────                               │
│  dir stream_pro_backup_final.sql  # Debe mostrar peso > 0 KB               │
│                                                                             │
│  PASO 5: Crea una carpeta para todos los backups                            │
│  ────────────────────────────────────────────                               │
│  mkdir backup_migracion                                                     │
│  copy stream_pro_backup_final.sql backup_migracion\                         │
│  xcopy config backup_migracion\config\ /E                                   │
│  xcopy public\video backup_migracion\video\ /E                              │
│  xcopy public\portadas backup_migracion\portadas\ /E                        │
│                                                                             │
│  ✅ VERIFICACIÓN: La carpeta backup_migracion debe tener:                   │
│     backup_migracion/                                                       │
│     ├── stream_pro_backup_final.sql                                         │
│     ├── config/  (4 archivos)                                               │
│     ├── video/   (tus archivos MP4)                                         │
│     └── portadas/ (tus imágenes)                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 1.3: Transferir al VPS

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 1.3 — TRANSFERIR ARCHIVOS AL VPS                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASO 1: Transfiere todo el proyecto (menos node_modules)                  │
│  ────────────────────────────────────────────                               │
│  scp -r "C:\Stream\StreamPro" usuario@ip-vps:/var/www/streampro            │
│                                                                             │
│  ⚠ Esto puede tomar varios minutos si tienes muchos videos                 │
│                                                                             │
│  PASO 2: Conéctate al VPS y verifica la transferencia                       │
│  ────────────────────────────────────────────                               │
│  ssh usuario@ip-vps                                                         │
│  ls /var/www/streampro/                                                     │
│  # Debes ver: app.js, package.json, config/, rutas/, views/, public/       │
│                                                                             │
│  PASO 3: Instala las dependencias                                           │
│  ────────────────────────────────────────────                               │
│  cd /var/www/streampro                                                      │
│  npm install                                                                │
│                                                                             │
│  ✅ VERIFICACIÓN: npm list --depth=0 — debe mostrar todas las deps          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 1.4: Restaurar base de datos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 1.4 — RESTAURAR BASE DE DATOS EN EL VPS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASO 1: Restaura el backup en la BD del VPS                                │
│  ────────────────────────────────────────────                               │
│  mysql -u streampro -p stream_pro < /var/www/streampro/backup.sql          │
│  (Ingresa la contraseña que configuraste en la Jugada 1.1, Paso 5)         │
│                                                                             │
│  PASO 2: Verifica que las 8 tablas se crearon                               │
│  ────────────────────────────────────────────                               │
│  mysql -u streampro -p stream_pro -e "SHOW TABLES;"                        │
│                                                                             │
│  Debes ver:                                                                 │
│  +-------------------------------+                                          │
│  | Tables_in_stream_pro          |                                          │
│  +-------------------------------+                                          │
│  | administradores               |                                          │
│  | capitulos                     |                                          │
│  | peliculas                     |                                          │
│  | series                        |                                          │
│  | suscripciones                 |                                          │
│  | temporadas                    |                                          │
│  | tokens_recuperacion           |                                          │
│  | usuarios                      |                                          │
│  +-------------------------------+                                          │
│                                                                             │
│  ✅ VERIFICACIÓN: 8 tablas creadas = migración de BD exitosa               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 1.5: Configurar y arrancar

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 1.5 — CONFIGURAR Y ARRANCAR STREAMPRO                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASO 1: Edita config/conexion.js para el nuevo entorno                    │
│  ────────────────────────────────────────────                               │
│  nano /var/www/streampro/config/conexion.js                                 │
│                                                                             │
│  Debe quedar así:                                                           │
│  const mysql = require("mysql2");                                           │
│  const conexion = mysql.createConnection({                                  │
│      host: "localhost",                                                     │
│      user: "streampro",             ← el usuario que creaste               │
│      password: "tu_contraseña_segura",  ← la contraseña que pusiste        │
│      database: "stream_pro"                                                │
│  });                                                                        │
│                                                                             │
│  PASO 2: Edita config/link.js con la URL del VPS                           │
│  ────────────────────────────────────────────                               │
│  module.exports = "http://ip-del-vps:3000";  (o tu dominio si ya tienes)  │
│                                                                             │
│  PASO 3: Edita config/mercadopago.js (si usas tokens de producción)        │
│  ────────────────────────────────────────────                               │
│  Cambia el access_token por el de producción                               │
│                                                                             │
│  PASO 4: Edita config/correo.js (si cambias la config SMTP)                │
│  ────────────────────────────────────────────                               │
│                                                                             │
│  PASO 5: Prueba que la app arranca                                          │
│  ────────────────────────────────────────────                               │
│  node app.js                                                                │
│  # Debes ver:                                                               │
│  # conexion exitosa                                                         │
│  # http://localhost:3000                                                    │
│                                                                             │
│  PASO 6: Configura PM2 para que siempre esté corriendo                      │
│  ────────────────────────────────────────────                               │
│  npm install -g pm2                                                         │
│  pm2 start app.js --name streampro                                          │
│  pm2 save                                                                   │
│  pm2 startup  # Sigue las instrucciones que aparecen                        │
│                                                                             │
│  PASO 7: (Opcional) Configura Nginx para acceder por dominio                │
│  ────────────────────────────────────────────                               │
│  sudo apt install nginx -y                                                   │
│  sudo nano /etc/nginx/sites-available/streampro                             │
│                                                                             │
│  Contenido del archivo:                                                     │
│  server {                                                                   │
│      listen 80;                                                             │
│      server_name streampro.tudominio.com;                                   │
│      location / {                                                           │
│          proxy_pass http://localhost:3000;                                   │
│          proxy_http_version 1.1;                                            │
│          proxy_set_header Upgrade $http_upgrade;                            │
│          proxy_set_header Connection 'upgrade';                             │
│          proxy_set_header Host $host;                                        │
│          proxy_cache_bypass $http_upgrade;                                  │
│      }                                                                      │
│  }                                                                          │
│                                                                             │
│  sudo ln -s /etc/nginx/sites-available/streampro /etc/nginx/sites-enabled/  │
│  sudo nginx -t  # Verifica que no hay errores                               │
│  sudo systemctl restart nginx                                               │
│                                                                             │
│  PASO 8: (Opcional) Configura HTTPS con Let's Encrypt                       │
│  ────────────────────────────────────────────                               │
│  sudo apt install certbot python3-certbot-nginx -y                          │
│  sudo certbot --nginx -d streampro.tudominio.com                            │
│                                                                             │
│  ✅ VERIFICACIÓN FINAL:                                                     │
│     Abre http://ip-del-vps:3000 (o tu dominio) en el navegador              │
│     → Debes ver la Landing Page de StreamPro                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 1.R: Rollback (si algo sale mal)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 1.R — ROLLBACK (solo si es necesario)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ⚠ EJECUTA ESTO SOLO SI:                                                    │
│     • La aplicación no arranca en el VPS                                    │
│     • Hay errores de conexión a BD que no puedes resolver                  │
│     • El rendimiento es inaceptable                                         │
│     • Se perdieron datos                                                    │
│                                                                             │
│  PASO 1: Detén el servicio en el VPS                                        │
│  ────────────────────────────────────────────                               │
│  pm2 stop streampro                                                         │
│                                                                             │
│  PASO 2: Vuelve a tu PC local                                               │
│  ────────────────────────────────────────────                               │
│  exit  # Sal del SSH                                                        │
│                                                                             │
│  PASO 3: Restaura la BD en local si hiciste cambios                         │
│  ────────────────────────────────────────────                               │
│  cd C:\Stream\StreamPro                                                     │
│  "C:\xampp\mysql\bin\mysql" -u root stream_pro < backup.sql               │
│                                                                             │
│  PASO 4: Inicia la app en local                                             │
│  ────────────────────────────────────────────                               │
│  node app.js                                                                │
│                                                                             │
│  ✅ VERIFICACIÓN: Abre http://localhost:3000 → StreamPro funciona           │
│                                                                             │
│  PASO 5: Notifica a los usuarios que el servicio sigue en local            │
│                                                                             │
│  📝 LECCIÓN APRENDIDA: Documenta qué falló para no repetirlo               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Check de verificación rápida — PLAY 1

| # | Verificación | ✅ |
|---|-------------|:--:|
| 1 | `node -v` en VPS muestra v22.x | ☐ |
| 2 | `mysql --version` en VPS muestra 8.x | ☐ |
| 3 | La BD `stream_pro` existe y tiene 8 tablas | ☐ |
| 4 | `npm install` se ejecutó sin errores | ☐ |
| 5 | `node app.js` muestra "conexion exitosa" | ☐ |
| 6 | `node app.js` muestra "http://localhost:3000" | ☐ |
| 7 | La Landing Page carga en el navegador | ☐ |
| 8 | El login de usuario funciona | ☐ |
| 9 | El reproductor de video funciona | ☐ |
| 10 | PM2 mantiene la app corriendo | ☐ |

---

# PLAY 2: MIGRACIÓN DE ALMACENAMIENTO → CDN

## Tarjeta del Play

```
┌────────────────────────────────────────────────────────────────────────────┐
│  PLAY 2: ALMACENAMIENTO → CDN                                               │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🎯 Objetivo:  Mover los archivos multimedia (videos y portadas)           │
│                 desde el disco local hacia Amazon S3 + CloudFront           │
│                 para mejorar velocidad de carga y reducir carga            │
│                 del servidor                                                │
│                                                                             │
│  ⏱ Duración estimada:  2 - 3 horas                                         │
│                                                                             │
│  ⚠ Nivel de riesgo:     MEDIO                                              │
│                                                                             │
│  🔧 Complejidad:         ●●●○○                                             │
│                                                                             │
│  📦 Componentes que cambian:                                               │
│     • Ubicación de videos: disco local → S3 + CloudFront                   │
│     • Rutas en BD: rutas locales → URLs de CDN                             │
│     • Sin cambios en código de la app (solo en datos)                      │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

## Pre-requisitos

```
☐ Cuenta de AWS con permisos para crear buckets S3 y distribuciones CloudFront
☐ AWS CLI instalado y configurado (aws configure)
☐ Los archivos multimedia están en C:\Stream\StreamPro\public\video\ y public\portadas\
☐ Acceso a la base de datos stream_pro (phpMyAdmin o MySQL CLI)
☐ Backup completo de BD realizado (por si toca revertir rutas)
```

## Las Jugadas (Plays)

### Jugada 2.1: Preparar S3 y CloudFront

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 2.1 — CREAR BUCKET S3 Y DISTRIBUCIÓN CLOUDFRONT                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASO 1: Crea el bucket S3                                                  │
│  ────────────────────────────────────────────                               │
│  aws s3 mb s3://streampro-media-tunombre                                   │
│                                                                             │
│  PASO 2: Configura el bucket para acceso público de lectura                 │
│  ────────────────────────────────────────────                               │
│  Crea un archivo bucket-policy.json:                                        │
│  {                                                                          │
│      "Version": "2012-10-17",                                               │
│      "Statement": [{                                                        │
│          "Effect": "Allow",                                                 │
│          "Principal": "*",                                                  │
│          "Action": "s3:GetObject",                                          │
│          "Resource": "arn:aws:s3:::streampro-media-tunombre/*"             │
│      }]                                                                     │
│  }                                                                          │
│                                                                             │
│  aws s3api put-bucket-policy --bucket streampro-media-tunombre \           │
│      --policy file://bucket-policy.json                                     │
│                                                                             │
│  PASO 3: Crea la distribución CloudFront                                    │
│  ────────────────────────────────────────────                               │
│  aws cloudfront create-distribution \                                       │
│      --origin-domain-name streampro-media-tunombre.s3.amazonaws.com \      │
│      --default-root-object index.html                                      │
│                                                                             │
│  📝 Anota el DomainName que te devuelve (ej: d123.cloudfront.net)          │
│                                                                             │
│  PASO 4: Verifica que la distribución está activa                           │
│  ────────────────────────────────────────────                               │
│  aws cloudfront list-distributions --query "Items[].{Status:Status,        │
│      DomainName:DomainName}"                                                │
│  # El status debe ser "Deployed"                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 2.2: Subir archivos al bucket

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 2.2 — SUBIR ARCHIVOS MULTIMEDIA A S3                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASO 1: Sube los videos                                                    │
│  ────────────────────────────────────────────                               │
│  aws s3 sync "C:\Stream\StreamPro\public\video" s3://streampro-media/video/│
│                                                                             │
│  PASO 2: Sube las portadas                                                  │
│  ────────────────────────────────────────────                               │
│  aws s3 sync "C:\Stream\StreamPro\public\portadas"                         │
│      s3://streampro-media/portadas/                                         │
│                                                                             │
│  PASO 3: Verifica que los archivos se subieron                              │
│  ────────────────────────────────────────────                               │
│  aws s3 ls s3://streampro-media/video/ --recursive --summarize             │
│  # Debe mostrar el mismo número de archivos que tienes en local            │
│                                                                             │
│  ✅ VERIFICACIÓN:                                                           │
│     Abre en el navegador:                                                   │
│     https://d123.cloudfront.net/video/tu-pelicula.mp4                      │
│     → El video debe reproducirse                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 2.3: Actualizar rutas en la base de datos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 2.3 — ACTUALIZAR RUTAS EN BD                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ⚠ ANTES DE EMPEZAR: Verifica la estructura actual de las rutas            │
│                                                                             │
│  PASO 1: Revisa cómo están guardadas las rutas actualmente                  │
│  ────────────────────────────────────────────                               │
│  mysql -u root -p stream_pro -e "SELECT cod_pel, titulo_pel, ruta_pel,     │
│      ruta_img_pel FROM peliculas LIMIT 5;"                                 │
│                                                                             │
│  PASO 2: Genera las nuevas rutas con la URL de CloudFront                   │
│  ────────────────────────────────────────────                               │
│  Por cada película: UPDATE peliculas SET                                    │
│      ruta_pel = CONCAT('https://d123.cloudfront.net/video/', ruta_pel),    │
│      ruta_img_pel = CONCAT('https://d123.cloudfront.net/portadas/',        │
│                             ruta_img_pel);                                 │
│                                                                             │
│  ⚠ Ajusta la consulta según cómo estén guardadas tus rutas actuales.       │
│     Si las rutas ya contienen rutas completas, haz UPDATE directa.          │
│                                                                             │
│  EJEMPLO PRÁCTICO — Si la BD guarda solo el nombre del archivo:            │
│  ─────────────────────────────────────────────────────────────────────      │
│  -- Antes: ruta_pel = 'mi-pelicula.mp4'                                    │
│  -- Después: ruta_pel = 'https://d123.cloudfront.net/video/mi-pelicula.mp4'│
│                                                                             │
│  UPDATE peliculas SET                                                       │
│      ruta_pel = CONCAT('https://d123.cloudfront.net/video/', ruta_pel),    │
│      ruta_img_pel = CONCAT('https://d123.cloudfront.net/portadas/',        │
│                             ruta_img_pel);                                 │
│                                                                             │
│  -- Lo mismo para capítulos                                                │
│  UPDATE capitulos SET                                                       │
│      ruta_cap = CONCAT('https://d123.cloudfront.net/video/', ruta_cap);    │
│                                                                             │
│  -- Y para las imágenes de series                                          │
│  UPDATE series SET                                                          │
│      ruta_img_ser = CONCAT('https://d123.cloudfront.net/portadas/',        │
│                             ruta_img_ser);                                 │
│                                                                             │
│  PASO 3: Verifica que las rutas se actualizaron                             │
│  ────────────────────────────────────────────                               │
│  mysql -u root -p stream_pro -e "SELECT cod_pel, titulo_pel,               │
│      ruta_pel FROM peliculas LIMIT 5;"                                     │
│  # Las rutas deben comenzar con https://d123.cloudfront.net/...            │
│                                                                             │
│  ✅ VERIFICACIÓN: Abre la app, ve a una película.                           │
│     El video y la portada deben cargar desde la CDN.                       │
│     (Abre F12 → Network → busca cloudfront en las peticiones)             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 2.R: Rollback (si algo sale mal)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 2.R — ROLLBACK DE CDN                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ⚠ EJECUTA ESTO SOLO SI:                                                    │
│     • Los videos no se reproducen desde la CDN                              │
│     • Las rutas en BD se corrompieron                                      │
│     • El tiempo de carga es PEOR que antes                                 │
│                                                                             │
│  PASO 1: Restaura las rutas originales en la BD usando el backup            │
│  ────────────────────────────────────────────                               │
│  mysql -u root -p stream_pro < backup_stream_pro.sql                       │
│                                                                             │
│  O si solo fue un UPDATE incorrecto:                                        │
│  UPDATE peliculas SET ruta_pel = REPLACE(ruta_pel,                         │
│      'https://d123.cloudfront.net/', '');                                  │
│                                                                             │
│  ✅ VERIFICACIÓN: Abre la app → los videos cargan desde el disco local     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# PLAY 3: ACTUALIZACIÓN DE VERSIÓN

## Tarjeta del Play

```
┌────────────────────────────────────────────────────────────────────────────┐
│  PLAY 3: CAMBIO DE VERSIÓN (Node.js / MySQL)                                │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🎯 Objetivo:  Actualizar Node.js o MySQL a una versión más reciente       │
│                 sin romper la funcionalidad de StreamPro                   │
│                                                                             │
│  ⏱ Duración estimada:  1 - 2 horas                                         │
│                                                                             │
│  ⚠ Nivel de riesgo:     BAJO a MEDIO                                       │
│                                                                             │
│  🔧 Complejidad:         ●●○○○                                             │
│                                                                             │
│  📦 ¿Qué versión tienes y a cuál quieres ir?                                │
│                                                                             │
│    ☐ Node.js 22.x → Node.js 24.x                                           │
│    ☐ MySQL 8 (XAMPP) → MySQL 9                                             │
│    ☐ Ambos                                                                  │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

## Pre-requisitos

```
☐ Backup completo de BD (por seguridad)
☐ Backup de package.json (por si toca revertir dependencias)
☐ npm list --depth=0 ejecutado para saber las versiones actuales
☐ Conexión a internet para descargar nuevas versiones
```

## Las Jugadas (Plays)

### Jugada 3.1: Actualizar Node.js

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 3.1 — ACTUALIZAR NODE.JS                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🪟 En Windows:                                                             │
│  ────────────────────────────────────────────                               │
│  PASO 1: Descarga el instalador de Node.js 24.x desde                      │
│          https://nodejs.org/es/download                                    │
│                                                                             │
│  PASO 2: Ejecuta el instalador — el asistente reemplazará la versión       │
│          anterior automáticamente                                           │
│                                                                             │
│  PASO 3: Verifica la nueva versión                                          │
│  ────────────────────────────────────────────                               │
│  node -v   # Debe mostrar v24.x.x                                           │
│  npm -v    # Debe mostrar la versión de npm que viene con Node 24          │
│                                                                             │
│  🐧 En Linux (VPS):                                                         │
│  ────────────────────────────────────────────                               │
│  PASO 1: Instala Node.js 24.x                                               │
│  curl -fsSL https://deb.nodesource.com/setup_24.x -o nodesetup.sh          │
│  sudo bash nodesetup.sh                                                     │
│  sudo apt install nodejs -y                                                  │
│                                                                             │
│  PASO 2: Verifica                                                           │
│  node -v   # Debe mostrar v24.x.x                                           │
│                                                                             │
│  ⚠ PARA AMBOS SISTEMAS:                                                    │
│  ────────────────────────────────────────────                               │
│  PASO 3: Reconstruye dependencias nativas (por si cambiaron)               │
│  rm -rf node_modules                                                        │
│  npm install                                                                │
│                                                                             │
│  PASO 4: Prueba que StreamPro sigue funcionando                             │
│  node app.js                                                                │
│  # Debe mostrar: conexion exitosa + http://localhost:3000                  │
│                                                                             │
│  PASO 5: Verifica que no hay vulnerabilidades nuevas                        │
│  npm audit                                                                  │
│                                                                             │
│  ✅ VERIFICACIÓN:                                                           │
│     • node -v → v24.x.x                                                     │
│     • La app arranca sin errores                                            │
│     • Todas las funcionalidades del PLAY 4 (pruebas) funcionan             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 3.2: Actualizar MySQL

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 3.2 — ACTUALIZAR MySQL                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ⚠ IMPORTANTE: MySQL 8 → 9 es un upgrade mayor.                            │
│     Respaldar TODO antes de empezar.                                        │
│                                                                             │
│  🪟 En Windows (XAMPP):                                                     │
│  ────────────────────────────────────────────                               │
│  PASO 1: Descarga la nueva versión de XAMPP que incluya MySQL 9           │
│          desde https://www.apachefriends.org                                │
│                                                                             │
│  PASO 2: Detén MySQL desde el panel de XAMPP                                │
│                                                                             │
│  PASO 3: Respalda la BD (por si acaso)                                      │
│  "C:\xampp\mysql\bin\mysqldump" -u root stream_pro > upgrade_pre.sql      │
│                                                                             │
│  PASO 4: Ejecuta el instalador de XAMPP — reemplazará la versión anterior  │
│                                                                             │
│  PASO 5: Inicia MySQL y verifica                                            │
│  mysql --version  # Debe mostrar 9.x                                        │
│                                                                             │
│  PASO 6: Verifica que la BD y los datos están intactos                      │
│  mysql -u root -p stream_pro -e "SHOW TABLES;"                             │
│  mysql -u root -p stream_pro -e "SELECT COUNT(*) FROM peliculas;"         │
│                                                                             │
│  🐧 En Linux (VPS):                                                         │
│  ────────────────────────────────────────────                               │
│  sudo apt update                                                            │
│  sudo apt upgrade mysql-server -y   # Si está en los repos                 │
│  # O sigue la guía oficial de MySQL para upgrade                            │
│  mysql_upgrade -u root -p                                                   │
│  systemctl restart mysql                                                    │
│                                                                             │
│  ✅ VERIFICACIÓN:                                                           │
│     • mysql --version → 9.x                                                 │
│     • SHOW TABLES → 8 tablas intactas                                      │
│     • SELECT COUNT(*) → mismos registros que antes                         │
│     • node app.js → "conexion exitosa"                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 3.R: Rollback

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 3.R — ROLLBACK DE VERSIÓN                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Node.js: Desinstala la nueva versión e instala la anterior                │
│  MySQL:   Restaura desde el backup (upgrade_pre.sql)                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# PLAY 4: CAMBIO DE EQUIPO

## Tarjeta del Play

```
┌────────────────────────────────────────────────────────────────────────────┐
│  PLAY 4: CAMBIO DE EQUIPO DE DESARROLLO                                    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🎯 Objetivo:  Trasladar el entorno completo de StreamPro                   │
│                 de una PC a otra                                            │
│                                                                             │
│  ⏱ Duración estimada:  1 hora                                               │
│                                                                             │
│  ⚠ Nivel de riesgo:     BAJO                                                │
│                                                                             │
│  🔧 Complejidad:         ●●○○○                                              │
│                                                                             │
│  📦 ¿Qué se necesita instalar en la PC nueva?                              │
│     ☐ Node.js 22.x                                                          │
│     ☐ XAMPP (con MySQL)                                                     │
│     ☐ Git (opcional)                                                        │
│     ☐ Editor de código (VS Code)                                            │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

## Las Jugadas (Plays)

### Jugada 4.1: Preparar PC nueva

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 4.1 — INSTALAR SOFTWARE EN LA PC NUEVA                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASO 1: Instala XAMPP desde https://www.apachefriends.org                 │
│  ────────────────────────────────────────────                               │
│  • Ejecuta el instalador                                                    │
│  • Ruta recomendada: C:\xampp                                              │
│                                                                             │
│  PASO 2: Inicia MySQL desde el panel de XAMPP                               │
│  ────────────────────────────────────────────                               │
│  • Abre XAMPP Control Panel                                                 │
│  • Click en "Start" junto a MySQL                                           │
│  • Verifica que el indicador se ponga verde                                 │
│                                                                             │
│  PASO 3: Instala Node.js 22.x                                               │
│  ────────────────────────────────────────────                               │
│  • Descarga desde https://nodejs.org                                        │
│  • Ejecuta el instalador                                                    │
│  • Asegúrate de marcar "Add to PATH"                                       │
│  • Verifica: node -v  →  v22.x.x                                           │
│                                                                             │
│  PASO 4: (Opcional) Instala Git y VS Code                                   │
│  ────────────────────────────────────────────                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 4.2: Transferir el proyecto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 4.2 — MOVER EL PROYECTO A LA PC NUEVA                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Opción A — Usando USB o disco compartido:                                 │
│  ────────────────────────────────────────────                               │
│  PASO 1: En la PC vieja, copia toda la carpeta StreamPro a un USB          │
│  PASO 2: En la PC nueva, pega la carpeta en C:\Stream\                     │
│                                                                             │
│  Opción B — Usando Git (si el proyecto está en GitHub):                    │
│  ────────────────────────────────────────────                               │
│  git clone https://github.com/tu-usuario/streampro.git                      │
│  cd streampro                                                               │
│                                                                             │
│  PARA AMBAS OPCIONES:                                                       │
│  ────────────────────────────────────────────                               │
│  PASO 3: Instala las dependencias                                           │
│  cd C:\Stream\StreamPro                                                     │
│  npm install                                                                │
│                                                                             │
│  PASO 4: Crea la base de datos                                              │
│  • Abre http://localhost/phpmyadmin                                         │
│  • Click en "Nueva", nombre: stream_pro                                    │
│  • Cotejamiento: utf8mb4_general_ci                                        │
│  • Click en "Crear"                                                         │
│  • Ve a la pestaña SQL y pega el contenido de database/stream_pro_schema.sql│
│  • Click en "Continuar"                                                     │
│                                                                             │
│  PASO 5: Inicia la app                                                      │
│  node app.js                                                                │
│  # Debe mostrar: conexion exitosa + http://localhost:3000                  │
│                                                                             │
│  ✅ VERIFICACIÓN: Abre http://localhost:3000 → StreamPro funciona          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Jugada 4.3: Migrar datos (si es necesario)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  JUGADA 4.3 — MIGRAR DATOS DESDE LA PC VIEJA (opcional)                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ⚠ SOLO si tenías datos en la PC vieja que quieres conservar               │
│                                                                             │
│  PASO 1: En la PC vieja, exporta la BD                                      │
│  ────────────────────────────────────────────                               │
│  mysqldump -u root stream_pro > stream_pro_datos.sql                        │
│                                                                             │
│  PASO 2: Pasa el archivo a la PC nueva (USB, red, etc.)                    │
│                                                                             │
│  PASO 3: En la PC nueva, importa los datos                                  │
│  ────────────────────────────────────────────                               │
│  mysql -u root stream_pro < stream_pro_datos.sql                            │
│                                                                             │
│  PASO 4: Verifica                                                           │
│  mysql -u root -e "USE stream_pro; SELECT COUNT(*) FROM peliculas;"        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# PLAY 0: PRUEBAS DE VERIFICACIÓN (APLICA A TODOS)

Este play se ejecuta SIEMPRE al final de cualquier migración para confirmar que StreamPro funciona correctamente.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PRUEBAS DE VERIFICACIÓN — APLICA A TODOS LOS PLAYS                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🟢 PRUEBAS ESENCIALES (deben pasar SÍ o SÍ):                              │
│                                                                             │
│  ☐ La Landing Page carga en http://localhost:3000                          │
│  ☐ El login funciona con un usuario válido → redirige a /home              │
│  ☐ El login funciona con un administrador                                  │
│  ☐ El registro de un nuevo usuario funciona                                │
│  ☐ El dashboard muestra películas y series                                │
│  ☐ Al hacer clic en una película, el video se reproduce                    │
│  ☐ La búsqueda de películas por título funciona                            │
│                                                                             │
│  🟡 PRUEBAS DE ADMINISTRACIÓN:                                              │
│                                                                             │
│  ☐ Crear una nueva película → aparece en el catálogo                      │
│  ☐ Editar una película → los cambios se guardan                            │
│  ☐ Eliminar una película → desaparece del catálogo                        │
│  ☐ Crear una serie con temporada y capítulo                                │
│  ☐ Eliminar una serie → temporada y capítulo se borran también            │
│                                                                             │
│  🔵 PRUEBAS DE SERVICIOS EXTERNOS:                                          │
│                                                                             │
│  ☐ Al hacer clic en "Suscribirse" → redirige a MercadoPago                │
│  ☐ Al solicitar recuperar contraseña → llega el correo con el token       │
│  ☐ El token de 8 dígitos permite cambiar la contraseña                    │
│                                                                             │
│  🟠 PRUEBAS DE CARGA:                                                        │
│                                                                             │
│  ☐ Abrir 5 pestañas simultáneas → todas cargan sin error                  │
│  ☐ Reproducir video en 3 pestañas a la vez → sin cortes ni lag            │
│  ☐ Tiempo de respuesta < 2s bajo carga normal                             │
│  ☐ Sin errores 500/503/504 al simular múltiples usuarios                  │
│                                                                             │
│  ⚫ PRUEBAS DE SEGURIDAD:                                                   │
│                                                                             │
│  ☐ npm audit → 0 vulnerabilidades críticas                                │
│  ☐ Las contraseñas en BD están encriptadas (hash bcrypt)                  │
│  ☐ Los archivos de configuración con claves NO están en el repositorio    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## REFERENCIAS BIBLIOGRÁFICAS

1. **ISO/IEC/IEEE 14764:2022.** (2022). *Ingeniería de software — Procesos del ciclo de vida del software — Mantenimiento* (3.ª ed.). Organización Internacional de Normalización.

2. **Node.js Foundation.** (2026). *Documentación oficial de Node.js — Guías de migración*. Recuperado de https://nodejs.org/es/docs/

3. **MySQL, Oracle Corporation.** (2026). *Manual de referencia de MySQL 8.4 — Migración y actualización*. Recuperado de https://dev.mysql.com/doc/refman/8.4/en/migration.html

4. **Amazon Web Services.** (2026). *Documentación de Amazon S3 y CloudFront*. Recuperado de https://aws.amazon.com/es/documentation/

5. **PM2.** (2026). *PM2 — Gestor de procesos para Node.js*. Recuperado de https://pm2.keymetrics.io/

6. **Nginx.** (2026). *Documentación oficial — Proxy inverso*. Recuperado de https://nginx.org/en/docs/

7. **Certbot / Let's Encrypt.** (2026). *Certbot — Obtén certificados SSL gratuitos*. Recuperado de https://certbot.eff.org/

8. **Mercado Pago Developers.** (2026). *Documentación para desarrolladores — Integración de pagos*. Recuperado de https://www.mercadopago.com.co/developers

9. **Nodemailer.** (2026). *Nodemailer — Envío de correos con Node.js*. Recuperado de https://nodemailer.com/

10. **Express.js.** (2026). *Express — Mejores prácticas de seguridad en producción*. Recuperado de https://expressjs.com/en/advanced/best-practice-security.html

11. **SENA — Servicio Nacional de Aprendizaje.** (2026). *Material de formación: Análisis y Desarrollo de Software — Mantenimiento de Software*. Centro de Gestión de Mercados, Logística y Tecnologías de la Información, Regional Distrito Capital, Bogotá, Colombia.

12. **Pressman, R. S.** (2010). *Ingeniería del software: Un enfoque práctico* (7.ª ed.). McGraw-Hill Education.

13. **OWASP Foundation.** (2026). *OWASP Cheat Sheet Series — Data Protection*. Recuperado de https://cheatsheetseries.owasp.org/

---

*Documento elaborado como evidencia de aprendizaje para el componente formativo de Mantenimiento y Soporte de Software.*

*Playbook de Migración — StreamPro*

*SENA — Servicio Nacional de Aprendizaje, Colombia — 2026*
