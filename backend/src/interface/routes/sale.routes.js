import { Router } from 'express';

const router = Router();

/**
 * Configura las rutas de Venta con el controlador inyectado
 * @param {import('../controllers/sale.controller.js').default} saleController
 * @returns {Router}
 */
export function configureSaleRoutes(saleController) {
  router.post('/', (req, res, next) => saleController.create(req, res, next));
  router.get('/', (req, res, next) => saleController.getAll(req, res, next));
  router.get('/date-range', (req, res, next) => saleController.getByDateRange(req, res, next));
  router.get('/user/:userId', (req, res, next) => saleController.getByUser(req, res, next));
  router.get('/customer/:customerId', (req, res, next) => saleController.getByCustomer(req, res, next));
  router.get('/:id', (req, res, next) => saleController.getById(req, res, next));

  return router;
}

export default router;
