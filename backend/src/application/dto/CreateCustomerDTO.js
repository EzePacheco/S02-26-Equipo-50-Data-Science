// CreateCustomerDTO.js
// Data Transfer Object for creating a customer

class CreateCustomerDTO {
  constructor({ name, email, phone }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  validate() {
    // TODO: Implement validation logic
    // - name is required
    // - email must be valid (optional)
    // - phone format (optional)
  }
}

export default CreateCustomerDTO;
