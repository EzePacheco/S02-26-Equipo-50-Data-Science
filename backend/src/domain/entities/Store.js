// Store.js
// Capa de dominio: Entidad Store representa una tienda en el sistema
// Se utiliza durante el onboarding para asociar un usuario con su tienda

export default class Store {
  /**
   * @param {Object} params - Parámetros para crear la tienda
   * @param {string} params.id - UUID único de la tienda
   * @param {string} params.name - Nombre de la tienda (ej: "Mi Tienda")
   * @param {string} params.category - Categoría de la tienda (ROPA | CALZADO)
   * @param {string} params.userId - ID del usuario propietario (relación 1:1)
   * @param {Date} params.createdAt - Fecha de creación
   * @param {Date} params.updatedAt - Fecha de última actualización
   */
  constructor({ id, name, category, userId, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
