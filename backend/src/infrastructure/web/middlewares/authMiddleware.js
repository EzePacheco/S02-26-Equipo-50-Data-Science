import jwt from 'jsonwebtoken';
import ValidationError from '../../../domain/errors/ValidationError.js';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token no proporcionado',
      });
    }

    const token = authHeader.substring(7);
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Token inválido',
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expirado',
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Error de autenticación',
    });
  }
};

export default authMiddleware;
