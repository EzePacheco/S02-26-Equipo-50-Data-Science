// PrismaCustomerRepository.js
// Capa de infraestructura: Implementación Prisma de ICustomerRepository

import ICustomerRepository from '../../../domain/repositories/ICustomerRepository.js';
import prisma from '../client.js';

class PrismaCustomerRepository extends ICustomerRepository {
  async findById(id) {
    // TODO: Implementar usando prisma.customer.findUnique
  }

  async findByEmail(email) {
    // TODO: Implementar usando prisma.customer.findUnique
  }

  async create(customerData) {
    // TODO: Implementar usando prisma.customer.create
  }

  async update(id, customerData) {
    // TODO: Implementar usando prisma.customer.update
  }

  async delete(id) {
    // TODO: Implementar usando prisma.customer.delete
  }

  async findAll() {
    // TODO: Implementar usando prisma.customer.findMany
  }

  async findByPhone(phone) {
    // TODO: Implementar usando prisma.customer.findUnique
  }
}

export default PrismaCustomerRepository;
