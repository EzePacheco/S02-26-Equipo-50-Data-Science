import ValidationError from '../../domain/errors/ValidationError.js';
import NotFoundError from '../../domain/errors/NotFoundError.js';

class UserService {
  /**
   * @param {import('../../domain/repositories/IUserRepository.js').default} userRepository
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Crea un nuevo usuario
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async createUser(userData) {
    if (!userData.name || !userData.email) {
      throw new ValidationError('Nombre y email son requeridos');
    }

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ValidationError('El email ya esta en uso');
    }

    return await this.userRepository.create(userData);
  }

  /**
   * Obtiene un usuario por ID
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }
    return user;
  }

  /**
   * Obtiene todos los usuarios
   * @returns {Promise<Array>}
   */
  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  /**
   * Actualiza un usuario
   * @param {string} id
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async updateUser(id, userData) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundError('Usuario no encontrado');
    }

    if (userData.email && userData.email !== existingUser.email) {
      const emailInUse = await this.userRepository.findByEmail(userData.email);
      if (emailInUse) {
        throw new ValidationError('El email ya esta en uso');
      }
    }

    return await this.userRepository.update(id, userData);
  }

  /**
   * Elimina un usuario
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundError('Usuario no encontrado');
    }
    return await this.userRepository.delete(id);
  }
}

export default UserService;
