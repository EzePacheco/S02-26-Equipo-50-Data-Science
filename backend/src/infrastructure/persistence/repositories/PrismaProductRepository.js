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
        variants: true,
      },
    });
  }

  /**
   * Busca un producto por su SKU
   * @param {string} sku - Código SKU del producto
   * @returns {Promise<Object|null>} Producto encontrado o null
   */
  async findBySku(sku) {
    // Busca la variante por SKU y devuelve la variante incluyendo el producto
    const variant = await prisma.productVariant.findUnique({
      where: { sku },
      include: { product: true },
    });

    return variant;
  }

  /**
   * Busca una variante por su ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async findVariantById(id) {
    return await prisma.productVariant.findUnique({ where: { id }, include: { product: true } });
  }

  /**
   * Crea un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Object>} Producto creado
   */
  async create(productData) {
    // Mapear variantes para creación en la tabla ProductVariant
    const variantsCreate = (productData.variants || []).map(v => ({
      sku: v.sku,
      size: v.size,
      color: v.color,
      price: v.price,
      stock: v.stock || 0,
      minStock: v.minStock || null,
    }));

    return await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        category: productData.category,
        gender: productData.gender,
        style: productData.style,
        active: productData.active,
        variants: { create: variantsCreate },
      },
      include: { variants: true },
    });
  }

  /**
   * Actualiza un producto existente
   * @param {string} id - UUID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise<Object>} Producto actualizado
   */
  async update(id, productData) {
    // Actualiza campos del producto. Las variantes deben manejarse por separado
    const { variants, ...productFields } = productData || {};

    const updated = await prisma.product.update({
      where: { id },
      data: productFields,
      include: { variants: true },
    });

    // Si se pasaron variantes, aplicamos actualización parcial (merge) por id o sku
    if (Array.isArray(variants)) {
      await prisma.$transaction(async (tx) => {
        // traer variantes actuales
        const existing = await tx.productVariant.findMany({ where: { productId: id } });
        const byId = new Map(existing.map(v => [v.id, v]));
        const bySku = new Map(existing.map(v => [v.sku, v]));

        for (const v of variants) {
          // construir objeto con solo campos presentes
          const data = {};
          if (v.sku !== undefined) data.sku = v.sku;
          if (v.size !== undefined) data.size = v.size;
          if (v.color !== undefined) data.color = v.color;
          if (v.price !== undefined) data.price = v.price;
          if (v.stock !== undefined) data.stock = v.stock;
          if (v.minStock !== undefined) data.minStock = v.minStock;

          if (v.id && byId.has(v.id)) {
            await tx.productVariant.update({ where: { id: v.id }, data });
            continue;
          }

          if (v.sku && bySku.has(v.sku)) {
            const existingVariant = bySku.get(v.sku);
            await tx.productVariant.update({ where: { id: existingVariant.id }, data });
            continue;
          }

          // crear nueva variante
          await tx.productVariant.create({ data: { productId: id, sku: v.sku, size: v.size, color: v.color, price: v.price, stock: v.stock || 0, minStock: v.minStock || null } });
        }
      });

      return await prisma.product.findUnique({ where: { id }, include: { variants: true } });
    }

    return updated;
  }

  /**
   * Elimina un producto
   * @param {string} id - UUID del producto
   * @returns {Promise<void>}
   */
  async delete(id) {
    // Check if product has sales
    const salesCount = await prisma.saleItem.count({ where: { productId: id } });
    if (salesCount > 0) {
      // Soft delete to preserve sale history
      return await prisma.product.update({
        where: { id },
        data: { active: false },
      });
    }

    // Hard delete if no sales exist
    await prisma.inventory.deleteMany({ where: { productId: id } }).catch(() => { });
    return await prisma.product.delete({
      where: { id },
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
        variants: true,
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
        variants: true,
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
      include: {
        variants: true,
      },
    });
  }
}

export default PrismaProductRepository;
