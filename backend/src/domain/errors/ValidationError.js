/**
 * ValidationError.js
 * Error personalizado para fallos en validación de datos
 * Se lanza cuando los datos no cumplen con las reglas de validación definidas
 */

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
