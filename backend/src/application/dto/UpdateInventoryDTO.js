/**
 * UpdateInventoryDTO.js
 * Data Transfer Object para actualizar inventario
 * Maneja la validación de datos para actualizar stock y stock mínimo
 */

class UpdateInventoryDTO {
  /**
   * Crea una instancia de UpdateInventoryDTO
   * @param {Object} params - Parámetros de actualización
   * @param {string} [params.variantId] - ID de la variante (mutuamente exclusivo con productId)
   * @param {string} [params.productId] - ID del producto (mutuamente exclusivo con variantId)
   * @param {number} [params.quantity] - Nueva cantidad en stock
   * @param {number} [params.minStock] - Nuevo stock mínimo
   */
  constructor({ variantId, productId, quantity, minStock }) {
    
    this.variantId = variantId || null;
    this.productId = productId || null;
    this.quantity = typeof quantity === 'string' ? Number(quantity) : quantity;
    this.minStock = typeof minStock === 'string' ? Number(minStock) : minStock;
  }

  /**
   * Valida los datos del DTO
   * @throws {Error} Si los datos son inválidos
   */
  validate() {
    if (!this.variantId && !this.productId) throw new Error('variantId o productId requerido');
    if (this.quantity !== undefined && (typeof this.quantity !== 'number' || this.quantity < 0)) throw new Error('Cantidad inválida: debe ser un número no negativo');
    if (this.minStock !== undefined && (typeof this.minStock !== 'number' || this.minStock < 0)) throw new Error('Stock mínimo inválido: debe ser un número no negativo');
  }
}

export default UpdateInventoryDTO;
