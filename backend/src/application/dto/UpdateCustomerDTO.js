// UpdateCustomerDTO.js
// Data Transfer Object for updating a customer

import CustomerSchema from '../../domain/schemas/customer.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

class UpdateCustomerDTO {
  constructor({ name, email, phone }) {
    this.name = typeof name === 'string' ? name.trim() : name;
    this.email = typeof email === 'string' && email !== '' ? email.trim().toLowerCase() : null;
    this.phone = typeof phone === 'string' ? phone.trim() : phone;
  }

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
