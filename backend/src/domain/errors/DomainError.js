/**
 * DomainError.js
 * Clase base de errores para la capa de dominio
 * Proporciona una estructura común para todos los errores del dominio
 */

class DomainError extends Error {
  /**
   * Crea una instancia de DomainError
   * @param {string} message - Mensaje descriptivo del error
   * @param {string} code - Código de error interno
   */
  constructor(message, code = 'DOMAIN_ERROR') {
    super(message);
    this.name = 'DomainError';
    this.code = code;
  }
}

export default DomainError;
