// InventoryService.js
// Capa de aplicación: Lógica de negocio para operaciones de Inventario

class InventoryService {
  constructor(inventoryRepository, productRepository) {
    this.inventoryRepository = inventoryRepository;
    this.productRepository = productRepository;
  }

  async getInventoryByProductId(productId) {
    // TODO: Implementar obtener inventario por producto
  }

  async updateStock(productId, quantity) {
    // TODO: Implementar lógica de actualización de stock
    // 1. Verificar que el producto existe
    // 2. Actualizar cantidad
    // 3. Validar que quantity >= 0
  }

  async getAllInventory() {
    // TODO: Implementar obtener todo el inventario
    // Incluir detalles del producto
  }

  async getLowStockItems() {
    // TODO: Implementar obtener artículos con stock bajo
    // Donde quantity <= minStock
  }

  async adjustStock(productId, adjustment) {
    // TODO: Implementar ajuste de stock
    // Positivo: agregar stock, Negativo: remover stock
    const invetoryData = await this.inventoryRepository.findByProductId(productId);
    if (!invetoryData) throw new Error('Producto no encontrado en inventario');

    const inventoryEntity = InventoryFactory(invetoryData);

    if (adjustment < 0 && inventoryEntity.quantity + adjustment < 0) {
      inventoryEntity.decrease(Math.abs(adjustment));
    } else {
      inventoryEntity.increase(adjustment);
    }

    return await this.inventoryRepository.update(inventoryEntity);
  }

  async setMinStock(productId, minStock) {
    // TODO: Implementar establecer nivel mínimo de stock
  }
}

export default InventoryService;
