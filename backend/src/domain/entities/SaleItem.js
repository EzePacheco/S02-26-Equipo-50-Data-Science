export default class SaleItem {
  constructor({ productId, productName, quantity, unitPrice }) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.unitPrice = Number(unitPrice);
    this.subtotal = this.quantity * this.unitPrice;
  }
}

