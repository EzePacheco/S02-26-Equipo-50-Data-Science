import CreateSaleDTO from '../dto/CreateSaleDTO.js';
import ValidationError from '../../domain/errors/ValidationError.js';
import NotFoundError from '../../domain/errors/NotFoundError.js';

class SaleService {
  /**
   * @param {Object} params
   * @param {import('../../domain/repositories/ISaleRepository.js').default} params.saleRepository
   * @param {import('../../domain/repositories/IProductRepository.js').default} params.productRepository
   * @param {import('../../domain/repositories/IInventoryRepository.js').default} params.inventoryRepository
   * @param {import('../../domain/repositories/ICustomerRepository.js').default} params.customerRepository
   */
  constructor(saleRepository, productRepository, inventoryRepository, customerRepository) {
    this.saleRepository = saleRepository;
    this.productRepository = productRepository;
    this.inventoryRepository = inventoryRepository;
    this.customerRepository = customerRepository;
  }

  /**
   * Crea una nueva venta con productos embebidos y descuenta el stock
   * @param {Object} params
   * @param {string} params.userId
   * @param {string|null} params.customerId
   * @param {Array<{productId: string, productName: string, quantity: number, unitPrice: number}>} params.items
   * @returns {Promise<Object>} La venta creada con sus items
   * @throws {ValidationError} Si los datos son inválidos
   * @throws {NotFoundError} Si un producto no existe
   * @throws {Error} Si no hay stock suficiente
   */
  async createSale({ userId, customerId, items }) {
    const createSaleDTO = new CreateSaleDTO({ userId, customerId, items });
    createSaleDTO.validate();

    for (const item of items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new NotFoundError(`Producto con ID ${item.productId} no encontrado`);
      }

      const inventory = await this.inventoryRepository.findByProductId(item.productId);
      if (!inventory || inventory.quantity < item.quantity) {
        throw new Error(
          `Stock insuficiente para el producto ${item.productName}. Disponible: ${inventory?.quantity || 0}`
        );
      }
    }

    const saleData = {
      userId: createSaleDTO.userId,
      customerId: createSaleDTO.customerId,
      items: createSaleDTO.items,
      totalAmount: createSaleDTO.totalAmount,
    };

    return await this.saleRepository.create(saleData);
  }

  /**
   * Obtiene una venta por su ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getSaleById(id) {
    return await this.saleRepository.findById(id);
  }

  /**
   * Obtiene todas las ventas
   * @returns {Promise<Array>}
   */
  async getAllSales() {
    return await this.saleRepository.findAll();
  }

  /**
   * Obtiene ventas por usuario
   * @param {string} userId
   * @returns {Promise<Array>}
   */
  async getSalesByUser(userId) {
    return await this.saleRepository.findByUserId(userId);
  }

  /**
   * Obtiene ventas por cliente
   * @param {string} customerId
   * @returns {Promise<Array>}
   */
  async getSalesByCustomer(customerId) {
    return await this.saleRepository.findByCustomerId(customerId);
  }

  /**
   * Obtiene ventas por rango de fechas
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Promise<Array>}
   */
  async getSalesByDateRange(startDate, endDate) {
    return await this.saleRepository.findByDateRange(startDate, endDate);
  }
}

export default SaleService;
