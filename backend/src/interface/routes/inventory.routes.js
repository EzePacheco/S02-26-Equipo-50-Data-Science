/**
 * inventory.routes.js
 * Capa de interfaz: Rutas HTTP de Inventario
 * Endpoints para gestionar el stock de productos
 */

import { Router } from 'express';
import authMiddleware from '../../infrastructure/web/middlewares/authMiddleware.js';

/**
 * Configura las rutas de inventario
 * @param {Object} inventoryController - Controlador de inventario
 * @returns {Router} Router configurado
 */
export function configureInventoryRoutes(inventoryController) {
    const router = Router();

  /**
   * GET /api/inventory
   * Obtiene todos los registros de inventario
   */
  router.get('/', authMiddleware, (req, res, next) => 
    inventoryController.getAll(req, res, next));

  /**
   * GET /api/inventory/low-stock
   * Obtiene productos con stock bajo el nivel mínimo
   */
  router.get('/low-stock', authMiddleware, (req, res, next) => 
    inventoryController.getLowStock(req, res, next));

  /**
   * GET /api/inventory/product/:productId
   * Obtiene el inventario de un producto específico
   */
  router.get('/product/:productId', authMiddleware, (req, res, next) => 
    inventoryController.getByProductId(req, res, next));

  /**
   * PUT /api/inventory/product/:productId/stock
   * Actualiza el stock de un producto
   */
  router.put('/product/:productId/stock', authMiddleware, (req, res, next) => 
    inventoryController.updateStock(req, res, next));

  /**
   * PATCH /api/inventory/product/:productId/min-stock
   * Establece el nivel mínimo de stock
   */
  router.patch('/product/:productId/min-stock', authMiddleware, (req, res, next) => 
    inventoryController.setMinStock(req, res, next));
  
  return router;
}

export default configureInventoryRoutes;
