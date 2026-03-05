// CreateProductDTO.js
// Data Transfer Object for creating a product

import ProductSchema from '../../domain/schemas/product.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

class CreateProductDTO {
  constructor(data) {
    try {
      
      this.validatedData = ProductSchema.parse(data);
    } catch (error) {
      throw new ValidationError(
        error.errors.map(e => `${e.path}: ${e.message}`).join(', ')
      );
    }
  }

  getData() {
    return this.validatedData;
  }
}

export default CreateProductDTO;
