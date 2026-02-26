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
        password: userData.password,
      },
    });
  }

  async update(id, userData) {
    const data = {
      name: userData.name,
      email: userData.email,
    };
    if (userData.password) {
      data.password = userData.password;
    }
    return await prisma.user.update({
      where: { id },
      data,
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
