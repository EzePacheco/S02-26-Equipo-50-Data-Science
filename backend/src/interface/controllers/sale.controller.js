// sale.controller.js
// Capa de interfaz: Manejador de peticiones HTTP para Venta

class SaleController {
  constructor(saleService) {
    this.saleService = saleService;
  }

  async create(req, res, next) {
    // TODO: Implementar manejador create
    // Validar array de artículos en req.body
    // Llamar saleService.createSale()
    // Retornar 201 con detalles de venta
  }

  async getAll(req, res, next) {
    // TODO: Implementar manejador getAll
    // Soportar parámetros de consulta: userId, customerId, rango de fechas
  }

  async getById(req, res, next) {
    // TODO: Implementar manejador getById
    // Incluir datos de artículos, cliente y usuario
  }

  async getByUser(req, res, next) {
    // TODO: Implementar manejador getByUser
  }

  async getByCustomer(req, res, next) {
    // TODO: Implementar manejador getByCustomer
  }

  async getByDateRange(req, res, next) {
    // TODO: Implementar manejador getByDateRange
    // Extraer startDate y endDate de req.query
  }

  async cancel(req, res, next) {
    // TODO: Implementar manejador cancel
    // Extraer id de req.params
    // Llamar saleService.cancelSale()
  }
}

export default SaleController;
