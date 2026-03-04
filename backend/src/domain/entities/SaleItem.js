/**
 * SaleItem.js
 * Entidad de dominio que representa un item dentro de una venta
 * each item references a product with quantity and price
 */
export default class SaleItem {
  constructor({ variantId, productName, quantity, unitPrice }) {
    this.variantId = variantId;
    this.productName = productName;
    this.quantity = Number(quantity);
    this.unitPrice = Number(unitPrice);
    this.subtotal = this.quantity * this.unitPrice;
  }
}

