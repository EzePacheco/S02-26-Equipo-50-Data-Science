import Store from '../entities/Store.js';
import StoreSchema from '../schemas/store.schema.js';

/**
 * Factory para la entidad Store
 * Valida los datos con Zod antes de instanciar la clase
 */
export default (data) => {
  const validatedData = StoreSchema.parse(data);
  return new Store(validatedData);
};