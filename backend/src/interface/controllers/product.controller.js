// product.controller.js
// Capa de interfaz: Manejador de peticiones HTTP para Producto

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async create(req, res, next) {
    // TODO: Implementar manejador create
  }

  async getAll(req, res, next) {
    // TODO: Implementar manejador getAll
    // Soportar parámetros de consulta: active, category
  }

  async getById(req, res, next) {
    // TODO: Implementar manejador getById
    // Incluir datos de inventario
  }

  async getByCategory(req, res, next) {
    // TODO: Implementar manejador getByCategory
    // Extraer category de req.params
  }

  async update(req, res, next) {
    // TODO: Implementar manejador update
  }

  async delete(req, res, next) {
    // TODO: Implementar manejador delete
  }
}

export default ProductController;
