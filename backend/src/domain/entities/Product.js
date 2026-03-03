/**
 * Product.js
 * Entidad de dominio: Representa el modelo general del producto.
 */
export default class Product {
  constructor({ id, name, description, category, gender, style, variants = [], active = true }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.gender = gender;
    this.style = style;
    this.active = active;
    
    this.variants = variants.map(v => new ProductVariant(v));
  }

  deactivate() {
    this.active = false;
  }
}

/**
 * ProductVariant.js
 * Entidad de dominio: Representa la existencia física de un producto con talla, color y precio.
 */
class ProductVariant {
  constructor({ id, sku, size, color, price, stock = 0 }) {
    this.id = id;
    this.sku = sku;
    this.size = size;
    this.color = color;
    this.price = price;
    this.stock = stock;
  }
}