import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import pool from './db.js';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

// Endpoint de historial
app.get('/api/chat/historial', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mensajes_chat ORDER BY fecha ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

io.on('connection', (socket) => {
    console.log('✅ Cliente conectado');

    socket.on('enviar_mensaje', async (datos) => {
        try {
            await pool.query('INSERT INTO mensajes_chat (usuario, mensaje) VALUES (?, ?)', 
            [datos.usuario, datos.mensaje]);
            io.emit('recibir_mensaje', datos); 
        } catch (err) {
            console.error(err);
        }
    });
});

server.listen(3004, () => console.log('🚀 Chat en puerto 3004'));