/**
 * PrismaInventoryRepository.js
 * Capa de infraestructura: Implementación de repositorio de inventario con Prisma
 * Gestiona la persistencia del control de stock en la base de datos PostgreSQL
 */

import IInventoryRepository from '../../../domain/repositories/IInventoryRepository.js';
import prisma from '../prisma/client.js';

/**
 * Repositorio de inventario implementado con Prisma ORM
 * @extends IInventoryRepository
 */
class PrismaInventoryRepository extends IInventoryRepository {
  /**
   * Busca un registro de inventario por su ID
   * @param {string} id - UUID del inventario
   * @returns {Promise<Object|null>} Registro encontrado o null
   */
  async findById(id) {
    return await prisma.inventory.findUnique({
      where: { id },
    });
  }

  /**
   * Busca el inventario de un producto específico
   * @param {string} productId - UUID del producto
   * @returns {Promise<Object|null>} Inventario del producto o null
   */
  async findByProductId(productId) {
    return await prisma.inventory.findUnique({
      where: { productId },
    });
  }

  /**
   * Crea un nuevo registro de inventario
   * @param {Object} inventoryData - Datos del inventario
   * @returns {Promise<Object>} Inventario creado
   */
  async create(inventoryData) {
    return await prisma.inventory.create({
      data: inventoryData,
    });
  }

  /**
   * Actualiza un inventario existente
   * @param {Object} inventoryEntity - Entidad de inventario con datos actualizados
   * @returns {Promise<Object>} Inventario actualizado
   */
  async update(inventoryEntity) {
    return await prisma.inventory.update({
      where: { id: inventoryEntity.id },
      data: {
        quantity: inventoryEntity.quantity,
        minStock: inventoryEntity.minStock,
      },
    });
  }

  /**
   * Actualiza directamente el stock de un producto
   * @param {string} productId - UUID del producto
   * @param {number} quantity - Nueva cantidad de stock
   * @returns {Promise<Object>} Inventario actualizado
   */
  async updateStock(productId, quantity) {
    return await prisma.inventory.update({
      where: { productId },
      data: { quantity },
    });
  }

  /**
   * Elimina un registro de inventario
   * @param {string} id - UUID del inventario
   * @returns {Promise<void>}
   */
  async delete(id) {
    return await prisma.inventory.delete({
      where: { id },
    });
  }

  /**
   * Obtiene todos los registros de inventario con datos de productos
   * @returns {Promise<Array>} Lista de inventarios
   */
  async findAll() {
    return await prisma.inventory.findMany({
      include: {
        product: true,
      },
    });
  }

  /**
   * Obtiene productos con stock bajo el nivel mínimo
   * @returns {Promise<Array>} Lista de productos con stock bajo
   */
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
