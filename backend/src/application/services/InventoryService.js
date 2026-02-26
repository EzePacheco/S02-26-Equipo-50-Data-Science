/**
 * InventoryService.js
 * Capa de aplicación: Lógica de negocio para operaciones de Inventario
 * Maneja el control de stock, niveles mínimos y ajustes de inventario
 */
import InventoryFactory from '../../domain/factories/createInventory.js';

/**
 * Servicio de inventario para gestionar el stock de productos
 * @param {Object} inventoryRepository - Repositorio de inventario
 * @param {Object} productRepository - Repositorio de productos
 */
class InventoryService {
  /**
   * @param {Object} inventoryRepository - Repositorio de inventario
   * @param {Object} productRepository - Repositorio de productos
   */
  constructor(inventoryRepository, productRepository) {
    this.inventoryRepository = inventoryRepository;
    this.productRepository = productRepository;
  }

  /**
   * Obtiene el inventario de un producto específico
   * @param {string} productId - ID del producto
   * @returns {Promise<Object>} Datos del inventario
   * @throws {Error} Si no se encuentra el inventario
   */
  async getInventoryByProductId(productId) {
    const inventoryData = await this.inventoryRepository.findByProductId(productId);

    if (!inventoryData) throw new Error('Inventario no encontrado para este producto');

    return InventoryFactory(inventoryData);
  }

  /**
   * Actualiza el stock de un producto a un valor específico
   * @param {string} productId - ID del producto
   * @param {number} quantity - Nueva cantidad de stock
   * @returns {Promise<Object>} Inventario actualizado
   * @throws {Error} Si el producto no existe o la cantidad es negativa
   */
  async updateStock(productId, quantity) {
    const inventoryData = await this.inventoryRepository.findByProductId(productId);
    if (!inventoryData) throw new Error('Producto no encontrado');

    const inventoryEntity = InventoryFactory(inventoryData);
    
    if (quantity < 0) throw new Error('La cantidad no puede ser negativa');
    inventoryEntity.quantity = quantity;

    return await this.inventoryRepository.update(inventoryEntity);
  }

  /**
   * Obtiene todos los registros de inventario
   * @returns {Promise<Array>} Lista de inventarios con datos de productos
   */
  async getAllInventory() {
    const allItems = await this.inventoryRepository.findAll();

    return allItems.map(item => InventoryFactory(item));
  }

  /**
   * Obtiene productos con stock bajo el nivel mínimo
   * @returns {Promise<Array>} Lista de productos con stock bajo
   */
  async getLowStockItems() {
    const itemsData = await this.inventoryRepository.findLowStock();

    if (!itemsData) return []; 

    return itemsData.map(data => InventoryFactory(data));
  }

  /**
   * Ajusta el stock de un producto (aumenta o disminuye)
   * @param {string} productId - ID del producto
   * @param {number} adjustment - Cantidad a ajustar (positivo o negativo)
   * @returns {Promise<Object>} Inventario actualizado
   * @throws {Error} Si el producto no existe en inventario
   */
  async adjustStock(productId, adjustment) {
    const inventoryData = await this.inventoryRepository.findByProductId(productId);
    if (!inventoryData) throw new Error('Producto no encontrado en inventario');

    const inventoryEntity = InventoryFactory(inventoryData);

    if (adjustment < 0) {
      inventoryEntity.decrease(Math.abs(adjustment));
    } else {
      inventoryEntity.increase(adjustment);
    }

    return await this.inventoryRepository.update(inventoryEntity);
  }

  /**
   * Establece el nivel mínimo de stock para un producto
   * @param {string} productId - ID del producto
   * @param {number} minStock - Nivel mínimo de stock
   * @returns {Promise<Object>} Inventario actualizado
   * @throws {Error} Si el producto no existe
   */
  async setMinStock(productId, minStock) {
    const inventoryData = await this.inventoryRepository.findByProductId(productId);
    if (!inventoryData) throw new Error('Producto no encontrado');

    const inventoryEntity = InventoryFactory(inventoryData);
    
    if (minStock < 0) throw new Error('El stock mínimo no puede ser negativo');
    inventoryEntity.minStock = minStock;

    return await this.inventoryRepository.update(inventoryEntity);
  }
}

export default InventoryService;
