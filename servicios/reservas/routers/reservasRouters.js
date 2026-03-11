import express from 'express';
import { crearReserva, getReservas, eliminarReserva } from '../controllers/reservasController.js';
import { verificarToken, esAuxiliar } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todos los logueados pueden ver y crear
router.get('/', verificarToken, getReservas);
router.post('/', verificarToken, crearReserva);

// SOLO el auxiliar puede borrar
router.delete('/:id', [verificarToken, esAuxiliar], eliminarReserva);

export default router;