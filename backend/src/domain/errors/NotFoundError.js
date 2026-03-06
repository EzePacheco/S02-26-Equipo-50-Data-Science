/**
 * NotFoundError.js
 * Error personalizado para entidades no encontradas
 * Se lanza cuando se intenta acceder a un recurso que no existe
 */

import DomainError from './DomainError.js';

/**
 * Error de entidad no encontrada
 */
class NotFoundError extends DomainError {
  /**
   * Crea una instancia de NotFoundError
   * @param {string} message - Mensaje descriptivo del error
   */
  constructor(message) {
    super(message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
