class UserController {
  /**
   * @param {import('../services/UserService.js').default} userService
   */
  constructor(userService) {
    this.userService = userService;
  }

  /**
   * POST /api/users
   * Crea un nuevo usuario
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'Nombre y email son requeridos',
        });
      }

      const user = await this.userService.createUser({ name, email });

      return res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/users
   * Obtiene todos los usuarios
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAll(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/users/:id
   * Obtiene un usuario por ID
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/users/:id
   * Actualiza un usuario
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const user = await this.userService.updateUser(id, { name, email });
      return res.status(200).json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/users/:id
   * Elimina un usuario
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
