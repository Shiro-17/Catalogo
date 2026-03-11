import express from 'express';
import { registrarUsuario, loginUsuario} from '../controllers/anthController.js';

const router = express.Router();

// Ruta: POST /api/usuarios/registro
router.post('/registro', registrarUsuario);

// Ruta: POST /api/usuarios/login
router.post('/login', loginUsuario);

export default router;
