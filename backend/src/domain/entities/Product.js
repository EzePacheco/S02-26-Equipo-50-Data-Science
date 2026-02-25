export default class Product {
  constructor({ id, name, sku, price, category, active = true }) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.price = price;
    this.category = category;
    this.active = active;
  }

  deactivate() {
    this.active = false;
  }
}
