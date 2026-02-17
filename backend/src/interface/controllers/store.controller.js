// store.controller.js
// Capa de interfaz: Manejador de peticiones HTTP para Store
// Coordina la creación y consulta de tiendas durante el onboarding

import CreateStoreDTO from '../../application/dto/CreateStoreDTO.js';

class StoreController {
  /**
   * @param {StoreService} storeService - Servicio de tiendas inyectado
   */
  constructor(storeService) {
    this.storeService = storeService;
  }

  /**
   * POST /api/stores
   * Crea una nueva tienda durante el onboarding del usuario
   * 
   * Body esperado:
   * {
   *   "name": "Mi Tienda de Ropa",
   *   "category": "ROPA"
   * }
   * 
   * El userId se obtiene del contexto de autenticación (req.user.id)
   * 
   * @param {Request} req - Objeto de petición Express
   * @param {Response} res - Objeto de respuesta Express
   * @param {NextFunction} next - Función para manejar errores
   */
  async create(req, res, next) {
    try {
      // Extraemos los datos validados del body
      const { name, category } = req.body;
      
      // El userId viene del middleware de autenticación
      // Por ahora, asumimos que está en req.user.id
      const userId = req.user?.id || req.body.userId; // Fallback para desarrollo

      if (!userId) {
        return res.status(400).json({
          error: 'Se requiere el ID de usuario',
          message: 'El userId debe proporcionarse en el token de autenticación',
        });
      }

      // Creamos el DTO con los datos de la tienda
      const createStoreDTO = new CreateStoreDTO({
        name,
        category,
        userId,
      });

      // Delegamos la creación al servicio
      const store = await this.storeService.createStore(createStoreDTO);

      // Respondemos con 201 Created y la tienda creada
      return res.status(201).json({
        success: true,
        message: 'Tienda creada exitosamente',
        data: store,
      });
    } catch (error) {
      // Pasamos el error al middleware de manejo de errores
      next(error);
    }
  }

  /**
   * GET /api/stores/my-store
   * Obtiene la tienda del usuario autenticado
   * 
   * Útil para mostrar la información de la tienda en el dashboard
   * 
   * @param {Request} req - Objeto de petición Express
   * @param {Response} res - Objeto de respuesta Express
   * @param {NextFunction} next - Función para manejar errores
   */
  async getMyStore(req, res, next) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          error: 'No autorizado',
          message: 'Se requiere autenticación',
        });
      }

      const store = await this.storeService.getStoreByUserId(userId);

      if (!store) {
        return res.status(404).json({
          error: 'No encontrado',
          message: 'El usuario no tiene una tienda asociada',
        });
      }

      return res.status(200).json({
        success: true,
        data: store,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default StoreController;
