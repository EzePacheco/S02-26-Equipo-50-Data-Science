import ValidationError from '../../domain/errors/ValidationError.js';
import NotFoundError from '../../domain/errors/NotFoundError.js';

class ProductService {
  /**
   * @param {import('../../domain/repositories/IProductRepository.js').default} productRepository
   * @param {import('../../domain/repositories/IInventoryRepository.js').default} inventoryRepository
   */
  constructor(productRepository, inventoryRepository) {
    this.productRepository = productRepository;
    this.inventoryRepository = inventoryRepository;
  }

  /**
   * Crea un nuevo producto con inventario inicial
   * @param {Object} productData
   * @returns {Promise<Object>}
   */
  async createProduct(productData) {
    if (!productData.name || !productData.sku) {
      throw new ValidationError('Nombre y SKU son requeridos');
    }

    if (productData.price === undefined || productData.price <= 0) {
      throw new ValidationError('El precio debe ser mayor a 0');
    }

    const existingProduct = await this.productRepository.findBySku(productData.sku);
    if (existingProduct) {
      throw new ValidationError('El SKU ya esta en uso');
    }

    const product = await this.productRepository.create(productData);

    await this.inventoryRepository.create({
      productId: product.id,
      quantity: productData.initialStock || 0,
      minStock: productData.minStock || null,
    });

    return product;
  }

  /**
   * Obtiene un producto por ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getProductById(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Producto no encontrado');
    }
    return product;
  }

  /**
   * Obtiene todos los productos
   * @returns {Promise<Array>}
   */
  async getAllProducts() {
    return await this.productRepository.findAll();
  }

  /**
   * Obtiene productos por categoria
   * @param {string} category
   * @returns {Promise<Array>}
   */
  async getProductsByCategory(category) {
    return await this.productRepository.findByCategory(category);
  }

  /**
   * Actualiza un producto
   * @param {string} id
   * @param {Object} productData
   * @returns {Promise<Object>}
   */
  async updateProduct(id, productData) {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundError('Producto no encontrado');
    }

    if (productData.sku && productData.sku !== existingProduct.sku) {
      const skuInUse = await this.productRepository.findBySku(productData.sku);
      if (skuInUse) {
        throw new ValidationError('El SKU ya esta en uso');
      }
    }

    return await this.productRepository.update(id, productData);
  }

  /**
   * Elimina un producto
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteProduct(id) {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundError('Producto no encontrado');
    }
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
