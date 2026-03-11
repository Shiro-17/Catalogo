import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reservasRouters from './routers/reservasRouters.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/reservas', reservasRouters);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`📝 Servicio de Reservas activo en puerto ${PORT}`);
});