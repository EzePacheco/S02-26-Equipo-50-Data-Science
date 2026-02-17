// store.routes.js
// Capa de interfaz: Rutas HTTP para operaciones de Store
// Define los endpoints relacionados con el onboarding y gestión de tiendas

import { Router } from 'express';

const router = Router();

/**
 * Configura las rutas de Store con el controlador inyectado
 * @param {StoreController} storeController - Instancia del controlador de tiendas
 * @returns {Router} Router configurado
 */
export function configureStoreRoutes(storeController) {
  /**
   * POST /api/stores
   * Crea una nueva tienda durante el onboarding
   * Body: { name: string, category: 'ROPA' | 'CALZADO' }
   */
  router.post('/', (req, res, next) => storeController.create(req, res, next));

  /**
   * GET /api/stores/my-store
   * Obtiene la tienda del usuario autenticado
   * Requiere autenticación
   */
  router.get('/my-store', (req, res, next) => storeController.getMyStore(req, res, next));

  return router;
}

export default router;
