import DomainError from './DomainError.js';

/**
 * Error de validación de datos
 */
class ValidationError extends DomainError {
  /**
   * Crea una instancia de ValidationError
   * @param {string} message - Mensaje descriptivo del error
   * @param {string} [field] - Campo que provocó el error (opcional)
   */
  constructor(message, field = null) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.field = field;
  }
}

export default ValidationError;
