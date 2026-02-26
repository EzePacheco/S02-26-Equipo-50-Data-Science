/**
 * PrismaProductRepository.js
 * Capa de infraestructura: Implementación de repositorio de productos con Prisma
 * Gestiona la persistencia de productos en la base de datos PostgreSQL
 */

import IProductRepository from '../../../domain/repositories/IProductRepository.js';
import prisma from '../prisma/client.js';

/**
 * Repositorio de productos implementado con Prisma ORM
 * @extends IProductRepository
 */
class PrismaProductRepository extends IProductRepository {
  /**
   * Busca un producto por su ID
   * @param {string} id - UUID del producto
   * @returns {Promise<Object|null>} Producto encontrado o null
   */
  async findById(id) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        inventory: true,
      },
    });
  }

  /**
   * Busca un producto por su SKU
   * @param {string} sku - Código SKU del producto
   * @returns {Promise<Object|null>} Producto encontrado o null
   */
  async findBySku(sku) {
    return await prisma.product.findUnique({
      where: { sku },
    });
  }

  /**
   * Crea un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>} Producto creado
   */
  async create(productData) {
    return await prisma.product.create({
      data: productData,
    });
  }

  /**
   * Actualiza un producto existente
   * @param {string} id - UUID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise<Object>} Producto actualizado
   */
  async update(id, productData) {
    return await prisma.product.update({
      where: { id },
      data: productData,
    });
  }

  /**
   * Elimina un producto
   * @param {string} id - UUID del producto
   * @returns {Promise<void>}
   */
  async delete(id) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  /**
   * Obtiene todos los productos
   * @returns {Promise<Array>} Lista de productos con inventario
   */
  async findAll() {
    return await prisma.product.findMany({
      include: {
        inventory: true,
      },
    });
  }

  /**
   * Busca productos por categoría
   * @param {string} category - Categoría del producto
   * @returns {Promise<Array>} Lista de productos de la categoría
   */
  async findByCategory(category) {
    return await prisma.product.findMany({
      where: { category },
      include: {
        inventory: true,
      },
    });
  }

  /**
   * Obtiene solo productos activos
   * @returns {Promise<Array>} Lista de productos activos
   */
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
