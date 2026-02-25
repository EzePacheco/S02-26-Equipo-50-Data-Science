// PrismaInventoryRepository.js
// Capa de infraestructura: Implementación Prisma de IInventoryRepository

import IInventoryRepository from '../../../domain/repositories/IInventoryRepository.js';
import prisma from '../client.js';

class PrismaInventoryRepository extends IInventoryRepository {
  async findById(id) {
    // TODO: Implementar usando prisma.inventory.findUnique
    return await prisma.inventory.findUnique({ 
      where: { id }
    });
  }

  async findByProductId(productId) {
    // TODO: Implementar usando prisma.inventory.findUnique
    return await prisma.inventory.findUnique({
      where: { productId }
    });
  }

  async create(inventoryData) {
    // TODO: Implementar usando prisma.inventory.create
    return await prisma.inventory.create({
      data: inventoryData
    });
  }

  /**
   * Actualiza el inventario usando la entidad de dominio
   * @param {Inventory} inventoryEntity 
   */
  async update(inventoryEntity) {
    // TODO: Implementar usando prisma.inventory.update
    return await prisma.inventory.update({
      where: { id: inventoryEntity.id },
      data: {
        quantity: inventoryEntity.quantity,
        minStock: inventoryEntity.minStock,
        updatedAt: new Date() // Si tienes este campo en el esquema
      }
    });
  }

  async updateStock(productId, quantity) {
    // TODO: Implementar usando prisma.inventory.update
    // Actualizar campo quantity
    return await prisma.inventory.update({
      where: { productId },
      data: { quantity }
    });
  }

  async delete(id) {
    // TODO: Implementar usando prisma.inventory.delete
    return await prisma.inventory.delete({
      where: { id }
    });
  }

  async findAll() {
    // TODO: Implementar usando prisma.inventory.findMany
    // Incluir relación de producto
    return await prisma.inventory.findMany({
      include: {
        product: true // Trae los detalles del producto (nombre, SKU, etc.)
      }
    });
  }

  async findLowStock() {
    // TODO: Implementar usando prisma.inventory.findMany
    // Filtrar donde quantity <= minStock
    return await prisma.inventory.findMany({
      where: {
        quantity: {
          lte: prisma.inventory.fields.minStock 
        }
      },
      include: { product: true }
    });
  }
}

export default PrismaInventoryRepository;
