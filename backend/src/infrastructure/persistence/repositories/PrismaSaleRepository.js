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
          customerName: saleData.customerName,
          totalAmount: saleData.totalAmount,
          paymentMethod: saleData.paymentMethod || null,
          items: {
            create: saleData.items.map((item) => ({
              variantId: item.variantId || item.productId,
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
        
        if (item.variantId) {
          await tx.productVariant.update({ where: { id: item.variantId }, data: { stock: { decrement: item.quantity } } });
          continue;
        }

        const variants = await tx.productVariant.findMany({ where: { productId: item.productId }, orderBy: { createdAt: 'asc' } });
        if (!variants || variants.length === 0) continue;

        const sufficient = variants.find(v => (v.stock || 0) >= item.quantity);
        if (sufficient) {
          await tx.productVariant.update({ where: { id: sufficient.id }, data: { stock: { decrement: item.quantity } } });
        } else {
          await tx.productVariant.update({ where: { id: variants[0].id }, data: { stock: { decrement: item.quantity } } });
        }
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
   * @param {string} userId - ID del usuario autenticado (opcional)
   * @returns {Promise<Array>}
   */
  async findByDateRange(startDate, endDate, userId = null) {
    const where = {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (userId) {
      where.userId = userId;
    }

    return await prisma.sale.findMany({
      where,
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
