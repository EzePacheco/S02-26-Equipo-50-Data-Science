class SaleController {
  /**
   * @param {import('../services/SaleService.js').default} saleService
   */
  constructor(saleService) {
    this.saleService = saleService;
  }

  /**
   * POST /api/sales
   * Crea una nueva venta con productos embebidos
   * Body esperado:
   * {
   *   "userId": "uuid",
   *   "customerId": "uuid" (opcional),
   *   "items": [
   *     { "productId": "uuid", "productName": "Nombre", "quantity": 2, "unitPrice": 100.00 }
   *   ]
   * }
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const { userId, customerId, items } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'El userId es requerido',
        });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'La venta debe incluir al menos un producto',
        });
      }

      const sale = await this.saleService.createSale({ userId, customerId, items });

      return res.status(201).json({
        success: true,
        message: 'Venta creada exitosamente',
        data: sale,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/sales
   * Obtiene todas las ventas
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAll(req, res, next) {
    try {
      const sales = await this.saleService.getAllSales();
      return res.status(200).json({
        success: true,
        data: sales,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/sales/:id
   * Obtiene una venta por su ID
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const sale = await this.saleService.getSaleById(id);

      if (!sale) {
        return res.status(404).json({
          success: false,
          error: 'Venta no encontrada',
        });
      }

      return res.status(200).json({
        success: true,
        data: sale,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/sales/user/:userId
   * Obtiene ventas por usuario
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const sales = await this.saleService.getSalesByUser(userId);
      return res.status(200).json({
        success: true,
        data: sales,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/sales/customer/:customerId
   * Obtiene ventas por cliente
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getByCustomer(req, res, next) {
    try {
      const { customerId } = req.params;
      const sales = await this.saleService.getSalesByCustomer(customerId);
      return res.status(200).json({
        success: true,
        data: sales,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/sales/date-range?startDate=...&endDate=...
   * Obtiene ventas por rango de fechas
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getByDateRange(req, res, next) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'Se requieren startDate y endDate',
        });
      }

      const sales = await this.saleService.getSalesByDateRange(
        new Date(startDate),
        new Date(endDate)
      );

      return res.status(200).json({
        success: true,
        data: sales,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default SaleController;
