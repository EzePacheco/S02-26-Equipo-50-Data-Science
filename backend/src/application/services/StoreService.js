// StoreService.js
// Capa de aplicación: Lógica de negocio para operaciones de Store
// Coordina las operaciones relacionadas con tiendas durante el onboarding

import ValidationError from '../../domain/errors/ValidationError.js';

class StoreService {
  /**
   * @param {IStoreRepository} storeRepository - Repositorio de tiendas
   * @param {IUserRepository} userRepository - Repositorio de usuarios (opcional, para validar existencia)
   */
  constructor(storeRepository, userRepository = null) {
    this.storeRepository = storeRepository;
    this.userRepository = userRepository;
  }

  /**
   * Crea una nueva tienda para un usuario durante el onboarding
   * Valida que el usuario no tenga ya una tienda asociada (relación 1:1)
   * 
   * @param {CreateStoreDTO} createStoreDTO - DTO con los datos de la tienda
   * @returns {Promise<Store>} La tienda creada
   * @throws {ValidationError} Si el usuario ya tiene una tienda o los datos son inválidos
   */
  async createStore(createStoreDTO) {
    // 1. Validar el DTO
    createStoreDTO.validate();

    // 2. Verificar que el usuario no tenga ya una tienda (regla de negocio: 1 tienda por usuario)
    const existingStore = await this.storeRepository.findByUserId(createStoreDTO.userId);
    if (existingStore) {
      throw new ValidationError('El usuario ya tiene una tienda asociada', [
        { field: 'userId', message: 'Solo se permite una tienda por usuario' },
      ]);
    }

    // 3. Crear la tienda
    const storeData = {
      name: createStoreDTO.name,
      category: createStoreDTO.category,
      userId: createStoreDTO.userId,
    };

    const createdStore = await this.storeRepository.create(storeData);

    return createdStore;
  }

  /**
   * Obtiene la tienda de un usuario específico
   * Útil para mostrar la información de la tienda en el dashboard
   * 
   * @param {string} userId - UUID del usuario
   * @returns {Promise<Store|null>} La tienda del usuario o null si no tiene
   */
  async getStoreByUserId(userId) {
    return await this.storeRepository.findByUserId(userId);
  }

  /**
   * Obtiene una tienda por su ID
   * 
   * @param {string} id - UUID de la tienda
   * @returns {Promise<Store|null>} La tienda encontrada o null
   */
  async getStoreById(id) {
    return await this.storeRepository.findById(id);
  }
}

export default StoreService;
