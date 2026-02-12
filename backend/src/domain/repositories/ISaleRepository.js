// ISaleRepository.js
// Capa de dominio: Contrato de repositorio para la entidad Venta

class ISaleRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async create(saleData) {
    throw new Error('Method not implemented');
  }

  async update(id, saleData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async findByCustomerId(customerId) {
    throw new Error('Method not implemented');
  }

  async findByDateRange(startDate, endDate) {
    throw new Error('Method not implemented');
  }
}

export default ISaleRepository;
