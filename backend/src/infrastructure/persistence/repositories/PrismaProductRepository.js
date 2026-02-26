import IProductRepository from '../../../domain/repositories/IProductRepository.js';
import prisma from '../prisma/client.js';

class PrismaProductRepository extends IProductRepository {
  async findById(id) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        inventory: true,
      },
    });
  }

  async findBySku(sku) {
    return await prisma.product.findUnique({
      where: { sku },
    });
  }

  async create(productData) {
    return await prisma.product.create({
      data: productData,
    });
  }

  async update(id, productData) {
    return await prisma.product.update({
      where: { id },
      data: productData,
    });
  }

  async delete(id) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  async findAll() {
    return await prisma.product.findMany({
      include: {
        inventory: true,
      },
    });
  }

  async findByCategory(category) {
    return await prisma.product.findMany({
      where: { category },
      include: {
        inventory: true,
      },
    });
  }

  async findActive() {
    return await prisma.product.findMany({
      where: { active: true },
      include: {
        inventory: true,
      },
    });
  }
}

export default PrismaProductRepository;
