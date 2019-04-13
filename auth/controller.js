const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');

module.exports.authenticate = async ({ user, password }) => {
    let userModel = await db.query(
        'SELECT * FROM usuario WHERE lower(usuario) = ?', 
        [user.toLowerCase()]
    );
    if(userModel.length === 0) return null
    
    userModel = userModel[0];
    const arePasswordsEqual = await bcrypt.compare(password, userModel.password);
    if(!arePasswordsEqual || userModel.tipo.toLowerCase() !== 'proveedor_externo') return null;

    return jwt.sign({ user }, 'somerandomkey_int');
}

module.exports.authMiddleware = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somerandomkey_int')
    } catch(err) {
        return res.sendStatus(401);
    }
    if(!decodedToken) return res.sendStatus(401);

    const supplierModel = await db.query(
        'SELECT nit FROM proveedor WHERE lower(usuario) = ?',
        [decodedToken.user.toLowerCase()]
    )

    if(supplierModel.length === 0) return res.sendStatus(401);

    req.supplierId = supplierModel[0].nit
    req.user = decodedToken.user;
    return next();
}