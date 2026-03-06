// UpdateUserDTO.js
// Data Transfer Object for updating a user

import UserSchema from '../../domain/schemas/user.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

class UpdateUserDTO {
  constructor({ email, name }) {
    this.email = typeof email === 'string' && email !== '' ? email.trim().toLowerCase() : null;
    this.name = typeof name === 'string' ? name.trim() : name;
  }

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
