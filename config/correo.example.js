const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "TU_CORREO@gmail.com",
        pass: "TU_CONTRASEÑA_DE_APLICACION"
    }
});

transporter.verify().then(() => {
    console.log("Correo configurado correctamente");
}).catch(err => {
    console.error("Error en configuración de correo:", err);
});

module.exports = transporter;
