class Inventory {
  constructor({ id, productId, quantity, minStock }) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.minStock = minStock ?? null;
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
}

module.exports = Inventory;
