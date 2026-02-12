// UpdateCustomerDTO.js
// Data Transfer Object for updating a customer

class UpdateCustomerDTO {
  constructor({ name, email, phone }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  validate() {
    // TODO: Implement validation logic
  }
}

export default UpdateCustomerDTO;
