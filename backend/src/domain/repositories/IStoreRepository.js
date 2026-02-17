// IStoreRepository.js
// Capa de dominio: Contrato de repositorio (interfaz) para la entidad Store
// Define las operaciones que cualquier implementación de repositorio debe proporcionar
// siguiendo el patrón Repository para desacoplar la lógica de persistencia

class IStoreRepository {
  /**
   * Crea una nueva tienda en el sistema
   * @param {Object} storeData - Datos de la tienda a crear
   * @returns {Promise<Store>} La tienda creada
   * @throws {Error} Si ocurre un error en la persistencia
   */
  async create(storeData) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca una tienda por su ID único
   * @param {string} id - UUID de la tienda
   * @returns {Promise<Store|null>} La tienda encontrada o null si no existe
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca la tienda asociada a un usuario específico
   * Relación 1:1 - cada usuario tiene una sola tienda
   * @param {string} userId - UUID del usuario propietario
   * @returns {Promise<Store|null>} La tienda del usuario o null si no tiene
   */
  async findByUserId(userId) {
    throw new Error('Method not implemented');
  }
}

export default IStoreRepository;
