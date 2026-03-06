/**
 * CreateUserDTO.js
 * Data Transfer Object para crear un usuario
 * Maneja la validación de datos para nuevos usuarios
 */

import UserSchema from '../../domain/schemas/user.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

/**
 * DTO para creación de usuarios
 */
class CreateUserDTO {
  /**
   * Crea una instancia de CreateUserDTO
   * @param {Object} params - Datos del usuario
   * @param {string} params.email - Correo electrónico
   * @param {string} params.name - Nombre del usuario
   */
  constructor({ email, name }) {
    this.email = typeof email === 'string' ? email.trim().toLowerCase() : email;
    this.name = typeof name === 'string' ? name.trim() : name;
  }

  /**
   * Valida los datos del usuario
   * @throws {ValidationError} Si la validación falla
   */
  validate() {
    const schema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true });
    const result = schema.safeParse({ email: this.email, name: this.name });
    if (!result.success) {
      const errors = result.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }));
      throw new ValidationError('Validación de usuario fallida', errors);
    }
    this.email = result.data.email;
    this.name = result.data.name;
  }
}

export default CreateUserDTO;
