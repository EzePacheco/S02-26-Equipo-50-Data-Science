/**
 * AuthController.js
 * Capa de interfaz: Manejador de peticiones HTTP para autenticación
 * Gestiona registro, inicio de sesión y obtención de usuario actual
 */

class AuthController {
  /**
   * @param {Object} authService - Servicio de autenticación
   */
  constructor(authService) {
    this.authService = authService;
  }

  /**
   * POST /api/auth/register
   * Registra un nuevo usuario en el sistema
   * Body: { name: string, email: string, password: string }
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const result = await this.authService.register({ name, email, password });
      return res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/login
   * Inicia sesión con credenciales existentes
   * Body: { email: string, password: string }
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login({ email, password });
      return res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/auth/me
   * Obtiene el usuario actualmente autenticado
   * Requiere header Authorization: Bearer <token>
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getCurrentUser(req, res, next) {
    try {
      const user = await this.authService.getCurrentUser(req.user.userId);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
