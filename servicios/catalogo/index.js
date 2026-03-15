import express from 'express';
import cors from 'cors';
import catalogoRouters from './routers/catalogoRouters.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/catalogo', catalogoRouters);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`🚀 Microservicio Catálogo corriendo en http://localhost:${PORT}`);
});