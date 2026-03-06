/**
 * UpdateUserDTO.js
 * Data Transfer Object para actualizar un usuario
 * Maneja la validación de datos para actualización de usuarios
 */

import UserSchema from '../../domain/schemas/user.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

/**
 * DTO para actualización de usuarios
 */
class UpdateUserDTO {
  /**
   * Crea una instancia de UpdateUserDTO
   * @param {Object} params - Datos a actualizar
   * @param {string} [params.email] - Nuevo correo electrónico
   * @param {string} [params.name] - Nuevo nombre
   */
  constructor({ email, name }) {
    this.email = typeof email === 'string' && email !== '' ? email.trim().toLowerCase() : null;
    this.name = typeof name === 'string' ? name.trim() : name;
  }

  /**
   * Valida los datos del usuario
   * @throws {ValidationError} Si la validación falla
   */
  validate() {
    try {
      const partial = UserSchema.partial();
      const parsed = partial.parse({ email: this.email, name: this.name });
      this.email = parsed.email;
      this.name = parsed.name;
    } catch (e) {
      const errors = e.errors ? e.errors.map(i => ({ field: i.path.join('.'), message: i.message })) : [{ message: e.message }];
      throw new ValidationError('Validación de usuario fallida', errors);
    }
  }
}

export default UpdateUserDTO;
