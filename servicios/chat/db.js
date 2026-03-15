import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 11109, // 👈 USAR EL PUERTO DE TU IMAGEN
    waitForConnections: true,
    connectionLimit: 10,
    ssl: {
        rejectUnauthorized: false // 👈 Necesario para Railway
    }
});

pool.query('SELECT 1')
    .then(() => console.log('✅ ¡CONECTADO A RAILWAY EXITOSAMENTE!'))
    .catch(err => console.error('❌ Error de conexión:', err.message));

export default pool;