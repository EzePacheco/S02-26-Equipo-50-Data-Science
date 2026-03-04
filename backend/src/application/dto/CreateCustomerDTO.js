import CustomerSchema from '../../domain/schemas/customer.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

class CreateCustomerDTO {
  constructor({ name, email, phone }) {
    
    this.name = typeof name === 'string' ? name.trim() : name;
    this.email = typeof email === 'string' && email !== '' ? email.trim().toLowerCase() : null;
    this.phone = typeof phone === 'string' ? phone.trim() : null;
  }

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

  getData() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
    };
  }
}

export default CreateCustomerDTO;
