// UpdateProductDTO.js
// Data Transfer Object for updating a product

class UpdateProductDTO {
  constructor({ name, price, category, active }) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.active = active;
  }

  validate() {
    // TODO: Implement validation logic
  }
}

export default UpdateProductDTO;
