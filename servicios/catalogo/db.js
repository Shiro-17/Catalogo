import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, 
  waitForConnections: true, // Esperar a que haya conexiones disponibles en el pool
  connectionLimit: 10, // Cantidad máxima de conexiones en el pool
  queueLimit: 0 // Sin límite de conexiones en espera
});

// Prueba de conexión rapida para verificar que la configuración es correcta
try {
  const connection = await pool.getConnection();
  console.log('Conexión a la base de datos MySQL exitosa "Railway"');
  connection.release(); // Liberar la conexión después de la prueba
} catch (error) {
  console.error('Error al conectar a la base de datos MySQL:', error.message);
}

export default pool;