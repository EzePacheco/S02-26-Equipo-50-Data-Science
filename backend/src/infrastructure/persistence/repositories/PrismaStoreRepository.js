// PrismaStoreRepository.js
// Capa de infraestructura: Implementación Prisma de IStoreRepository
// Maneja la persistencia de tiendas usando Prisma ORM

import IStoreRepository from '../../../domain/repositories/IStoreRepository.js';
import prisma from '../prisma/client.js';
import Store from '../../../domain/entities/Store.js';

class PrismaStoreRepository extends IStoreRepository {
  /**
   * Crea una nueva tienda en la base de datos
   * @param {Object} storeData - Datos de la tienda ({ name, category, userId })
   * @returns {Promise<Store>} Instancia de entidad Store creada
   */
  async create(storeData) {
    const prismaStore = await prisma.store.create({
      data: {
        name: storeData.name,
        category: storeData.category,
        userId: storeData.userId,
      },
    });

    // Mapeamos el resultado de Prisma a nuestra entidad de dominio
    return this._mapToEntity(prismaStore);
  }

  /**
   * Busca una tienda por su ID
   * @param {string} id - UUID de la tienda
   * @returns {Promise<Store|null>} Entidad Store o null si no existe
   */
  async findById(id) {
    const prismaStore = await prisma.store.findUnique({
      where: { id },
    });

    if (!prismaStore) return null;

    return this._mapToEntity(prismaStore);
  }

  /**
   * Busca la tienda asociada a un usuario
   * @param {string} userId - UUID del usuario
   * @returns {Promise<Store|null>} Entidad Store o null si el usuario no tiene tienda
   */
  async findByUserId(userId) {
    const prismaStore = await prisma.store.findUnique({
      where: { userId }, // Aprovechamos el índice unique en userId
    });

    if (!prismaStore) return null;

    return this._mapToEntity(prismaStore);
  }

  /**
   * Método privado para mapear datos de Prisma a entidad de dominio Store
   * @param {Object} prismaStore - Datos crudos de Prisma
   * @returns {Store} Instancia de la entidad Store
   * @private
   */
  _mapToEntity(prismaStore) {
    return new Store({
      id: prismaStore.id,
      name: prismaStore.name,
      category: prismaStore.category,
      userId: prismaStore.userId,
      createdAt: prismaStore.createdAt,
      updatedAt: prismaStore.updatedAt,
    });
  }
}

export default PrismaStoreRepository;
