/**
 * PrismaCustomerRepository.js
 * Capa de infraestructura: Implementación de repositorio de clientes con Prisma
 * Gestiona la persistencia de clientes en la base de datos PostgreSQL
 */

import ICustomerRepository from '../../../domain/repositories/ICustomerRepository.js';
import prisma from '../prisma/client.js';

/**
 * Repositorio de clientes implementado con Prisma ORM
 * @extends ICustomerRepository
 */
class PrismaCustomerRepository extends ICustomerRepository {
  /**
   * Busca un cliente por su ID
   * @param {string} id - UUID del cliente
   * @returns {Promise<Object|null>} Cliente encontrado o null
   */
  async findById(id) {
    return await prisma.customer.findUnique({
      where: { id },
      include: {
        sales: true,
      },
    });
  }

  /**
   * Busca un cliente por su email
   * @param {string} email - Correo electrónico del cliente
   * @returns {Promise<Object|null>} Cliente encontrado o null
   */
  async findByEmail(email) {
    return await prisma.customer.findUnique({
      where: { email },
    });
  }

  /**
   * Busca un cliente por su teléfono
   * @param {string} phone - Teléfono del cliente
   * @returns {Promise<Object|null>} Cliente encontrado o null
   */
  async findByPhone(phone) {
    return await prisma.customer.findFirst({
      where: { phone },
    });
  }

  /**
   * Crea un nuevo cliente
   * @param {Object} customerData - Datos del cliente
   * @returns {Promise<Object>} Cliente creado
   */
  async create(customerData) {
    return await prisma.customer.create({
      data: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
      },
    });
  }

  /**
   * Actualiza un cliente existente
   * @param {string} id - UUID del cliente
   * @param {Object} customerData - Datos a actualizar
   * @returns {Promise<Object>} Cliente actualizado
   */
  async update(id, customerData) {
    return await prisma.customer.update({
      where: { id },
      data: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
      },
    });
  }

  /**
   * Elimina un cliente
   * @param {string} id - UUID del cliente
   * @returns {Promise<void>}
   */
  async delete(id) {
    return await prisma.customer.delete({
      where: { id },
    });
  }

  /**
   * Obtiene todos los clientes con sus ventas
   * @returns {Promise<Array>} Lista de clientes
   */
  async findAll() {
    return await prisma.customer.findMany({
      include: {
        sales: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default PrismaCustomerRepository;
