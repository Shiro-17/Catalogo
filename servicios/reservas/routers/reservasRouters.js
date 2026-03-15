// servicios/reservas/routers/reservasRouters.js
import express from 'express';
import pool from '../db.js';
import { nanoid } from 'nanoid';

const router = express.Router();

router.post('/', async (req, res) => {
    const { id_pieza, id_usuario } = req.body;

    if (!id_pieza || !id_usuario) {
        return res.status(400).json({ 
            error: 'Faltan datos obligatorios', 
            recibido: { id_pieza, id_usuario } 
        });
    }

    const idCustom = nanoid(12);

    try {
        await pool.query(
            'INSERT INTO reservas (id, id_pieza, id_usuario, estado) VALUES (?, ?, ?, ?)',
            [idCustom, id_pieza, id_usuario, 'pendiente']
        );
        res.status(201).json({ id: idCustom, mensaje: 'Reserva exitosa' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;