const jwt = require('jsonwebtoken'); // para el token

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    //Se verifica que exista el token
    if (!token) {
        return res.redirect("/users/access");
    }

    // Verificar el token si es valido
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            // El token no es válido o ha caducado
            return res.redirect("/users/access");
        }

        // El token es válido, establece req.user con la información del usuario
        req.user = decoded;

        // Continúa con la ejecución de la siguiente middleware o ruta
        next();
    });
};

module.exports = {
    requireAuth
}
