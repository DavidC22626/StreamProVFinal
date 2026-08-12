-- ============================================
-- StreamPro - Script de Base de Datos
-- Base de datos: stream_pro
-- SENA - Análisis y Desarrollo de Software
-- Evidencia: GA10-220501097-AA3-EV01
-- ============================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS stream_pro
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

-- Seleccionar la base de datos
USE stream_pro;

-- ============================================
-- Tabla: administradores
-- Almacena las credenciales del equipo admin
-- ============================================
CREATE TABLE IF NOT EXISTS administradores (
    cod_adm INT AUTO_INCREMENT PRIMARY KEY,
    nombre_adm VARCHAR(100) NOT NULL,
    correo_adm VARCHAR(100) NOT NULL UNIQUE,
    passw_adm VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabla: usuarios
-- Cuentas de usuarios registrados
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
    cod_user INT AUTO_INCREMENT PRIMARY KEY,
    nombre_user VARCHAR(100) NOT NULL,
    nacionalidad_user VARCHAR(50),
    telefono_user VARCHAR(10),
    correo_user VARCHAR(100) NOT NULL UNIQUE,
    passw_user VARCHAR(255) NOT NULL,
    fecha_regis_user DATETIME,
    cod_scrip_user INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabla: peliculas
-- Catálogo de películas disponibles
-- ============================================
CREATE TABLE IF NOT EXISTS peliculas (
    cod_pel INT AUTO_INCREMENT PRIMARY KEY,
    titulo_pel VARCHAR(200) NOT NULL,
    descrip_pel TEXT,
    duracion_pel INT,
    clasifi_pel VARCHAR(20),
    year_lanza_pel INT,
    director_pel VARCHAR(100),
    ruta_pel VARCHAR(255),
    ruta_img_pel VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabla: series
-- Catálogo de series disponibles
-- ============================================
CREATE TABLE IF NOT EXISTS series (
    cod_serie INT AUTO_INCREMENT PRIMARY KEY,
    titulo_serie VARCHAR(200) NOT NULL,
    clasifi_serie VARCHAR(20),
    year_lanza_serie INT,
    creador_serie VARCHAR(100),
    ruta_img_ser VARCHAR(255),
    descrip_serie TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabla: temporadas
-- Temporadas asociadas a cada serie
-- ============================================
CREATE TABLE IF NOT EXISTS temporadas (
    cod_tem INT AUTO_INCREMENT PRIMARY KEY,
    cod_serie_tem INT NOT NULL,
    titulo_tem VARCHAR(200),
    year_lanza_tem INT,
    num_cap_tem INT,
    descrip_tem TEXT,
    CONSTRAINT fk_temporada_serie
        FOREIGN KEY (cod_serie_tem)
        REFERENCES series(cod_serie)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabla: capitulos
-- Episodios asociados a cada temporada
-- ============================================
CREATE TABLE IF NOT EXISTS capitulos (
    cod_cap INT AUTO_INCREMENT PRIMARY KEY,
    cod_tem_cap INT NOT NULL,
    titulo_cap VARCHAR(200),
    duracion_cap INT,
    ruta_cap VARCHAR(255),
    descrip_cap TEXT,
    CONSTRAINT fk_capitulo_temporada
        FOREIGN KEY (cod_tem_cap)
        REFERENCES temporadas(cod_tem)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabla: suscripciones
-- Registro de suscripciones premium
-- ============================================
CREATE TABLE IF NOT EXISTS suscripciones (
    cod_scrip INT AUTO_INCREMENT PRIMARY KEY,
    cod_user INT,
    id_mp VARCHAR(100),
    cod_plan_scrip INT,
    duracion_scrip INT,
    estado VARCHAR(20),
    fecha_compra_scrip DATETIME,
    fecha_inicio DATETIME,
    CONSTRAINT fk_suscripcion_usuario
        FOREIGN KEY (cod_user)
        REFERENCES usuarios(cod_user)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Tabla: tokens_recuperacion
-- Tokens temporales para recuperación de contraseña
-- ============================================
CREATE TABLE IF NOT EXISTS tokens_recuperacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(8) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    tabla VARCHAR(50) NOT NULL,
    expiracion DATETIME NOT NULL,
    usado TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Datos de prueba (opcionales)
-- ============================================

-- Insertar un administrador de prueba
-- La contraseña es: admin123 (hash bcrypt generado)
-- Para generar un hash nuevo usar: bcrypt.hash('tu_password', 10)
INSERT INTO administradores (nombre_adm, correo_adm, passw_adm)
VALUES (
    'Administrador',
    'admin@streampro.com',
    '$2b$10$ejemplo.hash.reemplazar.con.hash.real.de.bcrypt'
) ON DUPLICATE KEY UPDATE nombre_adm = VALUES(nombre_adm);

-- Insertar películas de prueba
INSERT INTO peliculas (titulo_pel, descrip_pel, duracion_pel, clasifi_pel, year_lanza_pel, director_pel, ruta_pel, ruta_img_pel) VALUES
('Película de Prueba 1', 'Descripción de la película de prueba 1', 120, 'row1', 2024, 'Director 1', '/video/pelicula1.mp4', '/portadas/pelicula1.jpg'),
('Película de Prueba 2', 'Descripción de la película de prueba 2', 95, 'row2', 2024, 'Director 2', '/video/pelicula2.mp4', '/portadas/pelicula2.jpg'),
('Película de Prueba 3', 'Descripción de la película de prueba 3', 110, 'row3', 2023, 'Director 3', '/video/pelicula3.mp4', '/portadas/pelicula3.jpg')
ON DUPLICATE KEY UPDATE titulo_pel = VALUES(titulo_pel);

-- Insertar serie de prueba
INSERT INTO series (titulo_serie, clasifi_serie, year_lanza_serie, creador_serie, ruta_img_ser, descrip_serie) VALUES
('Serie de Prueba 1', 'row1', 2024, 'Creador 1', '/portadas/serie1.jpg', 'Descripción de la serie de prueba')
ON DUPLICATE KEY UPDATE titulo_serie = VALUES(titulo_serie);

-- Insertar temporada de prueba
INSERT INTO temporadas (cod_serie_tem, titulo_tem, year_lanza_tem, num_cap_tem, descrip_tem) VALUES
(1, 'Temporada 1', 2024, 5, 'Primera temporada de la serie')
ON DUPLICATE KEY UPDATE titulo_tem = VALUES(titulo_tem);

-- Insertar capítulos de prueba
INSERT INTO capitulos (cod_tem_cap, titulo_cap, duracion_cap, ruta_cap, descrip_cap) VALUES
(1, 'Capítulo 1', 25, '/video/tem1-cap1.mp4', 'Descripción del capítulo 1'),
(1, 'Capítulo 2', 25, '/video/tem1-cap2.mp4', 'Descripción del capítulo 2'),
(1, 'Capítulo 3', 25, '/video/tem1-cap3.mp4', 'Descripción del capítulo 3'),
(1, 'Capítulo 4', 25, '/video/tem1-cap4.mp4', 'Descripción del capítulo 4'),
(1, 'Capítulo 5', 25, '/video/tem1-cap5.mp4', 'Descripción del capítulo 5')
ON DUPLICATE KEY UPDATE titulo_cap = VALUES(titulo_cap);

-- ============================================
-- Verificación
-- ============================================
SELECT 'Base de datos stream_pro creada exitosamente' AS resultado;
SELECT 'Tablas creadas:' AS informacion;

SELECT TABLE_NAME AS tabla, TABLE_ROWS AS registros
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'stream_pro'
ORDER BY TABLE_NAME;
