// customer.controller.js
// Capa de interfaz: Manejador de peticiones HTTP para Cliente

class CustomerController {
  constructor(customerService) {
    this.customerService = customerService;
  }

  async create(req, res, next) {
    // TODO: Implementar manejador create
  }

  async getAll(req, res, next) {
    // TODO: Implementar manejador getAll
  }

  async getById(req, res, next) {
    // TODO: Implementar manejador getById
  }

  async update(req, res, next) {
    // TODO: Implementar manejador update
  }

  async delete(req, res, next) {
    // TODO: Implementar manejador delete
  }

  async search(req, res, next) {
    // TODO: Implementar manejador search
    // Extraer query de req.query
    // Llamar customerService.searchCustomers()
  }
}

export default CustomerController;
