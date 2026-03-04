// CreateUserDTO.js
// Data Transfer Object for creating a user

import UserSchema from '../../domain/schemas/user.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

class CreateUserDTO {
  constructor({ email, name }) {
    this.email = typeof email === 'string' ? email.trim().toLowerCase() : email;
    this.name = typeof name === 'string' ? name.trim() : name;
  }

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
