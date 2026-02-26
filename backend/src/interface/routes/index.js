import { Router } from 'express';
import { configureUserRoutes } from './user.routes.js';
import { configureCustomerRoutes } from './customer.routes.js';
import { configureProductRoutes } from './product.routes.js';
import { configureSaleRoutes } from './sale.routes.js';
import configureInventoryRoutes from './inventory.routes.js';
import { configureStoreRoutes } from './store.routes.js';
import { configureAuthRoutes } from './auth.routes.js';

const router = Router();

export function configureRoutes(controllers) {
  if (controllers?.authController) {
    router.use('/auth', configureAuthRoutes(controllers.authController));
  }

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
