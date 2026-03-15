import pool from '../db.js';
import { customAlphabet } from 'nanoid';

// Configuración de NanoID: Case sensitive, sin 'l' ni 'O'
const alfabeto = '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const generarIdReserva = customAlphabet(alfabeto, 10);

// Controladores para el servicio de reservas
export const getCatalogo = async (req, res) => {
    try {
        // Traemos explícitamente el id
        const [items] = await pool.query('SELECT id, nombre_pieza, descripcion, cantidad_stock FROM catalogo');
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 1. Crear una nueva reserva (Vale)
export const crearReserva = async (req, res) => {
    const { id_pieza, cantidad_solicitada } = req.body;
    const id_usuario = req.usuario.id; // Obtenido del token por el middleware
    const nuevoId = generarIdReserva(); 

    try {
        await pool.query(
            'INSERT INTO reservas (id, id_usuario, estado) VALUES (?, ?, ?)',
            [nuevoId, id_usuario, 'pendiente']
        );
        
        // Aquí podrías insertar en una tabla de detalles si fueran varias piezas
        // Por simplicidad del ejemplo, lo dejamos en la tabla principal o una relación
        res.status(201).json({ 
            message: "Reserva creada con éxito", 
            folio: nuevoId 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Borrar/Cancelar reserva (SOLO EL AUXILIAR)
export const eliminarReserva = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM reservas WHERE id = ?', [id]);
        res.json({ message: "Reserva eliminada por el administrador del inventario" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Consultar todas las reservas
export const getReservas = async (req, res) => {
    console.log("🚀 El controlador getReservas ha sido activado..."); // <-- Agrega esto
    try {
        const [rows] = await pool.query('SELECT * FROM reservas');
        console.log(`📦 Datos obtenidos de la DB: ${rows.length} filas`);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error en getReservas:", error.message);
        res.status(500).json({ error: error.message });
    }
};