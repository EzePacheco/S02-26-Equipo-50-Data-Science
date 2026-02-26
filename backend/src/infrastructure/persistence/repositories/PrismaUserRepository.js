import IUserRepository from '../../../domain/repositories/IUserRepository.js';
import prisma from '../prisma/client.js';

class PrismaUserRepository extends IUserRepository {
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        store: true,
      },
    });
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(userData) {
    return await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
      },
    });
  }

  async update(id, userData) {
    return await prisma.user.update({
      where: { id },
      data: {
        name: userData.name,
        email: userData.email,
      },
    });
  }

  async delete(id) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async findAll() {
    return await prisma.user.findMany({
      include: {
        store: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default PrismaUserRepository;
