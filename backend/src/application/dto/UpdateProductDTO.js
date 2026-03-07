/**
 * UpdateProductDTO.js
 * Data Transfer Object para actualizar un producto
 * Maneja la validación de datos para actualización de productos
 */

import ProductSchema from '../../domain/schemas/product.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

/**
 * DTO para actualización de productos
 * Utiliza el schema parcial de producto para permitir campos opcionales
 */
class UpdateProductDTO {
  /**
   * Crea una instancia de UpdateProductDTO
   * @param {Object} data - Datos a validar
   */
  constructor(data) {
    this.data = this.validate(data);
  }

  /**
   * Valida los datos contra el schema parcial de producto
   * @param {Object} data - Datos a validar
   * @returns {Object} Datos validados
   * @throws {ValidationError} Si la validación falla
   */
  validate(data) {
    try {
      const updateSchema = ProductSchema.partial();
      return updateSchema.parse(data);
    } catch (error) {
      throw new ValidationError(
        error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      );
    }
  }

  /**
   * Obtiene los valores validados
   * @returns {Object} Datos del producto
   */
  getData() {
    return this.data;
  }
}

export default UpdateProductDTO;
