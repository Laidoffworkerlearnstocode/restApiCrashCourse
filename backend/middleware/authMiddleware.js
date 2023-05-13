const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const configPath = path.join(__dirname, '../config/config.env');

dotenv.config({ path: configPath });

function auth (req, res, next){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'no token, authorization denied'
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = auth;
