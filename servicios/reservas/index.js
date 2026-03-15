import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reservasRouters from './routers/reservasRouters.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: '*', // O la URL de tu frontend
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

app.use('/api/reservas', reservasRouters);

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`📝 Servicio de Reservas activo en puerto ${PORT}`);
});


