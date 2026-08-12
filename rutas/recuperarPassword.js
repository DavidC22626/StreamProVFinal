const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const transporter = require("../config/correo");
const { v4: uuidv4 } = require("uuid");

router.post("/enviar-token", async function (req, res) {
    try {
        const { email, tabla } = req.body;

        if (!['usuarios', 'administradores'].includes(tabla)) {
            return res.json({ success: false, message: "Tabla no válida" });
        }

        const campoCorreo = tabla === "usuarios" ? "correo_user" : "correo_adm";
        const sql = "SELECT * FROM ?? WHERE ?? = ?";

        conexion.query(sql, [tabla, campoCorreo, email], async function (error, rows) {
            if (error) {
                console.error("Error en consulta:", error);
                return res.json({ success: false, message: "Error en el servidor" });
            }

            if (rows.length < 1) {
                return res.json({ success: false, message: "El correo no está registrado" });
            }

            const token = uuidv4().substring(0, 8).toUpperCase();
            const expiracion = new Date(Date.now() + 15 * 60 * 1000);

            conexion.query(
                "INSERT INTO tokens_recuperacion (token, correo, tabla, expiracion) VALUES (?, ?, ?, ?)",
                [token, email, tabla, expiracion],
                async function (err) {
                    if (err) {
                        console.error("Error guardando token:", err);
                        return res.json({ success: false, message: "Error en el servidor" });
                    }

                    const mailOptions = {
                        from: '"StreamPro" <noreply@streampro.com>',
                        to: email,
                        subject: "Código de recuperación de contraseña",
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px;">
                                <h2 style="color: #e50914;">StreamPro - Recuperación de contraseña</h2>
                                <p>Has solicitado recuperar el acceso a tu cuenta.</p>
                                <p>Tu código de verificación es:</p>
                                <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                                    ${token}
                                </div>
                                <p>Este código expira en <strong>15 minutos</strong>.</p>
                                <p>Si no solicitaste este código, ignora este correo.</p>
                            </div>
                        `
                    };

                    try {
                        await transporter.sendMail(mailOptions);
                        res.json({ success: true, message: "Código enviado a tu correo" });
                    } catch (mailError) {
                        console.error("Error enviando correo:", mailError);
                        res.json({ success: true, message: "Código generado (verificar configuración de correo)" });
                    }
                }
            );
        });
    } catch (error) {
        console.error("Error:", error);
        res.json({ success: false, message: "Error en el servidor" });
    }
});

router.post("/verificar-token", function (req, res) {
    const { token } = req.body;

    conexion.query(
        "SELECT * FROM tokens_recuperacion WHERE token = ? AND expiracion > NOW() AND usado = 0",
        [token],
        function (error, rows) {
            if (error) {
                return res.json({ success: false, message: "Error en el servidor" });
            }

            if (rows.length < 1) {
                return res.json({ success: false, message: "Token inválido o expirado" });
            }

            res.json({ success: true, tabla: rows[0].tabla, correo: rows[0].correo });
        }
    );
});

router.post("/cambiar-password", async function (req, res) {
    try {
        const { token, nuevaPassword } = req.body;
        const bcrypt = require("bcrypt");

        conexion.query(
            "SELECT * FROM tokens_recuperacion WHERE token = ? AND expiracion > NOW() AND usado = 0",
            [token],
            async function (error, rows) {
                if (error || rows.length < 1) {
                    return res.json({ success: false, message: "Token inválido o expirado" });
                }

                const datos = rows[0];
                const hash = await bcrypt.hash(nuevaPassword, 10);

                let sqlUpdate;
                if (datos.tabla === "usuarios") {
                    sqlUpdate = "UPDATE usuarios SET passw_user = ? WHERE correo_user = ?";
                } else {
                    sqlUpdate = "UPDATE administradores SET passw_adm = ? WHERE correo_adm = ?";
                }

                conexion.query(sqlUpdate, [hash, datos.correo], function (err) {
                    if (err) {
                        return res.json({ success: false, message: "Error actualizando contraseña" });
                    }

                    conexion.query("UPDATE tokens_recuperacion SET usado = 1 WHERE token = ?", [token]);

                    res.json({ success: true, message: "Contraseña actualizada correctamente" });
                });
            }
        );
    } catch (error) {
        console.error("Error:", error);
        res.json({ success: false, message: "Error en el servidor" });
    }
});

module.exports = router;
