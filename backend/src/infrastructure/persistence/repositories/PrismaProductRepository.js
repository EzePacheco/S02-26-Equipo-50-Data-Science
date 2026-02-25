// PrismaProductRepository.js
// Capa de infraestructura: Implementación Prisma de IProductRepository

import IProductRepository from '../../../domain/repositories/IProductRepository.js';
import prisma from '../client.js';

class PrismaProductRepository extends IProductRepository {
  async findById(id) {
    // TODO: Implementar usando prisma.product.findUnique
    // Incluir relación de inventario
  }

  async findBySku(sku) {
    // TODO: Implementar usando prisma.product.findUnique
  }

  async create(productData) {
    // TODO: Implementar usando prisma.product.create
  }

  async update(id, productData) {
    // TODO: Implementar usando prisma.product.update
  }

  async delete(id) {
    // TODO: Implementar usando prisma.product.delete
  }

  async findAll() {
    // TODO: Implementar usando prisma.product.findMany
    // Incluir relación de inventario
  }

  async findByCategory(category) {
    // TODO: Implementar usando prisma.product.findMany con filtro
  }

  async findActive() {
    // TODO: Implementar usando prisma.product.findMany con active=true
  }
}

export default PrismaProductRepository;
