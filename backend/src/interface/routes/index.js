import { Router } from 'express';
import { configureUserRoutes } from './user.routes.js';
import { configureCustomerRoutes } from './customer.routes.js';
import { configureProductRoutes } from './product.routes.js';
import { configureSaleRoutes } from './sale.routes.js';
import configureInventoryRoutes from './inventory.routes.js';
import { configureStoreRoutes } from './store.routes.js';

const router = Router();

/**
 * Configura todas las rutas de la API con sus respectivos controladores
 * @param {Object} controllers - Objeto con los controladores inyectados
 * @returns {Router} Router configurado con todas las rutas
 */
export function configureRoutes(controllers) {
  if (controllers?.userController) {
    router.use('/users', configureUserRoutes(controllers.userController));
  }

  if (controllers?.customerController) {
    router.use('/customers', configureCustomerRoutes(controllers.customerController));
  }

  if (controllers?.productController) {
    router.use('/products', configureProductRoutes(controllers.productController));
  }

  if (controllers?.saleController) {
    router.use('/sales', configureSaleRoutes(controllers.saleController));
  }

  if (controllers?.storeController) {
    router.use('/stores', configureStoreRoutes(controllers.storeController));
  }

  if (controllers?.inventoryController) {
    router.use('/inventory', configureInventoryRoutes(controllers.inventoryController));
  }

  return router;
}

export default router;
