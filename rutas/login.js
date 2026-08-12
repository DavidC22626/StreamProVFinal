const express = require("express");
const router = express.Router();
const link = require("../config/link");
const conexion = require("../config/conexion");
const bcrypt = require("bcrypt");

router.post("/login", function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const tabla = req.body.tabla;
        const campoCorreoBD = req.body.campoCorreoBD;

        // Validar que la tabla sea permitida (seguridad)
        if (!['usuarios', 'administradores'].includes(tabla)) {
            return res.json({ success: false, message: 'Tabla no válida' });
        }

        //Usar ?? para nombres de tabla y columnas (previene SQL injection)
        const validar = "SELECT * FROM ?? WHERE ?? = ?";

        conexion.query(validar, [tabla, campoCorreoBD, email], async function (error, rows) {
            if (error) {
                console.log("Error en la validación: ", error);
                return res.json({ success: false, message: 'Error en el servidor' });
            }

            if (rows.length < 1) {
                return res.json({ success: false, message: 'El email ingresado no existe' });
            }

            // Validar contraseña
            const usuario = rows[0];
            let passwordValida;
            if (tabla.trim() == "usuarios") {
                passwordValida = await bcrypt.compare(password, usuario.passw_user);
            } else {
                passwordValida = await bcrypt.compare(password, usuario.passw_adm);
            }

            if (!passwordValida) {
                return res.json({ success: false, message: 'Contraseña incorrecta' });
            }

            if (tabla.trim() == "usuarios") {
                // Login exitoso - guardar sesión
                req.session.login = true;
                req.session.codUser = usuario.cod_user;
                req.session.nombreUser = usuario.nombre_user;
                req.session.nacionalidadUser = usuario.nacionalidad_user;
                req.session.telefonoUser = usuario.telefono_user;
                req.session.correoUser = usuario.correo_user;
                req.session.passwUser = usuario.passw_user;
                req.session.fechaRegisUser = usuario.fecha_regis_user;
                req.session.codScripUser = usuario.cod_scrip_user;
                req.session.tipo = tabla; // Guardar si es admin o usuario
                delete req.session.codAdm;
                delete req.session.nombreAdm;
                delete req.session.correoAdm;
                delete req.session.passwAdm;
                console.log("Login exitoso:", req.session);

                // Devolver JSON
                res.json({
                    success: true,
                    message: 'Bienvenido'
                });
            } else {
                // Login exitoso - guardar sesión
                req.session.login = true;
                req.session.codAdm = usuario.cod_adm;
                req.session.nombreAdm = usuario.nombre_adm;
                req.session.correoAdm = usuario.correo_adm;
                req.session.passwAdm = usuario.passw_adm;
                req.session.tipo = tabla; // Guardar si es admin o usuario
                delete req.session.codUser;
                delete req.session.nombreUser;
                delete req.session.nacionalidadUser;
                delete req.session.telefonoUser;
                delete req.session.correoUser;
                delete req.session.passwUser;
                delete req.session.fechaRegisUser;
                delete req.session.codScripUser;
                console.log("Login exitoso:", req.session);
                
                
                // Devolver JSON
                res.json({
                    success: true,
                    message: 'Bienvenido'
                });
            }



        });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: 'Error en el servidor' });
    }
});

module.exports = router;