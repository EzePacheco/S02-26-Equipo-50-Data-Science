import ICustomerRepository from '../../../domain/repositories/ICustomerRepository.js';
import prisma from '../prisma/client.js';

class PrismaCustomerRepository extends ICustomerRepository {
  async findById(id) {
    return await prisma.customer.findUnique({
      where: { id },
      include: {
        sales: true,
      },
    });
  }

  async findByEmail(email) {
    return await prisma.customer.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone) {
    return await prisma.customer.findFirst({
      where: { phone },
    });
  }

  async create(customerData) {
    return await prisma.customer.create({
      data: {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
      },
    });
  }

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

  async delete(id) {
    return await prisma.customer.delete({
      where: { id },
    });
  }

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
