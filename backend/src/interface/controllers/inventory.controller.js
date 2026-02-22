// inventory.controller.js
// Capa de interfaz: Manejador de peticiones HTTP para Inventario

class InventoryController {
  constructor(inventoryService) {
    this.inventoryService = inventoryService;
  }

  async getAll(req, res, next) {
    // TODO: Implementar manejador getAll
    // Incluir detalles del producto
  }

  async getByProductId(req, res, next) {
    // TODO: Implementar manejador getByProductId
    // Extraer productId de req.params
  }

  async getLowStock(req, res, next) {
    // TODO: Implementar manejador getLowStock
  }

  async updateStock(req, res, next) {
    // TODO: Implementar manejador updateStock
    // Extraer productId de req.params y quantity de req.body
    try {
      const { productId } = req.params;
      const { quantity } = req.body;

      const updatedInventory = await this.inventoryService.adjustStock(productId, quantity);
      return res.status(200).json({
        success: true,
        message: 'Stock actualizado exitosamente',
        data: updatedInventory
      });
    } catch (error) {
      next(error);
    }
  }

  async setMinStock(req, res, next) {
    // TODO: Implementar manejador setMinStock
    // Extraer productId de req.params y minStock de req.body
  }
}

export default InventoryController;
