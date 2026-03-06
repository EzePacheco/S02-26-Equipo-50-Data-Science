/**
 * ICustomerRepository.js
 * Capa de dominio: Contrato de repositorio para la entidad Cliente
 * Define las operaciones que cualquier implementación de repositorio debe proporcionar
 */

class ICustomerRepository {
  /**
   * Busca un cliente por su ID
   * @param {string} id - UUID del cliente
   * @throws {Error} Método no implementado
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email, userId) {
    throw new Error('Method not implemented');
  }

  /**
   * Crea un nuevo cliente
   * @param {Object} customerData - Datos del cliente
   * @throws {Error} Método no implementado
   */
  async create(customerData) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza un cliente
   * @param {string} id - UUID del cliente
   * @param {Object} customerData - Datos a actualizar
   * @throws {Error} Método no implementado
   */
  async update(id, customerData) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina un cliente
   * @param {string} id - UUID del cliente
   * @throws {Error} Método no implementado
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene todos los clientes
   * @throws {Error} Método no implementado
   */
  async findAll() {
    throw new Error('Method not implemented');
  }

  async findByPhone(phone, userId) {
    throw new Error('Method not implemented');
  }
}

export default ICustomerRepository;
