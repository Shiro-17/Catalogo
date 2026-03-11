import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        // 1. Verificar si el usuario ya existe
        const [existe] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existe.length > 0) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // 2. Encriptar la contraseña (Salt de 10 es el estándar)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Insertar en la base de datos
        await pool.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, passwordHash, rol]
        );

        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar al usuario por email
        const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        
        if (usuarios.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const usuario = usuarios[0];

        // 2. Comparar la contraseña escrita con la encriptada en la DB
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecto) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // 3. Si todo está bien, crear el TOKEN (el gafete)
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, // Información que viaja en el token
            process.env.JWT_SECRET,               // Clave secreta del .env
            { expiresIn: '8h' }                   // El token expira en 8 horas
        );

        // 4. Responder al frontend con el token y los datos del usuario
        res.json({
            token,
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};