import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

// Creamos el servidor HTTP a partir de la app de Express
const httpServer = createServer(app);

// Configuramos Socket.io con CORS para que el Frontend pueda conectarse
const io = new Server(httpServer, {
    cors: {
        origin: "*", // En producción pondrías la URL de tu frontend
        methods: ["GET", "POST"]
    }
});

// Lógica de Socket.io
io.on('connection', (socket) => {
    console.log(`👤 Usuario conectado: ${socket.id}`);

    // Escuchar cuando alguien envía un mensaje
    socket.on('mensaje_enviado', (data) => {
        console.log('Nuevo mensaje:', data);
        
        // Reenviar el mensaje a TODOS los conectados (incluyendo el que lo envió)
        // data suele ser { usuario: "Juan", texto: "Hola!", rol: "auxiliar" }
        io.emit('mensaje_recibido', data);
    });

    socket.on('disconnect', () => {
        console.log('👤 Usuario desconectado');
    });
});

const PORT = process.env.PORT || 3004;
httpServer.listen(PORT, () => {
    console.log(`💬 Servidor de Chat activo en puerto ${PORT}`);
});