/**
 * UpdateCustomerDTO.js
 * Data Transfer Object para actualizar un cliente
 * Maneja la validación de datos para actualización de clientes
 */

import CustomerSchema from '../../domain/schemas/customer.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

/**
 * DTO para actualización de clientes
 */
class UpdateCustomerDTO {
  /**
   * Crea una instancia de UpdateCustomerDTO
   * @param {Object} params - Datos a actualizar
   * @param {string} [params.name] - Nuevo nombre
   * @param {string} [params.email] - Nuevo correo electrónico
   * @param {string} [params.phone] - Nuevo teléfono
   */
  constructor({ name, email, phone }) {
    this.name = typeof name === 'string' ? name.trim() : name;
    this.email = typeof email === 'string' && email !== '' ? email.trim().toLowerCase() : null;
    this.phone = typeof phone === 'string' ? phone.trim() : phone;
  }

  /**
   * Valida los datos del cliente
   * @throws {ValidationError} Si la validación falla
   */
  validate() {
    try {
      const partial = CustomerSchema.partial();
      const parsed = partial.parse({ name: this.name, email: this.email, phone: this.phone });
      this.name = parsed.name;
      this.email = parsed.email;
      this.phone = parsed.phone;
    } catch (e) {
      const errors = e.errors ? e.errors.map(i => ({ field: i.path.join('.'), message: i.message })) : [{ message: e.message }];
      throw new ValidationError('Validación de cliente fallida', errors);
    }
  }
}

export default UpdateCustomerDTO;
