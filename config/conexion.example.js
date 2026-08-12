const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "TU_HOST",
    user: "TU_USUARIO",
    password: "TU_CONTRASEÑA",
    database: "TU_BASE_DE_DATOS"
});

conexion.connect((err) => {
    if(err){
        console.error("conexion fallida", err);
        return;
    }
    console.log("conexion exitosa");
});

module.exports = conexion;
