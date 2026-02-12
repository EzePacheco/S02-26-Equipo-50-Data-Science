// PrismaUserRepository.js
// Capa de infraestructura: Implementación Prisma de IUserRepository

import IUserRepository from '../../../domain/repositories/IUserRepository.js';
import prisma from '../client.js';

class PrismaUserRepository extends IUserRepository {
  async findById(id) {
    // TODO: Implementar usando prisma.user.findUnique
  }

  async findByEmail(email) {
    // TODO: Implementar usando prisma.user.findUnique
  }

  async create(userData) {
    // TODO: Implementar usando prisma.user.create
  }

  async update(id, userData) {
    // TODO: Implementar usando prisma.user.update
  }

  async delete(id) {
    // TODO: Implementar usando prisma.user.delete
  }

  async findAll() {
    // TODO: Implementar usando prisma.user.findMany
  }
}

export default PrismaUserRepository;
