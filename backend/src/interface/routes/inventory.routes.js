// inventory.routes.js
// Capa de interfaz: Rutas HTTP de Inventario

import { Router } from 'express';
// TODO: Importar controlador
// import InventoryController from '../controllers/inventory.controller.js';

export function configureInventoryRoutes(inventoryController) {
    const router = Router();
// TODO: Definir rutas
// router.get('/', InventoryController.getAll);
// router.get('/product/:productId', InventoryController.getByProductId);
// router.get('/low-stock', InventoryController.getLowStock);
    router.put('/product/:productId/stock', (req, res, next) => 
        inventoryController.updateStock(req, res, next));

    return router;
// router.patch('/product/:productId/min-stock', InventoryController.setMinStock);
}

export default router;
