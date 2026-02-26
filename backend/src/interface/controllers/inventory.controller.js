/**
 * InventoryController.js
 * Capa de interfaz: Manejador de peticiones HTTP para Inventario
 * Expone los endpoints para gestionar el stock de productos
 */

class InventoryController {
  /**
   * @param {Object} inventoryService - Servicio de inventario
   */
  constructor(inventoryService) {
    this.inventoryService = inventoryService;
  }

  /**
   * GET /api/inventory
   * Obtiene todos los registros de inventario con datos de productos
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAll(req, res, next) {
    try {
      const inventory = await this.inventoryService.getAllInventory();
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/inventory/product/:productId
   * Obtiene el inventario de un producto específico
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getByProductId(req, res, next) {
    try {
      const { productId } = req.params;
      const inventory = await this.inventoryService.getInventoryByProductId(productId);
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/inventory/low-stock
   * Obtiene productos con stock bajo el nivel mínimo
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getLowStock(req, res, next) {
    try {
      const items = await this.inventoryService.getLowStockItems();
      res.status(200).json({ success: true, data: items });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/inventory/:productId
   * Actualiza el stock de un producto
   * Body: { quantity?: number, adjustment?: number }
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async updateStock(req, res, next) {
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

  /**
   * PUT /api/inventory/:productId/min-stock
   * Establece el nivel mínimo de stock para un producto
   * Body: { minStock: number }
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async setMinStock(req, res, next) {
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
