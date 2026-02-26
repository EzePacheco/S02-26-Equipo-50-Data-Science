/**
 * Sale.js
 * Entidad de dominio que representa una venta realizada por un usuario
 * Contains sale items, links to user and optional customer
 */
export default class Sale {
  constructor({ id, userId, customerId, items }) {
    this.id = id;
    this.userId = userId;
    this.customerId = customerId ?? null;
    this.items = items;
    this.totalAmount = this.calculateTotal();
    this.createdAt = new Date();
  }

  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
}