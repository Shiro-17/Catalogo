import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import catalogoRouters from './routers/catalogoRouters.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/catalogo', catalogoRouters);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`📦 Microservicio de Catálogo corriendo en puerto ${PORT}`);
});