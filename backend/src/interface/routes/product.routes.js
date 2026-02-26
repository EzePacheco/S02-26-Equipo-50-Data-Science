import { Router } from 'express';
import authMiddleware from '../../infrastructure/web/middlewares/authMiddleware.js';

const router = Router();

/**
 * Configura las rutas de Producto con el controlador inyectado
 * @param {import('../controllers/product.controller.js').default} productController
 * @returns {Router}
 */
export function configureProductRoutes(productController) {
  router.post('/', authMiddleware, (req, res, next) => productController.create(req, res, next));
  router.get('/', authMiddleware, (req, res, next) => productController.getAll(req, res, next));
  router.get('/category/:category', authMiddleware, (req, res, next) => productController.getByCategory(req, res, next));
  router.get('/:id', authMiddleware, (req, res, next) => productController.getById(req, res, next));
  router.put('/:id', authMiddleware, (req, res, next) => productController.update(req, res, next));
  router.delete('/:id', authMiddleware, (req, res, next) => productController.delete(req, res, next));

  return router;
}

export default router;
