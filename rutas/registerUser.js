const express = require("express");
const router = express.Router();
const conexion = require("../config/conexion");
const link = require("../config/link");
const bcrypt = require("bcrypt");

router.post("/registerUser", async function(req, res){
    let nombre = req.body.NombreUsuario;
    let nacionalidad = req.body.Nacionalidad;
    let telefono = req.body.numeroTelefonico;
    let correo = req.body.Email;
    let password = req.body.Password;
    let confirmPassword = req.body.ConfirmPassword;
    let mensaje = "";

    function validarTelefono (telefono) {
        if(parseInt(telefono).toString().length == 10){
            return true;
        }else{
            mensaje = mensaje + " Teléfono no válido";
            return false;
        }
    }

    function compararContaseñas (password, confirmPassword){
        if(password == confirmPassword){
            return true;
        }else{
            mensaje = mensaje + " Las contraseñas no coinciden";
            //res.render("registerUser", {mensaje, link});
            return false;
        }
    }


    if(validarTelefono(telefono) && compararContaseñas(password, confirmPassword)){
        const validar = "SELECT * FROM usuarios WHERE telefono_user = ?"
        conexion.query(validar, [telefono], function(error, rows){
            if(error){
                return res.status(500).send("Error en el servidor");
            }else {
                if(rows.length < 1){
                    const validar1 = "SELECT * FROM usuarios WHERE correo_user = ?"
                    conexion.query(validar1, [correo], async function(error, rows){
                        if(error){
                            return res.status(500).send("Error en el servidor");
                        }else {
                            if(rows.length < 1){
                                try{
                                    const hashedPas = await bcrypt.hash(password, 10);

                                    const insertar = "INSERT INTO usuarios (nombre_user, nacionalidad_user, telefono_user, correo_user, passw_user, fecha_regis_user, cod_scrip_user) VALUES (?, ?, ?, ?, ?, ?, ?);"

                                    conexion.query(insertar, [nombre, nacionalidad, telefono, correo, hashedPas, new Date(), null], function(err){
                                    if(err){
                                        return res.status(500).send("Error al registrar usuario");
                                    }else{
                                        mensaje = "Resgistro exitoso, ya puedes iniciar sesión";
                                        res.render("login", {mensaje, link});
                                    }            
                                    });
                                }catch(error){
                                    console.error("Error al registrar ", error);
                                    res.status(500).send("Error en el servidor");
                                }
                            }else{
                                mensaje = "no se puede hacer el registro, el correo ya existe";
                                res.render("registerUser", {mensaje, link});
                            }
                        }
                    });
                }else{
                    mensaje = "No se puede realizar el registro, el numero ya existe";
                    res.render("registerUser", {mensaje, link});
                }
            }
        });
    }else{
        mensaje = "El telefono no es valido o las contraseñas no coinciden";
        res.render("registerUser", {mensaje, link});
    }
});

module.exports = router; 
