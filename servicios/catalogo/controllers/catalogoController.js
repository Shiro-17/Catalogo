import pool from '../db.js';

// 1. Obtener catálogo completo
export const getCatalogo = async (req, res) => {
    try {
        // Seleccionamos explícitamente el 'id' para evitar que se pierda en el mapeo
        const [items] = await pool.query('SELECT id, nombre_pieza, descripcion, cantidad_stock FROM catalogo');
        
        // Log para que veas en tu terminal de la HP EliteBook qué estás enviando
        console.log(`📦 Enviando ${items.length} productos al frontend`);
        
        res.json(items);
    } catch (error) {
        console.error("❌ Error en getCatalogo:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// 2. Agregar refacción (Mantenlo igual)
export const agregarRefaccion = async (req, res) => {
    const { nombre_pieza, descripcion, cantidad_stock } = req.body;
    try {
        await pool.query(
            'INSERT INTO catalogo (nombre_pieza, descripcion, cantidad_stock) VALUES (?, ?, ?)',
            [nombre_pieza, descripcion, cantidad_stock]
        );
        res.status(201).json({ message: "Refacción añadida" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Actualizar stock o detalles de una refacción (Solo el Auxiliar)
export const editarRefaccion = async (req, res) => {
    const { id } = req.params;
    const { nombre_pieza, descripcion, cantidad_stock } = req.body;
    try {
        await pool.query(
            'UPDATE catalogo SET nombre_pieza = ?, descripcion = ?, cantidad_stock = ? WHERE id = ?',
            [nombre_pieza, descripcion, cantidad_stock, id]
        );
        res.json({ message: "Refacción actualizada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};