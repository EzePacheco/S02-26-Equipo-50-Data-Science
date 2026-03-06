import { Router } from 'express';
import authMiddleware from '../../infrastructure/web/middlewares/authMiddleware.js';

const router = Router();

/**
 * Configura las rutas de Usuario con el controlador inyectado
 * @param {import('../controllers/user.controller.js').default} userController
 * @returns {Router}
 */
export function configureUserRoutes(userController) {
  router.post('/', (req, res, next) => userController.create(req, res, next));
  router.get('/', authMiddleware, (req, res, next) => userController.getAll(req, res, next));
  router.get('/:id', authMiddleware, (req, res, next) => userController.getById(req, res, next));
  router.put('/:id', authMiddleware, (req, res, next) => userController.update(req, res, next));
  router.delete('/:id', authMiddleware, (req, res, next) => userController.delete(req, res, next));

  return router;
}

export default router;
