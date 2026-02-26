import { Router } from 'express';

const router = Router();

/**
 * Configura las rutas de Producto con el controlador inyectado
 * @param {import('../controllers/product.controller.js').default} productController
 * @returns {Router}
 */
export function configureProductRoutes(productController) {
  router.post('/', (req, res, next) => productController.create(req, res, next));
  router.get('/', (req, res, next) => productController.getAll(req, res, next));
  router.get('/category/:category', (req, res, next) => productController.getByCategory(req, res, next));
  router.get('/:id', (req, res, next) => productController.getById(req, res, next));
  router.put('/:id', (req, res, next) => productController.update(req, res, next));
  router.delete('/:id', (req, res, next) => productController.delete(req, res, next));

  return router;
}

export default router;
