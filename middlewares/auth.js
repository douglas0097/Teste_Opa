const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);

        next(); // Permite continuar para a próxima rota/middleware
    } catch (err) {
        res.status(400).json({ msg: 'Token inválido!' });
    }
}

module.exports = checkToken;
