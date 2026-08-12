const express = require("express");
const router = express.Router();
const link = require("../config/link");
const conexion = require("../config/conexion");
const { error } = require("console");



//Mostrar la pagina home
router.get("/home", function (req, res) {
    if (!req.session.login) {
        res.render("login", { link });
    } else {
        console.log("Voy a renderizar el home");
        console.log("datos: " + req.session.tipo);
        res.render("home", { datosSesion: req.session, link });
    }
});

// Obtener todas  las peliculas
router.get("/api/peliculas", async (req, res) => {
    try {
        // Query para obtener todas las películas de la BD
        const query = "SELECT * FROM peliculas";
        conexion.query(query, (error, resultados) => {
            if (error) {
                console.error("Error al obtener películas:", error);
                return res.json({
                    exito: false,
                    error: "Error al obtener películas"
                });
            }
            // Responde con todas las películas
            res.json({
                exito: true,
                peliculas: resultados
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.json({
            exito: false,
            error: error.message
        });
    }
});

// Agregar una pelicula a la base de datos
router.post("/api/agregar-pelicula", async (req, res) => {
    try {
        const { titulo, categoria, anio, duracion, director, imagen, video, descripcion } = req.body;

        console.log("Datos recibidos: " + { titulo, categoria, anio, duracion, director, imagen, video, descripcion });

        if (!titulo || !anio || !categoria) {
            return res.json({
                exito: false,
                error: "El titulo, anio y categoria son requeridos"
            });
        }

        const query = "INSERT INTO peliculas (titulo_pel, descrip_pel, duracion_pel, clasifi_pel, year_lanza_pel, director_pel, ruta_pel, ruta_img_pel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        conexion.query(query, [titulo, descripcion, duracion, categoria, anio, director, video, imagen], (error, resultados) => {

            // Verifica si hay error
            if (error) {
                console.error("Error en la query:", error);

                // Responde con error
                return res.json({
                    exito: false,
                    error: "Error al guardar la película"
                });
            }

            // resultados.insertId es el ID asignado por MySQL a la película nueva
            console.log("Película guardada, ID:", resultados.insertId);

            // Responde con éxito e incluye los datos guardados
            res.json({
                exito: true,
                mensaje: "Película guardada correctamente",
                pelicula: {
                    //id: resultados.insertId,
                    titulo: titulo,
                    categoria: categoria,
                    anio: anio,
                    duracion: duracion,
                    director: director,
                    imagen: imagen,
                    video: video,
                    descripcion: descripcion
                }
            });
        });
    } catch {
        console.error("Error:", error);
        res.json({
            exito: false,
            error: error.message
        });
    }
})

//Obtener pelicula por ID para rellenar crudmodal para actualizar
router.get("/api/pelicula/:id", async (req, res) => {
    try {
        const id = req.params.id;

        console.log("Buscando película con ID:", id);

        // Query para obtener una película específica
        const query = "SELECT * FROM peliculas WHERE cod_pel = ?";

        conexion.query(query, [id], (error, resultados) => {
            if (error) {
                console.error("Error al obtener película:", error);
                return res.json({
                    exito: false,
                    error: "Error al obtener película"
                });
            }

            // Si no existe la película
            if (resultados.length === 0) {
                return res.json({
                    exito: false,
                    error: "Película no encontrada"
                });
            }

            // Responde con la película encontrada
            res.json({
                exito: true,
                pelicula: resultados[0]
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.json({
            exito: false,
            error: error.message
        });
    }
});

// obtener pelicula por titulo
router.get("/api/buscar-pelicula-titulo", async (req, res) => {
    try {
        const titulo = req.query.titulo.trim();

        console.log("Buscando película con titulo:", titulo);

        // Query para obtener una película específica
        const query = "SELECT * FROM peliculas WHERE titulo_pel = ?";

        conexion.query(query, [titulo], (error, resultados) => {
            if (error) {
                console.error("Error al obtener película:", error);
                return res.json({
                    error: "Error al obtener película"
                });
            }
            // Si no existe la película
            if (resultados.length === 0) {
                return res.json({
                    exito: false,
                    mensaje: "Película no encontrada"
                });
            }
            // Responde con la película encontrada
            res.json({
                exito: true,
                mensaje: "Pelicula encontrada"
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.json({
            error: error.message
        });
    }
});

//Actualizar pelicula por titulo
router.put("/api/actualizar-pelicula/:title", async (req, res) => {
    try {
        const title = req.params.title;
        const { titulo, categoria, anio, duracion, director, imagen, video, descripcion } = req.body;

        console.log("Actualizando película titulo:", title, "con datos:", { titulo, categoria, anio, duracion, director, imagen, video, descripcion });

        if (!titulo || !anio || !categoria) {
            return res.json({
                exito: false,
                error: "El título, anio y categoría son requeridos"
            });
        }

        // Query para actualizar (UPDATE)
        const query = "UPDATE peliculas SET titulo_pel = ?, clasifi_pel = ?, year_lanza_pel = ?, director_pel = ?, ruta_img_pel = ?, ruta_pel = ?, descrip_pel = ?, duracion_pel = ? WHERE titulo_pel = ?";

        conexion.query(query, [titulo, categoria, anio, director, imagen, video, descripcion, duracion, title], (error, resultados) => {
            if (error) {
                console.error("Error en la query:", error);
                return res.json({
                    exito: false,
                    error: "Error al actualizar la película"
                });
            }

            // affectedRows indica cuántas filas fueron modificadas
            if (resultados.affectedRows === 0) {
                return res.json({
                    exito: false,
                    error: "Película no encontrada"
                });
            }

            console.log("Película actualizada exitosamente");

            res.json({
                exito: true,
                mensaje: "Película actualizada correctamente",
                pelicula: {
                    titulo: titulo,
                    categoria: categoria,
                    anio: anio,
                    imagen: imagen,
                    video: video,
                    descripcion: descripcion
                }
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.json({
            exito: false,
            error: error.message
        });
    }
});

//Eliminar pelicula
router.delete("/api/eliminar-pelicula/:id", async (req, res) => {
    try {
        const id = req.params.id;

        console.log("Eliminando película ID:", id);

        // Query para eliminar (DELETE)
        const query = "DELETE FROM peliculas WHERE cod_pel = ?";

        conexion.query(query, [id], (error, resultados) => {
            if (error) {
                console.error("Error en la query:", error);
                return res.json({
                    exito: false,
                    error: "Error al eliminar la película"
                });
            }

            // affectedRows indica cuántas filas fueron eliminadas
            if (resultados.affectedRows === 0) {
                return res.json({
                    exito: false,
                    error: "Película no encontrada"
                });
            }

            console.log("Película eliminada exitosamente");

            res.json({
                exito: true,
                mensaje: "Película eliminada correctamente"
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.json({
            exito: false,
            error: error.message
        });
    }
});

// Buscar peliculas por titulo
router.get("/api/buscar-pelicula", async (req, res) => {
    try {
        // Obtiene el término de búsqueda de los query parameters
        const busqueda = req.query.titulo;

        console.log("Buscando películas con título:", busqueda);

        if (!busqueda || busqueda.trim() === "") {
            return res.json({
                exito: false,
                error: "Ingresa un término de búsqueda"
            });
        }

        // Query con LIKE para búsqueda parcial (% es comodín)
        const query = "SELECT * FROM peliculas WHERE titulo_pel LIKE ? OR descrip_pel LIKE ?";

        // %busqueda% busca la palabra en cualquier parte del texto
        const termino = `%${busqueda}%`;

        conexion.query(query, [termino, termino], (error, resultados) => {
            if (error) {
                console.error("Error en la búsqueda:", error);
                return res.json({
                    exito: false,
                    error: "Error en la búsqueda"
                });
            }

            // Si no encuentra películas
            if (resultados.length === 0) {
                return res.json({
                    exito: true,
                    peliculas: [],
                    mensaje: "No se encontraron películas"
                });
            }

            res.json({
                exito: true,
                peliculas: resultados,
                cantidad: resultados.length
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.json({
            exito: false,
            error: error.message
        });
    }
})

// ============================================
// RUTAS CRUD SERIES
// ============================================

// Obtener todas las series
router.get("/api/series", function (req, res) {
    const query = "SELECT * FROM series";
    conexion.query(query, function (error, results) {
        if (error) {
            console.log("Error al obtener series: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, series: results });
    });
});

// Agregar nueva serie
router.post("/api/agregar-serie", function (req, res) {
    const { titulo, categoria, anio, creador, imagen, descripcion } = req.body;

    const query = "INSERT INTO series (titulo_serie, clasifi_serie, year_lanza_serie, creador_serie, ruta_img_ser, descrip_serie) VALUES (?, ?, ?, ?, ?, ?)";

    conexion.query(query, [titulo, categoria, anio, creador, imagen, descripcion], function (error, result) {
        if (error) {
            console.log("Error al agregar serie: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, message: "Serie agregada", id: result.insertId });
    });
});

// Obtener una serie por ID
router.get("/api/serie/:id", function (req, res) {
    const id = req.params.id;
    const query = "SELECT * FROM series WHERE cod_serie = ?";

    conexion.query(query, [id], function (error, results) {
        if (error) {
            console.log("Error al obtener serie: ", error);
            return res.json({ exito: false, error: error });
        }
        if (results.length === 0) {
            return res.json({ exito: false, error: "Serie no encontrada" });
        }
        res.json({ exito: true, serie: results[0] });
    });
});

// Buscar serie por título
router.get("/api/buscar-serie-titulo", function (req, res) {
    const titulo = req.query.titulo;
    const query = "SELECT * FROM series WHERE titulo_serie = ?";

    conexion.query(query, [titulo], function (error, results) {
        if (error) {
            console.log("Error en búsqueda: ", error);
            return res.json({ exito: false, error: error });
        }

        if (results.length > 0) {
            res.json({ exito: true, serie: results[0] });
        } else {
            res.json({ exito: false, error: "No encontrada" });
        }
    });
});

// Actualizar serie
router.put("/api/actualizar-serie/:id", function (req, res) {
    const id = req.params.id;
    const titulo = req.body.titulo;
    const categoria = req.body.categoria;
    const anio = req.body.anio;
    const creador = req.body.creador;
    const imagen = req.body.imagen;
    const descripcion = req.body.descripcion;
    //const { titulo, categoria, anio, director, imagen, descripcion } = req.body;

    console.log(req.body);
    console.log(titulo, categoria, anio, creador, imagen, descripcion);
    
    const query = "UPDATE series SET titulo_serie = ?, clasifi_serie = ?, year_lanza_serie = ?, creador_serie = ?, ruta_img_ser = ?, descrip_serie = ? WHERE cod_serie = ?";

    conexion.query(query, [titulo, categoria, anio, creador, imagen, descripcion, id], function (error, result) {
        if (error) {
            console.log("Error al actualizar serie: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, message: "Serie actualizada" });
    });
});

// Eliminar serie
router.delete("/api/eliminar-serie/:id", function (req, res) {
    const id = req.params.id;

    // Primero eliminar todos los capítulos de las temporadas de esta serie
    // Luego eliminar todas las temporadas
    // Finalmente eliminar la serie

    const query1 = "SELECT cod_tem FROM temporadas WHERE cod_serie_tem = ?";

    conexion.query(query1, [id], function (error, temporadas) {
        if (error) {
            console.log("Error: ", error);
            return res.json({ exito: false, error: error });
        }

        // Eliminar capítulos de cada temporada
        let pendientes = temporadas.length;

        if (pendientes === 0) {
            // No hay temporadas, eliminar la serie directamente
            const querySerie = "DELETE FROM series WHERE cod_serie = ?";
            conexion.query(querySerie, [id], function (error) {
                if (error) {
                    console.log("Error al eliminar serie: ", error);
                    return res.json({ exito: false, error: error });
                }
                res.json({ exito: true, message: "Serie eliminada" });
            });
        } else {
            temporadas.forEach(temp => {
                const queryDeleteCap = "DELETE FROM capitulos WHERE cod_tem_cap = ?";
                conexion.query(queryDeleteCap, [temp.cod_tem], function (error) {
                    pendientes--;

                    if (pendientes === 0) {
                        // Eliminar temporadas
                        const queryDeleteTemp = "DELETE FROM temporadas WHERE cod_serie_tem = ?";
                        conexion.query(queryDeleteTemp, [id], function (error) {
                            // Eliminar serie
                            const querySerie = "DELETE FROM series WHERE cod_serie = ?";
                            conexion.query(querySerie, [id], function (error) {
                                if (error) {
                                    console.log("Error al eliminar serie: ", error);
                                    return res.json({ exito: false, error: error });
                                }
                                res.json({ exito: true, message: "Serie eliminada" });
                            });
                        });
                    }
                });
            });
        }
    });
});

// ============================================
// RUTAS CRUD TEMPORADAS
// ============================================

// Obtener todas las temporadas de una serie
router.get("/api/serie/:serieId/temporadas", function (req, res) {
    const serieId = req.params.serieId;
    const query = "SELECT * FROM temporadas WHERE cod_serie_tem = ? ORDER BY num_cap_tem ASC";

    conexion.query(query, [serieId], function (error, results) {
        if (error) {
            console.log("Error al obtener temporadas: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, temporadas: results });
    });
});

// Agregar nueva temporada
router.post("/api/serie/:serieId/agregar-temporada", function (req, res) {
    const serieId = req.params.serieId;
    const { numero, titulo, anio, descripcion } = req.body;

    console.log({ numero, titulo, anio, descripcion });

    const query = "INSERT INTO temporadas (cod_serie_tem, titulo_tem, year_lanza_tem, num_cap_tem, descrip_tem) VALUES (?, ?, ?, ?, ?)";

    conexion.query(query, [serieId, titulo, anio, numero, descripcion], function (error, result) {
        if (error) {
            console.log("Error al agregar temporada: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, message: "Temporada agregada", id: result.insertId });
    });
});

// Obtener una temporada por ID
router.get("/api/temporada/:id", function (req, res) {
    const id = req.params.id;
    const query = "SELECT * FROM temporadas WHERE cod_tem = ?";

    conexion.query(query, [id], function (error, results) {
        if (error) {
            console.log("Error al obtener temporada: ", error);
            return res.json({ exito: false, error: error });
        }
        if (results.length === 0) {
            return res.json({ exito: false, error: "Temporada no encontrada" });
        }
        res.json({ exito: true, temporada: results[0] });
    });
});

// Actualizar temporada
router.put("/api/actualizar-temporada/:id", function (req, res) {
    const id = req.params.id;
    const { numero, titulo, anio, descripcion} = req.body;

    const query = "UPDATE temporadas SET titulo_tem = ?, year_lanza_tem = ?, num_cap_tem = ?, descrip_tem = ? WHERE cod_tem = ?";

    conexion.query(query, [titulo, anio, numero, descripcion, id], function (error) {
        if (error) {
            console.log("Error al actualizar temporada: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, message: "Temporada actualizada" });
    });
});

// Eliminar temporada (y sus capítulos)
router.delete("/api/eliminar-temporada/:id", function (req, res) {
    const id = req.params.id;

    // Eliminar capítulos primero
    const queryDeleteCap = "DELETE FROM capitulos WHERE cod_tem_cap = ?";
    conexion.query(queryDeleteCap, [id], function (error) {
        if (error) {
            console.log("Error al eliminar capítulos: ", error);
            return res.json({ exito: false, error: error });
        }

        // Luego eliminar temporada
        const queryDeleteTemp = "DELETE FROM temporadas WHERE cod_tem = ?";
        conexion.query(queryDeleteTemp, [id], function (error) {
            if (error) {
                console.log("Error al eliminar temporada: ", error);
                return res.json({ exito: false, error: error });
            }
            res.json({ exito: true, message: "Temporada eliminada" });
        });
    });
});

//Obtener temporada por titulo
router.get("/api/buscar-temporada/:id", async (req, res) => {
    try {
        //const titulo = (req.params.titulo.trim()).replace(/([a-zA-Z])([0-9])/g, '$1 $2');
        const id = req.params.id;

        console.log(id);

        console.log("Buscando temporada con :", titulo, " y ID: ", id);

        // Query para obtener una temporada específica
        const query = "SELECT * FROM temporadas WHERE titulo_tem LIKE ? AND cod_serie_tem = ? ";

        conexion.query(query, [titulo, id], (error, resultados) => {
            if (error) {
                console.error("Error al obtener temporada:", error);
                return res.json({
                    error: "Error al obtener temporada"
                });
            }
            // Si no existe la temporada
            if (resultados.length === 0) {
                return res.json({
                    exito: false,
                    mensaje: "Temporada no encontrada"
                });
            }
            // Responde con la temporada encontrada
            res.json({
                exito: true,
                mensaje: "Temporada encontrada"
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.json({
            error: error.message
        });
    }
});

// ============================================
// RUTAS CRUD CAPÍTULOS
// ============================================

// Obtener todos los capítulos de una temporada
router.get("/api/temporada/:temporadaId/capitulos", function (req, res) {
    const temporadaId = req.params.temporadaId;
    const query = "SELECT * FROM capitulos WHERE cod_tem_cap = ? ORDER BY titulo_cap ASC";

    conexion.query(query, [temporadaId], function (error, results) {
        if (error) {
            console.log("Error al obtener capítulos: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, capitulos: results });
    });
});

// Agregar nuevo capítulo
router.post("/api/temporada/:temporadaId/agregar-capitulo", function (req, res) {
    console.log("entro aca");
    const temporadaId = req.params.temporadaId;
    const titulo = req.body.titulo
    const {duracion, ruta_video, descripcion } = req.body;
    console.log("titulo: ", titulo);
    console.log("temporada id: ", + temporadaId);
    const query = "INSERT INTO capitulos (cod_tem_cap, titulo_cap, duracion_cap, ruta_cap, descrip_cap) VALUES (?, ?, ?, ?, ?)";
    
    conexion.query(query, [temporadaId, titulo, duracion, ruta_video, descripcion], function (error, result) {
    console.log(titulo);    
        if (error) {
            console.log("Error al agregar capítulo: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, message: "Capítulo agregado", id: result.insertId });
    });
});

// Obtener un capítulo por ID
router.get("/api/capitulo/:id", function (req, res) {
    const id = req.params.id;
    const query = "SELECT * FROM capitulos WHERE cod_cap = ?";

    conexion.query(query, [id], function (error, results) {
        if (error) {
            console.log("Error al obtener capítulo: ", error);
            return res.json({ exito: false, error: error });
        }
        if (results.length === 0) {
            return res.json({ exito: false, error: "Capítulo no encontrado" });
        }
        res.json({ exito: true, capitulo: results[0] });
    });
});

// Actualizar capítulo
router.put("/api/actualizar-capitulo/:title", function (req, res) {
    const title = req.params.title;
    const { titulo, duracion, ruta_video, descripcion } = req.body;

    const query = "UPDATE capitulos SET titulo_cap = ?, duracion_cap = ?, ruta_cap = ?, descrip_cap = ? WHERE titulo_cap = ?";

    conexion.query(query, [titulo, duracion, ruta_video, descripcion, title], function (error) {
        if (error) {
            console.log("Error al actualizar capítulo: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, message: "Capítulo actualizado" });
    });
});

// Eliminar capítulo
router.delete("/api/eliminar-capitulo/:id", function (req, res) {
    const id = req.params.id;
    const query = "DELETE FROM capitulos WHERE cod_cap = ?";

    conexion.query(query, [id], function (error) {
        if (error) {
            console.log("Error al eliminar capítulo: ", error);
            return res.json({ exito: false, error: error });
        }
        res.json({ exito: true, message: "Capítulo eliminado" });
    });
});

//Obtener capitulo por titulo
router.get("/api/buscar-capitulo-titulo", async (req, res) => {
    try {
        const titulo = req.query.titulo.trim();

        console.log("Buscando capitulo con titulo:", titulo);

        // Query para obtener una película específica
        const query = "SELECT * FROM capitulos WHERE titulo_cap = ?";

        conexion.query(query, [titulo], (error, resultados) => {
            if (error) {
                console.error("Error al obtener capitulo:", error);
                return res.json({
                    error: "Error al obtener capitulo"
                });
            }
            // Si no existe la película
            if (resultados.length === 0) {
                return res.json({
                    exito: false,
                    mensaje: "Capitulo no encontrado"
                });
            }
            // Responde con la película encontrada
            res.json({
                exito: true,
                mensaje: "Capitulo encontrado"
            });
        });

    } catch (error) {
        console.error("Error:", error);
        res.json({
            error: error.message
        });
    }
});
module.exports = router;