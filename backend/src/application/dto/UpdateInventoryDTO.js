// UpdateInventoryDTO.js
// Data Transfer Object for updating inventory

class UpdateInventoryDTO {
  constructor({ productId, quantity, minStock }) {
    this.productId = productId;
    this.quantity = quantity;
    this.minStock = minStock;
  }

  validate() {
    // TODO: Implement validation logic
    // - productId is required
    // - quantity must be >= 0
    // - minStock must be >= 0 (optional)
  }
}

export default UpdateInventoryDTO;
