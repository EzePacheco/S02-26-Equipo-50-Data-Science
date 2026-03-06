/**
 * CreateCustomerDTO.js
 * Data Transfer Object para crear un cliente
 * Maneja la validación de datos para nuevos clientes
 */

import CustomerSchema from '../../domain/schemas/customer.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

/**
 * DTO para creación de clientes
 */
class CreateCustomerDTO {
  /**
   * Crea una instancia de CreateCustomerDTO
   * @param {Object} params - Datos del cliente
   * @param {string} params.name - Nombre del cliente
   * @param {string} [params.email] - Correo electrónico
   * @param {string} [params.phone] - Teléfono de contacto
   */
  constructor({ name, email, phone }) {
    
    this.name = typeof name === 'string' ? name.trim() : name;
    this.email = typeof email === 'string' && email !== '' ? email.trim().toLowerCase() : null;
    this.phone = typeof phone === 'string' ? phone.trim() : null;
  }

  /**
   * Valida los datos del cliente
   * @throws {ValidationError} Si la validación falla
   */
  validate() {
    const schema = CustomerSchema.omit({ id: true, createdAt: true });
    const result = schema.safeParse({
      name: this.name,
      email: this.email,
      phone: this.phone,
    });

    if (!result.success) {
      const issues = result.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }));
      throw new ValidationError('Validación de cliente fallida', issues);
    }
  }

  /**
   * Obtiene los datos del cliente
   * @returns {Object} Datos del cliente
   */
  getData() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
    };
  }
}

export default CreateCustomerDTO;
