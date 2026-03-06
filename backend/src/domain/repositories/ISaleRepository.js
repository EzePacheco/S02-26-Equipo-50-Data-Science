/**
 * ISaleRepository.js
 * Capa de dominio: Contrato de repositorio para la entidad Venta
 * Define las operaciones que cualquier implementación de repositorio debe proporcionar
 */

class ISaleRepository {
  /**
   * Busca una venta por su ID
   * @param {string} id - UUID de la venta
   * @throws {Error} Método no implementado
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Crea una nueva venta
   * @param {Object} saleData - Datos de la venta
   * @throws {Error} Método no implementado
   */
  async create(saleData) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza una venta
   * @param {string} id - UUID de la venta
   * @param {Object} saleData - Datos a actualizar
   * @throws {Error} Método no implementado
   */
  async update(id, saleData) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina una venta
   * @param {string} id - UUID de la venta
   * @throws {Error} Método no implementado
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene todas las ventas
   * @throws {Error} Método no implementado
   */
  async findAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Busca ventas por ID de usuario
   * @param {string} userId - UUID del usuario
   * @throws {Error} Método no implementado
   */
  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca ventas por ID de cliente
   * @param {string} customerId - UUID del cliente
   * @throws {Error} Método no implementado
   */
  async findByCustomerId(customerId) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca ventas por rango de fechas
   * @param {Date} startDate - Fecha de inicio
   * @param {Date} endDate - Fecha de fin
   * @throws {Error} Método no implementado
   */
  async findByDateRange(startDate, endDate) {
    throw new Error('Method not implemented');
  }
}

export default ISaleRepository;
