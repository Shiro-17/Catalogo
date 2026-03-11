import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import pool from './db.js';
import anthRouters from './routers/anthRouters.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para leer JSON en el cuerpo de las solicitudes

// Rutas
app.use('/api/usuarios', anthRouters);

/*
//Ruta de prueba para obtener usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nombre, email, rol FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({error: error. message});
      }
});
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Microservicios de usuario escuchando en el puerto ${PORT}`);
});