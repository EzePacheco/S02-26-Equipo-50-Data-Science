export default class Inventory {
  constructor({ id, productId, quantity, minStock }) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.minStock = minStock ?? 0;
  }

  decrease(amount) {
    if (amount <= 0) throw new Error('El importe debe ser positivo');
    if (this.quantity < amount) throw new Error('Stock insuficiente');
    this.quantity -= amount;
  }

  increase(amount) {
    if (amount <= 0) throw new Error('El importe debe ser positivo');
    this.quantity += amount;
  }

  isLowStock() {
    return this.quantity <= this.minStock;
  }

  updateMinStock(newMin) {
    if (newMin < 0) throw new Error('El stock mínimo no puede ser negativo');
    this.minStock = newMin;
  }
}
