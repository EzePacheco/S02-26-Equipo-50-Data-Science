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
      include: { inventory: true },
    });
  }

  /**
   * Crea un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>} Producto creado
   */
  async create(productData) {
    return await prisma.product.create({
      data: {
        name: productData.name,
        sku: productData.sku,
        price: productData.price,
        category: productData.category,
        size: productData.size || null,
        color: productData.color || null,
        active: productData.active !== undefined ? productData.active : true,
        userId: productData.userId || null,
      },
      include: { inventory: true },
    });
  }

  /**
   * Actualiza un producto existente
   * @param {string} id - UUID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise<Object>} Producto actualizado
   */
  async update(id, productData) {
    const updatedData = {};
    if (productData.name !== undefined) updatedData.name = productData.name;
    if (productData.sku !== undefined) updatedData.sku = productData.sku;
    if (productData.price !== undefined) updatedData.price = productData.price;
    if (productData.category !== undefined) updatedData.category = productData.category;
    if (productData.size !== undefined) updatedData.size = productData.size;
    if (productData.color !== undefined) updatedData.color = productData.color;
    if (productData.active !== undefined) updatedData.active = productData.active;

    return await prisma.product.update({
      where: { id },
      data: updatedData,
      include: { inventory: true },
    });
  }

  /**
   * Elimina un producto
   * @param {string} id - UUID del producto
   * @returns {Promise<void>}
   */
  async delete(id) {
    // Check if product has sales - buscar por variantId en saleItems
    const product = await prisma.product.findUnique({
      where: { id },
      include: { inventory: true }
    });

    if (!product) return;

    // Soft delete to preserve sale history
    return await prisma.product.update({
      where: { id },
      data: { active: false },
    });
  }

  /**
   * Obtiene todos los productos
   * @returns {Promise<Array>} Lista de productos con inventario
   */
  async findAll(userId) {
    return await prisma.product.findMany({
      where: { userId, active: true },
      include: {
        inventory: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Busca productos por categoría
   * @param {string} category - Categoría del producto
   * @returns {Promise<Array>} Lista de productos de la categoría
   */
  async findByCategory(category, userId) {
    return await prisma.product.findMany({
      where: { category, userId, active: true },
      include: {
        inventory: true,
      },
    });
  }

  /**
   * Obtiene solo productos activos
   * @returns {Promise<Array>} Lista de productos activos
   */
  async findActive(userId) {
    return await prisma.product.findMany({
      where: { active: true, userId },
      include: { inventory: true },
      orderBy: { createdAt: 'desc' },
    });
  }
        inventory: true,
      },
    });
  }
}

export default PrismaProductRepository;
