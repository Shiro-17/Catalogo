-- Inicialización de la base de datos
-- Archivo de respaldo

-- Tabla de Reservas (Usando un alfabeto personalizado para NanoID)
CREATE TABLE reservas (
    id VARCHAR(15) PRIMARY KEY, -- Aquí guardaremos el NanoID
    id_usuario INT NOT NULL,
    fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'surtida', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);