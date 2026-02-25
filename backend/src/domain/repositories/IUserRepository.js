// IUserRepository.js
// Capa de dominio: Contrato de repositorio (interfaz) para la entidad Usuario
// Define qué operaciones deben implementarse, no cómo

class IUserRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async create(userData) {
    throw new Error('Method not implemented');
  }

  async update(id, userData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }
}

export default IUserRepository;
