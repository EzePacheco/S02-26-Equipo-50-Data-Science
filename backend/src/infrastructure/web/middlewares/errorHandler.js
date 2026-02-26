import DomainError from '../../../domain/errors/DomainError.js';
import ValidationError from '../../../domain/errors/ValidationError.js';
import NotFoundError from '../../../domain/errors/NotFoundError.js';

/**
 * Middleware global de manejo de errores
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: err.message,
      details: err.errors || [],
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: err.message,
    });
  }

  if (err instanceof DomainError) {
    return res.status(400).json({
      success: false,
      error: err.code,
      message: err.message,
    });
  }

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Error de validación',
      details: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  return res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor',
  });
};

export default errorHandler;
