// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

// const { UserService } = require('../services');

const secret = process.env.JWT_SECRET || 'secretJWT';

function extractToken(bearerToken) {
    return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
    const bearerToken = req.header('Authorization');
    
    if (!bearerToken) {
        return res.status(401).json({ message: 'Token not found' });
    }
    
    const token = extractToken(bearerToken);
    
    try {
        const decoded = jwt.verify(token, secret);
        // const user = await UserService.getByUserId(decoded.data.userId);
        //
        // if (!user) {
        //     return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
        // }
        req.user = decoded.data;
        
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};
