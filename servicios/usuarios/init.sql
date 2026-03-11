-- Inicialización de la base de datos
-- Archivo de respaldo

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('coordinador', 'auxiliar', 'usuario') NOT NULL
);