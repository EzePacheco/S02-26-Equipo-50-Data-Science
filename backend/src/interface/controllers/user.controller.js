// user.controller.js
// Capa de interfaz: Manejador de peticiones HTTP para Usuario

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res, next) {
    // TODO: Implementar manejador create
    // 1. Extraer datos de req.body
    // 2. Llamar userService.createUser()
    // 3. Retornar 201 con usuario creado
  }

  async getAll(req, res, next) {
    // TODO: Implementar manejador getAll
    // Llamar userService.getAllUsers()
    // Retornar 200 con array de usuarios
  }

  async getById(req, res, next) {
    // TODO: Implementar manejador getById
    // Extraer id de req.params
    // Llamar userService.getUserById()
    // Retornar 200 con usuario o 404 si no se encuentra
  }

  async update(req, res, next) {
    // TODO: Implementar manejador update
    // Extraer id de req.params y datos de req.body
    // Llamar userService.updateUser()
    // Retornar 200 con usuario actualizado
  }

  async delete(req, res, next) {
    // TODO: Implementar manejador delete
    // Extraer id de req.params
    // Llamar userService.deleteUser()
    // Retornar 204 (sin contenido)
  }
}

export default UserController;
