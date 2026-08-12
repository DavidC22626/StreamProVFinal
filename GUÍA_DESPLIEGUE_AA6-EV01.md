# GUÍA DE DESPLIEGUE PARA EVIDENCIA GA10-220501097-AA6-EV01
## Despliegue de StreamPro en Render.com con Base de Datos MySQL en Aiven.io

---

## REQUISITOS PREVIOS
1. Cuenta en GitHub (con el proyecto StreamPro subido)
2. Cuenta en Render.com
3. Cuenta en Aiven.io
4. (Opcional) Cuenta en Freenom para dominio gratuito

---

## PASO 1: PREPARAR EL REPOSITORIO GITHUB
1. Asegúrate de tener tu proyecto StreamPro en un repositorio GitHub.
2. Verifica que el archivo `config/conexion.js` esté configurado para usar variables de entorno (como se modificó anteriormente).
3. Asegúrate de que tu `package.json` tenga un script de inicio correcto:
   ```json
   "scripts": {
     "start": "node app.js",
     "test": "echo \"Error: no test specified\" && exit 1"
   }
   ```
4. (Recomendado) Añade un archivo `.gitignore` que excluya `node_modules` y `.env` si lo usas localmente.

---

## PASO 2: CREAR BASE DE DATOS EN AIVEN.IO
1. Regístrate en [Aiven.io](https://aiven.io/) y crea un nuevo proyecto.
2. Dentro del proyecto, crea un nuevo servicio de tipo **MySQL**.
3. Elige el plan **Hobbyist** (gratuito).
4. Configura el servicio:
   - Nombre del servicio: `streampro-mysql`
   - Región: Elige la más cercana a ti.
   - Deja las demás opciones por defecto.
5. Espera a que el servicio se active (puede tomar unos minutos).
6. Una vez activo, ve a la pestaña **Overview** y luego a **Connection info**.
   - Anota los siguientes valores:
     - Host
     - Puerto
     - Usuario
     - Contraseña
     - Base de datos predeterminada (normalmente `defaultdb` o el nombre que especificaste)
7. En la pestaña **Users**, asegúrate de que el usuario tenga permisos suficientes o crea un nuevo usuario si es necesario.
8. (Opcional pero recomendado para pruebas) En la pestaña **Security > IP whitelist**, añade `0.0.0.0/0` para permitir conexiones desde cualquier IP (solo para pruebas, en producción restringe a las IPs de Render).
9. Guarda estas credenciales de forma segura.

---

## PASO 3: CREAR SERVICIO EN RENDER.COM
1. Regístrate en [Render.com](https://render.com/) usando tu cuenta de GitHub.
2. En el dashboard, haz clic en **"New"** y luego en **"Web Service"**.
3. Conecta tu cuenta de GitHub y selecciona el repositorio de StreamPro.
4. Configura el servicio:
   - **Name**: `streampro` (o el nombre que prefieras)
   - **Region**: Elige la más cercana a tu base de datos en Aiven (para reducir latencia).
   - **Branch**: `main` (o la rama que quieras desplegar)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - **Plan**: Selecciona **Free**.
5. Haz clic en **"Create Web Service"**.
6. Render comenzará a construir y desplegar tu servicio.

---

## PASO 4: CONFIGURAR VARIABLES DE ENTORNO EN RENDER
1. Mientras el servicio se está desplegando (o después), ve a la pestaña **Environment** de tu servicio en Render.
2. Añade las siguientes variables de entorno (usa los valores obtenidos de Aiven):
   - `DB_HOST`: [Host de Aiven]
   - `DB_PORT`: [Puerto de Aiven] (generalmente 15xxx o 20xxx)
   - `DB_USER`: [Usuario de Aiven]
   - `DB_PASSWORD`: [Contraseña de Aiven]
   - `DB_NAME`: [Nombre de la base de datos en Aiven, ej: `defaultdb`]
3. Guarda los cambios. Render reiniciará automáticamente el servicio.

---

## PASO 5: VERIFICAR EL DESPLIEGUE
1. Espera a que el despliegue se complete (puedes ver los logs en la pestaña **Logs**).
2. Una vez que el despliegue sea exitoso, Render te proporcionará una URL pública (ej: `https://streampro.onrender.com`).
3. Haz clic en la URL o copia y pégala en un navegador.
4. Deberías ver la página de inicio de tu aplicación StreamPro.
5. Prueba el registro de un nuevo usuario y el inicio de sesión para verificar que la conexión a la base de datos funciona.

---

## PASO 6: (OPCIONAL) CONFIGURAR DOMINIO GRATUITO CON FREENOM
1. Regístrate en [Freenom](https://www.freenom.com/).
2. Busca un dominio gratuito disponible (ej: `streampro.tk`, `streampro.ml`, etc.) y regístralo.
3. En el panel de Freenom, ve a **Management Tools** -> **Nameservers** y selecciona **"Use custom nameservers"**.
4. Introduce los nameservers de Render (puedes encontrarlos en la documentación de Render o al intentar añadir un dominio custom en Render; típicamente son:
   - `ns1.render.com`
   - `ns2.render.com`
5. Guarda los cambios.
6. En Render, ve a la pestaña **Custom Domains** de tu servicio y añade tu dominio de Freenom (ej: `streampro.tk`).
7. Render te dará instrucciones para verificar el dominio (normalmente mediante un registro TXT o CNAME). Sigue esas instrucciones en el panel de Freenom.
8. Una vez verificado, tu sitio estará disponible tanto en el subdominio de Render como en tu dominio gratuito de Freenom.

---

## PASO 7: DOCUMENTAR PARA EL INFORME
Para tu informe de evidencia, toma capturas de pantalla de:
1. El servicio MySQL activo en Aiven.
2. Las variables de entorno configuradas en Render.
3. El log de despliegue exitoso en Render.
4. La URL pública de tu aplicación en el navegador.
5. Pruebas de funcionamiento (registro de usuario, inicio de sesión).
6. (Opcional) El dominio de Freenom configurado y resolviendo a tu sitio.

Incluye estas capturas en tu documento junto con el paso a paso detallado.

---

## SOLUCIÓN DE PROBLEMAS COMUNES
- **Error de conexión a la base de datos**: 
  - Verifica que las variables de entorno en Render coincidan exactamente con las de Aiven.
  - Asegúrate de que la IP de Render esté permitida en la whitelist de Aiven (usar `0.0.0.0/0` temporalmente para pruebas).
  - Revisa los logs de Render para mensajes de error específicos.
- **El servicio no inicia o se cae inmediatamente**:
  - Revisa los logs de Render en tiempo real.
  - Asegúrate de que el comando de inicio sea `node app.js` y que `app.js` esté en la raíz del repositorio.
  - Verifica que no haya errores de sintaxis en tu código que pasaran por alto en desarrollo.
- **El despliegue falla en la fase de build**:
  - Asegúrate de que `package.json` esté en la raíz y que `npm install` pueda ejecutarse sin errores.
  - Elimina el archivo `package-lock.json` y vuelve a intentarlo si hay problemas de dependencias.

---

## CONCLUSIONES
Con esta guía, has desplegado exitosamente una aplicación Node.js con base de datos MySQL en plataformas gratuitas, cumpliendo con los requisitos de la evidencia GA10-220501097-AA6-EV01. Este enfoque demuestra competencias en:
- Despliegue de aplicaciones full-stack en la nube
- Gestión de bases de datos externas
- Configuración de variables de entorno
- Integración de servicios de terceros
- Documentación de procesos técnicos

Recuerda que los planes gratuitos tienen limitaciones (como el sueño de Render después de inactividad) y son ideales para pruebas y demostraciones. Para uso en producción, considera actualizar a planes pagos.

---