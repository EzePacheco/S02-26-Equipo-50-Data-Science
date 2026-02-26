/**
 * User.js
 * Entidad de dominio que representa un usuario/tendero en el sistema
 * Cada usuario tiene una tienda asociada y realiza ventas
 */
export default class User {
  constructor({ id, email, name, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
