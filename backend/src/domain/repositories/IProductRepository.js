// IProductRepository.js
// Capa de dominio: Contrato de repositorio para la entidad Producto

class IProductRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findBySku(sku) {
    throw new Error('Method not implemented');
  }

  async create(productData) {
    throw new Error('Method not implemented');
  }

  async update(id, productData) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async findByCategory(category) {
    throw new Error('Method not implemented');
  }

  async findActive() {
    throw new Error('Method not implemented');
  }
}

export default IProductRepository;
