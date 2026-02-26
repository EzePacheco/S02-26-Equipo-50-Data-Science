/**
 * IUserRepository.js
 * Capa de dominio: Interfaz de repositorio para la entidad Usuario
 * Define el contrato que deben implementar los repositorios concretos
 */

class IUserRepository {
  /**
   * Busca un usuario por su ID
   * @param {string} id - UUID del usuario
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Busca un usuario por su email
   * @param {string} email - Correo electrónico
   * @returns {Promise<Object|null>}
   */
  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  /**
   * Crea un nuevo usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<Object>}
   */
  async create(userData) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza un usuario existente
   * @param {string} id - UUID del usuario
   * @param {Object} userData - Datos a actualizar
   * @returns {Promise<Object>}
   */
  async update(id, userData) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina un usuario
   * @param {string} id - UUID del usuario
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene todos los usuarios
   * @returns {Promise<Array>}
   */
  async findAll() {
    throw new Error('Method not implemented');
  }
}

export default IUserRepository;
