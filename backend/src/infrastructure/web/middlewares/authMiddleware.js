import jwt from 'jsonwebtoken';
import ValidationError from '../../../domain/errors/ValidationError.js';

/**
 * Obtiene JWT_SECRET de forma segura
 * @throws {Error} Si JWT_SECRET no está configurado
 */
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no configurado en variables de entorno');
  }
  return secret;
}

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
    const secret = getJwtSecret();
    
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
