/**
 * IInventoryRepository.js
 * Capa de dominio: Contrato de repositorio para la entidad Inventario
 * Define las operaciones que cualquier implementación de repositorio debe proporcionar
 */

class IInventoryRepository {
  /**
   * Busca un inventario por su ID
   * @param {string} id - UUID del inventario
   * @throws {Error} Método no implementado
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca el inventario de un producto específico
   * @param {string} productId - UUID del producto
   * @throws {Error} Método no implementado
   */
  async findByProductId(productId) {
    throw new Error('Method not implemented');
  }

  /**
   * Crea un nuevo registro de inventario
   * @param {Object} inventoryData - Datos del inventario
   * @throws {Error} Método no implementado
   */
  async create(inventoryData) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza un inventario existente
   * @param {Object} inventoryEntity - Entidad de inventario
   * @throws {Error} Método no implementado
   */
  async update(inventoryEntity) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza el stock de un producto
   * @param {string} productId - UUID del producto
   * @param {number} quantity - Nueva cantidad
   * @throws {Error} Método no implementado
   */
  async updateStock(productId, quantity) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina un registro de inventario
   * @param {string} id - UUID del inventario
   * @throws {Error} Método no implementado
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene todos los registros de inventario
   * @throws {Error} Método no implementado
   */
  async findAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene productos con stock bajo
   * @throws {Error} Método no implementado
   */
  async findLowStock() {
    throw new Error('Method not implemented');
  }
}

export default IInventoryRepository;
