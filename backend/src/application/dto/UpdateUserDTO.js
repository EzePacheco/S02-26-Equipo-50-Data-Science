// UpdateUserDTO.js
// Data Transfer Object for updating a user

class UpdateUserDTO {
  constructor({ email, name }) {
    this.email = email;
    this.name = name;
  }

  validate() {
    // TODO: Implement validation logic
  }
}

export default UpdateUserDTO;
