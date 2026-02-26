// interface/routes/inventory.routes.js
// Capa de interfaz: Rutas HTTP de Inventario

import { Router } from 'express';
// TODO: Importar controlador
// import InventoryController from '../controllers/inventory.controller.js';

/**
 * Configura las rutas de inventario inyectando el controlador
 * @param {InventoryController} inventoryController 
 * @returns {Router}
 */
export function configureInventoryRoutes(inventoryController) {
    const router = Router();
// TODO: Definir rutas
   // GET /inventory - Obtener todo el inventario
  router.get('/', (req, res, next) => 
    inventoryController.getAll(req, res, next));

  // GET /inventory/low-stock - Artículos bajo el mínimo
  router.get('/low-stock', (req, res, next) => 
    inventoryController.getLowStock(req, res, next));

  // GET /inventory/product/:productId - Stock de un producto específico
  router.get('/product/:productId', (req, res, next) => 
    inventoryController.getByProductId(req, res, next));

  // PUT /inventory/product/:productId/stock - Ajustar stock (sumar/restar o setear)
  router.put('/product/:productId/stock', (req, res, next) => 
    inventoryController.updateStock(req, res, next));

  // PATCH /inventory/product/:productId/min-stock - Configurar alerta de stock bajo
  router.patch('/product/:productId/min-stock', (req, res, next) => 
    inventoryController.setMinStock(req, res, next));
  
  return router;
}

export default configureInventoryRoutes;
