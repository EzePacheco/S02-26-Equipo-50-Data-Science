// inventory.controller.js
// Capa de interfaz: Manejador de peticiones HTTP para Inventario

class InventoryController {
  constructor(inventoryService) {
    this.inventoryService = inventoryService;
  }

  async getAll(req, res, next) {
    // TODO: Implementar manejador getAll
    // Incluir detalles del producto
    try {
      const inventory = await this.inventoryService.getAllInventory();
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }

  async getByProductId(req, res, next) {
    // TODO: Implementar manejador getByProductId
    // Extraer productId de req.params
    try {
      const { productId } = req.params;
      const inventory = await this.inventoryService.getInventoryByProductId(productId);
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }

  async getLowStock(req, res, next) {
    // TODO: Implementar manejador getLowStock
    try {
      const items = await this.inventoryService.getLowStockItems();
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    // TODO: Implementar manejador updateStock
    // Extraer productId de req.params y quantity de req.body
    try {
      const { productId } = req.params;
      const { adjustment, quantity } = req.body;

      let result;
      if (adjustment !== undefined) {
        result = await this.inventoryService.adjustStock(productId, adjustment);
      } else {
        result = await this.inventoryService.updateStock(productId, quantity);
      }

      return res.status(200).json({
        success: true,
        message: 'Stock actualizado exitosamente',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async setMinStock(req, res, next) {
    // TODO: Implementar manejador setMinStock
    // Extraer productId de req.params y minStock de req.body
    try {
      const { productId } = req.params;
      const { minStock } = req.body;
      const result = await this.inventoryService.setMinStock(productId, minStock);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default InventoryController;
