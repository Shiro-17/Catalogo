import pool from '../db.js';

// 1. Ver todo el catálogo (Cualquiera puede)
export const getCatalogo = async (req, res) => {
    try {
        const [items] = await pool.query('SELECT * FROM catalogo');
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Agregar nueva refacción (Solo el Auxiliar)
export const agregarRefaccion = async (req, res) => {
    const { nombre_pieza, descripcion, cantidad_stock } = req.body;
    try {
        await pool.query(
            'INSERT INTO catalogo (nombre_pieza, descripcion, cantidad_stock) VALUES (?, ?, ?)',
            [nombre_pieza, descripcion, cantidad_stock]
        );
        res.status(201).json({ message: "Refacción añadida al inventario" });
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