import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    // 1. Obtener el token que viene en el "header" de la petición
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "No se proporcionó un token" });
    }

    try {
        // 2. Quitar la palabra "Bearer " si es que viene en el token
        const tokenLimpio = token.split(" ")[1] || token;

        // 3. Verificar si el token es válido usando la SECRET del .env
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        
        // 4. Guardamos los datos del usuario en la petición para que el controlador los use
        req.usuario = decoded;

        // 5. ¡Todo bien! Pasa al siguiente paso
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

// Middleware extra: Solo para el "Amo del Inventario"
export const esAuxiliar = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'auxiliar') {
        next();
    } else {
        res.status(403).json({ message: "Acceso denegado: Se requiere rol de Auxiliar" });
    }
};