import ISaleRepository from '../../../domain/repositories/ISaleRepository.js';
import prisma from '../prisma/client.js';

class PrismaSaleRepository extends ISaleRepository {
  /**
   * Crea una venta con sus items usando transacción atómica
   * @param {Object} saleData - Datos de la venta { userId, customerId, items, totalAmount }
   * @returns {Promise<Object>} Venta creada con sus items
   */
  async create(saleData) {
    return await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          userId: saleData.userId,
          customerId: saleData.customerId,
          totalAmount: saleData.totalAmount,
          items: {
            create: saleData.items.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              subtotal: item.quantity * item.unitPrice,
            })),
          },
        },
        include: {
          items: true,
          customer: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      for (const item of saleData.items) {
        await tx.inventory.update({
          where: { productId: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return sale;
    });
  }

  /**
   * Busca una venta por su ID
   * @param {string} id - UUID de la venta
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return await prisma.sale.findUnique({
      where: { id },
      include: {
        items: true,
        customer: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Busca todas las ventas
   * @returns {Promise<Array>}
   */
  async findAll() {
    return await prisma.sale.findMany({
      include: {
        items: true,
        customer: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Busca ventas por ID de usuario
   * @param {string} userId
   * @returns {Promise<Array>}
   */
  async findByUserId(userId) {
    return await prisma.sale.findMany({
      where: { userId },
      include: {
        items: true,
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Busca ventas por ID de cliente
   * @param {string} customerId
   * @returns {Promise<Array>}
   */
  async findByCustomerId(customerId) {
    return await prisma.sale.findMany({
      where: { customerId },
      include: {
        items: true,
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Busca ventas por rango de fechas
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Promise<Array>}
   */
  async findByDateRange(startDate, endDate) {
    return await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        items: true,
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default PrismaSaleRepository;
