/**
 * IProductRepository.js
 * Capa de dominio: Interfaz de repositorio para la entidad Producto
 * Define el contrato que deben implementar los repositorios concretos
 */

class IProductRepository {
  /**
   * Busca un producto por su ID
   * @param {string} id - UUID del producto
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca un producto por su SKU
   * @param {string} sku - Código SKU
   * @returns {Promise<Object|null>}
   */
  async findBySku(sku) {
    throw new Error('Method not implemented');
  }

  /**
   * Crea un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>}
   */
  async create(productData) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza un producto existente
   * @param {string} id - UUID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise<Object>}
   */
  async update(id, productData) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina un producto
   * @param {string} id - UUID del producto
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene todos los productos
   * @returns {Promise<Array>}
   */
  async findAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Busca productos por categoría
   * @param {string} category - Categoría del producto
   * @returns {Promise<Array>}
   */
  async findByCategory(category) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene solo productos activos
   * @returns {Promise<Array>}
   */
  async findActive() {
    throw new Error('Method not implemented');
  }
}

export default IProductRepository;
