/**
 * Product.js
 * Entidad de dominio: Representa el modelo general del producto.
 */
export default class Product {
  constructor({ id, name, description, category, gender, style, active = true }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.gender = gender;
    this.style = style;
    this.active = active;
  }

  deactivate() {
    this.active = false;
  }
}