import { Router } from 'express';
import authMiddleware from '../../infrastructure/web/middlewares/authMiddleware.js';

const router = Router();

/**
 * Configura las rutas de Cliente con el controlador inyectado
 * @param {import('../controllers/customer.controller.js').default} customerController
 * @returns {Router}
 */
export function configureCustomerRoutes(customerController) {
  router.post('/', authMiddleware, (req, res, next) => customerController.create(req, res, next));
  router.get('/', authMiddleware, (req, res, next) => customerController.getAll(req, res, next));
  router.get('/search', authMiddleware, (req, res, next) => customerController.search(req, res, next));
  router.get('/:id', authMiddleware, (req, res, next) => customerController.getById(req, res, next));
  router.put('/:id', authMiddleware, (req, res, next) => customerController.update(req, res, next));
  router.delete('/:id', authMiddleware, (req, res, next) => customerController.delete(req, res, next));

  return router;
}

export default router;
