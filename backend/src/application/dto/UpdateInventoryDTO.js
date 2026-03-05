// UpdateInventoryDTO.js
// Data Transfer Object for updating inventory

class UpdateInventoryDTO {
  constructor({ variantId, productId, quantity, minStock }) {
    
    this.variantId = variantId || null;
    this.productId = productId || null;
    this.quantity = typeof quantity === 'string' ? Number(quantity) : quantity;
    this.minStock = typeof minStock === 'string' ? Number(minStock) : minStock;
  }

  validate() {
    if (!this.variantId && !this.productId) throw new Error('variantId o productId requerido');
    if (this.quantity !== undefined && (typeof this.quantity !== 'number' || this.quantity < 0)) throw new Error('quantity inválido');
    if (this.minStock !== undefined && (typeof this.minStock !== 'number' || this.minStock < 0)) throw new Error('minStock inválido');
  }
}

export default UpdateInventoryDTO;
