/**
 * SaleItem.js
 * Entidad de dominio que representa un item dentro de una venta
 * each item references a product with quantity and price
 */
export default class SaleItem {
  constructor({ productId, productName, quantity, unitPrice }) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.unitPrice = Number(unitPrice);
    this.subtotal = this.quantity * this.unitPrice;
  }
}

