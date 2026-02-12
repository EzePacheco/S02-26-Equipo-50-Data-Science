// CreateUserDTO.js
// Data Transfer Object for creating a user

class CreateUserDTO {
  constructor({ email, name }) {
    this.email = email;
    this.name = name;
  }

  validate() {
    // TODO: Implement validation logic
    // - email must be valid
    // - name must not be empty
  }
}

export default CreateUserDTO;
