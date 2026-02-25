import IInventoryRepository from '../../../domain/repositories/IInventoryRepository.js';
import prisma from '../prisma/client.js';

class PrismaInventoryRepository extends IInventoryRepository {
  async findById(id) {
    return await prisma.inventory.findUnique({
      where: { id },
    });
  }

  async findByProductId(productId) {
    return await prisma.inventory.findUnique({
      where: { productId },
    });
  }

  async create(inventoryData) {
    return await prisma.inventory.create({
      data: inventoryData,
    });
  }

  async update(inventoryEntity) {
    return await prisma.inventory.update({
      where: { id: inventoryEntity.id },
      data: {
        quantity: inventoryEntity.quantity,
        minStock: inventoryEntity.minStock,
      },
    });
  }

  async updateStock(productId, quantity) {
    return await prisma.inventory.update({
      where: { productId },
      data: { quantity },
    });
  }

  async delete(id) {
    return await prisma.inventory.delete({
      where: { id },
    });
  }

  async findAll() {
    return await prisma.inventory.findMany({
      include: {
        product: true,
      },
    });
  }

  async findLowStock() {
    const items = await prisma.inventory.findMany({
      include: {
        product: true,
      },
    });

    return items.filter((item) => item.minStock !== null && item.quantity <= item.minStock);
  }
}

export default PrismaInventoryRepository;
