// CreateProductDTO.js
// Data Transfer Object for creating a product

class CreateProductDTO {
  constructor({ name, sku, price, category }) {
    this.name = name;
    this.sku = sku;
    this.price = price;
    this.category = category;
  }

  validate() {
    // TODO: Implement validation logic
    // - name is required
    // - sku is required and unique
    // - price must be positive
    // - category must be 'ROPA' or 'CALZADO'
  }
}

export default CreateProductDTO;
