// CreateStoreDTO.js
// Capa de aplicación: Data Transfer Object para crear una tienda
// Se utiliza durante el onboarding del usuario para capturar los datos mínimos necesarios:
// - name: Nombre de la tienda (ej: "Mi Tienda de Ropa")
// - category: Categoría seleccionada (ROPA o CALZADO)
// - userId: ID del usuario autenticado que está creando la tienda

import StoreSchema from '../../domain/schemas/store.schema.js';
import ValidationError from '../../domain/errors/ValidationError.js';

class CreateStoreDTO {
  /**
   * @param {Object} params - Datos para crear la tienda
   * @param {string} params.name - Nombre de la tienda
   * @param {string} params.category - Categoría (ROPA | CALZADO)
   * @param {string} params.userId - ID del usuario propietario
   */
  constructor({ name, category, userId }) {
    this.name = name;
    this.category = category;
    this.userId = userId;
  }

  /**
   * Valida los datos del DTO contra el schema de dominio
   * @throws {ValidationError} Si los datos no cumplen con las reglas de validación
   */
  validate() {
    // Validamos solo los campos necesarios para crear (omitimos id y timestamps)
    const validationSchema = StoreSchema.omit({ id: true, createdAt: true, updatedAt: true });
    
    const result = validationSchema.safeParse({
      name: this.name,
      category: this.category,
      userId: this.userId,
    });

    if (!result.success) {
      // Extraemos los mensajes de error de Zod
      const errors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      throw new ValidationError('Validación de tienda fallida', errors);
    }
  }
}

export default CreateStoreDTO;
