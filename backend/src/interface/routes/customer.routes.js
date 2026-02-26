import { Router } from 'express';

const router = Router();

/**
 * Configura las rutas de Cliente con el controlador inyectado
 * @param {import('../controllers/customer.controller.js').default} customerController
 * @returns {Router}
 */
export function configureCustomerRoutes(customerController) {
  router.post('/', (req, res, next) => customerController.create(req, res, next));
  router.get('/', (req, res, next) => customerController.getAll(req, res, next));
  router.get('/search', (req, res, next) => customerController.search(req, res, next));
  router.get('/:id', (req, res, next) => customerController.getById(req, res, next));
  router.put('/:id', (req, res, next) => customerController.update(req, res, next));
  router.delete('/:id', (req, res, next) => customerController.delete(req, res, next));

  return router;
}

export default router;
