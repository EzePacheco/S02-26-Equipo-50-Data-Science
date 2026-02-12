// IInventoryRepository.js
// Capa de dominio: Contrato de repositorio para la entidad Inventario

class IInventoryRepository {
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByProductId(productId) {
    throw new Error('Method not implemented');
  }

  async create(inventoryData) {
    throw new Error('Method not implemented');
  }

  async update(id, inventoryData) {
    throw new Error('Method not implemented');
  }

  async updateStock(productId, quantity) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findAll() {
    throw new Error('Method not implemented');
  }

  async findLowStock() {
    throw new Error('Method not implemented');
  }
}

export default IInventoryRepository;
