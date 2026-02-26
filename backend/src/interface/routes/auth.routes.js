import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import authMiddleware from '../../infrastructure/web/middlewares/authMiddleware.js';

const configureAuthRoutes = (authController) => {
  const router = Router();

  router.post('/register', (req, res, next) => authController.register(req, res, next));
  router.post('/login', (req, res, next) => authController.login(req, res, next));
  router.get('/me', authMiddleware, (req, res, next) => authController.getCurrentUser(req, res, next));

  return router;
};

export { configureAuthRoutes };
