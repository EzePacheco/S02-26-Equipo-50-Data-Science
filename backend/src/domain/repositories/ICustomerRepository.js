// ICustomerRepository.js
// Capa de dominio: Contrato de repositorio para la entidad Cliente

class ICustomerRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async create(customerData) {
    throw new Error('Method not implemented');
  }

  async update(id, customerData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async findByPhone(phone) {
    throw new Error('Method not implemented');
  }
}

export default ICustomerRepository;
