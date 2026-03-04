import ValidationError from '../../domain/errors/ValidationError.js';
import NotFoundError from '../../domain/errors/NotFoundError.js';
import CreateProductDTO from '../dto/CreateProductDTO.js';
import UpdateProductDTO from '../dto/UpdateProductDTO.js';

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
  async createProduct(rawData) {
    const dto = new CreateProductDTO(rawData);
    const productData = dto.getData();

    for (const variant of productData.variants) {
      const existing = await this.productRepository.findBySku(variant.sku);
      if (existing) {
        throw new ValidationError(`El SKU ${variant.sku} ya está en uso`);
      }
    }

    const product = await this.productRepository.create(productData);

    if (this.inventoryRepository) {
      for (const variant of product.variants) {
        await this.inventoryRepository.create({
          productId: variant.id,
          quantity: variant.stock || 0
        });
      }
    }

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
  async updateProduct(id, rawData) {

    const dto = new UpdateProductDTO(rawData);
    const productData = dto.getValues();

    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) throw new NotFoundError('Producto no encontrado');

    if (productData.variants) {
      for (const variant of productData.variants) {
        if (variant.sku) {
          const skuOwner = await this.productRepository.findBySku(variant.sku);
           // findBySku now returns a variant with product relation
           if (skuOwner && skuOwner.productId !== id) {
            throw new ValidationError(`El SKU ${variant.sku} pertenece a otro producto`);
          }
        }
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
