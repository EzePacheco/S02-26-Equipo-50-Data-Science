// ProductService.js
// Capa de aplicación: Lógica de negocio para operaciones de Producto

class ProductService {
  constructor(productRepository) inventoryRepository) {
    this.productRepository = productRepository;
    this.inventoryRepository = inventoryRepository;
  }

  async createProduct(createProductDTO) {
    // TODO: Implementar lógica de crear producto
    // 1. Validar DTO
    // 2. Verificar si el SKU existe
    // 3. Crear producto
    // 4. Crear entrada de inventario con cantidad 0
  }

  async getProductById(id) {
    // TODO: Implementar lógica de obtener producto
    // Incluir datos de inventario
  }

  async getAllProducts() {
    // TODO: Implementar lógica de obtener todos los productos
  }

  async getProductsByCategory(category) {
    // TODO: Implementar filtro por categoría
  }

  async updateProduct(id, updateProductDTO) {
    // TODO: Implementar lógica de actualizar producto
  }

  async deleteProduct(id) {
    // TODO: Implementar lógica de eliminar producto
    // Verificar si el producto tiene ventas antes de eliminar
  }
}

export default ProductService;
