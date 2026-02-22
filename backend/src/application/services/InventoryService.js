// InventoryService.js
// Capa de aplicación: Lógica de negocio para operaciones de Inventario
import InventoryFactory from '../../domain/factories/createInventory.js';

class InventoryService {
  constructor(inventoryRepository, productRepository) {
    this.inventoryRepository = inventoryRepository;
    this.productRepository = productRepository;
  }

  async getInventoryByProductId(productId) {
    // TODO: Implementar obtener inventario por producto
    const inventoryData = await this.inventoryRepository.findByProductId(productId);

    if (!inventoryData) throw new Error('Inventario no encontrado para este producto');

    return InventoryFactory(inventoryData);
  }

  async updateStock(productId, quantity) {
    // TODO: Implementar lógica de actualización de stock
    // 1. Verificar que el producto existe
    // 2. Actualizar cantidad
    // 3. Validar que quantity >= 0
    const inventoryData = await this.inventoryRepository.findByProductId(productId);
    if (!inventoryData) throw new Error('Producto no encontrado');

    const inventoryEntity = InventoryFactory(inventoryData);
    
    // Validación directa sobre la entidad
    if (quantity < 0) throw new Error('La cantidad no puede ser negativa');
    inventoryEntity.quantity = quantity;

    return await this.inventoryRepository.update(inventoryEntity);
  }

  async getAllInventory() {
    // TODO: Implementar obtener todo el inventario
    // Incluir detalles del producto
    const allItems = await this.inventoryRepository.findAll();

    return allItems.map(item => InventoryFactory(item));
  }

  async getLowStockItems() {
    // TODO: Implementar obtener artículos con stock bajo
    // Donde quantity <= minStock
    const itemsData = await this.inventoryRepository.findLowStock();

    if (!itemsData) return []; 

    return itemsData.map(data => InventoryFactory(data));
  }

  async adjustStock(productId, adjustment) {
    // TODO: Implementar ajuste de stock
    // Positivo: agregar stock, Negativo: remover stock
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

  async setMinStock(productId, minStock) {
    // TODO: Implementar establecer nivel mínimo de stock
    const inventoryData = await this.inventoryRepository.findByProductId(productId);
    if (!inventoryData) throw new Error('Producto no encontrado');

    const inventoryEntity = InventoryFactory(inventoryData);
    
    if (minStock < 0) throw new Error('El stock mínimo no puede ser negativo');
    inventoryEntity.minStock = minStock;

    return await this.inventoryRepository.update(inventoryEntity);
  }
}

export default InventoryService;
