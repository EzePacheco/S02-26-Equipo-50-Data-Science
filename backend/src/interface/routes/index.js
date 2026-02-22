// index.js
// Capa de interfaz: Configuración principal del router
// Este archivo centraliza el montaje de todas las rutas de la API

import { Router } from 'express';
import userRoutes from './user.routes.js';
import customerRoutes from './customer.routes.js';
import productRoutes from './product.routes.js';
import saleRoutes from './sale.routes.js';
import configureInventoryRoutes from './inventory.routes.js';
import { configureStoreRoutes } from './store.routes.js';

const router = Router();

/**
 * Configura todas las rutas de la API con sus respectivos controladores
 * @param {Object} controllers - Objeto con los controladores inyectados
 * @param {StoreController} controllers.storeController - Controlador de tiendas
 * @returns {Router} Router configurado con todas las rutas
 */
export function configureRoutes(controllers) {
  // Rutas de usuarios (TODO: implementar cuando estén listos)
  // router.use('/users', userRoutes);
  
  // Rutas de clientes (TODO: implementar cuando estén listos)
  // router.use('/customers', customerRoutes);
  
  // Rutas de productos (TODO: implementar cuando estén listos)
  // router.use('/products', productRoutes);
  
  // Rutas de ventas (TODO: implementar cuando estén listos)
  // router.use('/sales', saleRoutes);
  
  // Rutas de inventario (TODO: implementar cuando estén listos)
  // router.use('/inventory', inventoryRoutes);
  
  // Rutas de tiendas - Onboarding
  // Se monta con el controlador inyectado para permitir inyección de dependencias
  if (controllers?.storeController) {
    router.use('/stores', configureStoreRoutes(controllers.storeController));
  }

  if (controllers?.inventoryController) {
    router.use('/inventory', configureInventoryRoutes(controllers.inventoryController));
  }

  return router;
}

// Exportación por defecto para compatibilidad con código existente
// TODO: Eliminar cuando se migre completamente a la nueva estructura con inyección de dependencias
export default router;
