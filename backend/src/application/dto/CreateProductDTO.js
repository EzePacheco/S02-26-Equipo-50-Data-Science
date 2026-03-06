/**
 * CreateProductDTO.js
 * Data Transfer Object para crear un producto
 * Maneja la validación de datos para nuevos productos
 */

import ProductSchema from '../../domain/schemas/product.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

/**
 * DTO para creación de productos
 * Valida los datos contra el schema de producto
 */
class CreateProductDTO {
  /**
   * Crea una instancia de CreateProductDTO
   * @param {Object} data - Datos del producto a crear
   * @throws {ValidationError} Si la validación falla
   */
  constructor(data) {
    try {
      
      this.validatedData = ProductSchema.parse(data);
    } catch (error) {
      throw new ValidationError(
        error.errors.map(e => `${e.path}: ${e.message}`).join(', ')
      );
    }
  }

  /**
   * Obtiene los datos validados
   * @returns {Object} Datos del producto
   */
  getData() {
    return this.validatedData;
  }
}

export default CreateProductDTO;
