import express from 'express';
import { getCatalogo, agregarRefaccion, editarRefaccion } from '../controllers/catalogoController.js';
import { verificarToken, esAuxiliar } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Cualquiera puede ver el catálogo
router.get('/', getCatalogo); 

// Solo auxiliares autenticados pueden agregar o editar
router.post('/', [verificarToken, esAuxiliar], agregarRefaccion);
router.put('/:id', [verificarToken, esAuxiliar], editarRefaccion);

export default router;