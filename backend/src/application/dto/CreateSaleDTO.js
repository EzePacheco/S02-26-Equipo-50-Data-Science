// CreateSaleDTO.js
// Data Transfer Object for creating a sale

class CreateSaleDTO {
  constructor({ userId, customerId, items }) {
    this.userId = userId;
    this.customerId = customerId;
    this.items = items; // Array of { productId, quantity }
  }

  validate() {
    // TODO: Implement validation logic
    // - userId is required
    // - items array must not be empty
    // - each item must have productId and quantity > 0
  }
}

export default CreateSaleDTO;
