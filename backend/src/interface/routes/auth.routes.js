/**
 * auth.routes.js
 * Capa de interfaz: Rutas HTTP para autenticación
 * Define los endpoints para registro, login y gestión de sesión
 */

import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import authMiddleware from '../../infrastructure/web/middlewares/authMiddleware.js';

/**
 * Configura las rutas de autenticación
 * @param {Object} authController - Controlador de autenticación
 * @returns {Router} Router configurado
 */
const configureAuthRoutes = (authController) => {
  const router = Router();

  /**
   * POST /api/auth/register
   * Registra un nuevo usuario
   */
  router.post('/register', (req, res, next) => authController.register(req, res, next));

  /**
   * POST /api/auth/login
   * Inicia sesión con credenciales
   */
  router.post('/login', (req, res, next) => authController.login(req, res, next));

  /**
   * GET /api/auth/me
   * Obtiene el usuario actual (protegido)
   */
  router.get('/me', authMiddleware, (req, res, next) => authController.getCurrentUser(req, res, next));

  return router;
};

export { configureAuthRoutes };
