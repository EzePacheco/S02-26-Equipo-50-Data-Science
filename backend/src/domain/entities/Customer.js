/**
 * Customer.js
 * Entidad de dominio que representa un cliente del negocio
 * optional linkage to sales for purchase history tracking
 */
export default class Customer {
  constructor({ id, name, email, phone, createdAt }) {
    this.id = id;
    this.name = name;
    this.email = email ?? null;
    this.phone = phone ?? null;
    this.createdAt = createdAt;
  }
}


