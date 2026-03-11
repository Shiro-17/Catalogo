-- Inicialización de la base de datos
-- Archivo de respaldo

-- Tabla de Catálogo (Refacciones)
CREATE TABLE catalogo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_pieza VARCHAR(150) NOT NULL,
    descripcion TEXT,
    cantidad_stock INT DEFAULT 0
);