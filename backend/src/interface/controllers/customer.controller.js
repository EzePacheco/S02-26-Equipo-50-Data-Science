class CustomerController {
  /**
   * @param {import('../services/CustomerService.js').default} customerService
   */
  constructor(customerService) {
    this.customerService = customerService;
  }

  /**
   * POST /api/customers
   * Crea un nuevo cliente
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const { name, email, phone } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          error: 'El nombre es requerido',
        });
      }

      const customer = await this.customerService.createCustomer({ name, email, phone });

      return res.status(201).json({
        success: true,
        message: 'Cliente creado exitosamente',
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/customers
   * Obtiene todos los clientes
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAll(req, res, next) {
    try {
      const customers = await this.customerService.getAllCustomers();
      return res.status(200).json({
        success: true,
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/customers/:id
   * Obtiene un cliente por ID
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await this.customerService.getCustomerById(id);
      return res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/customers/:id
   * Actualiza un cliente
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      const customer = await this.customerService.updateCustomer(id, { name, email, phone });
      return res.status(200).json({
        success: true,
        message: 'Cliente actualizado exitosamente',
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/customers/:id
   * Elimina un cliente
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.customerService.deleteCustomer(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/customers/search?q=...
   * Busca clientes por nombre o email
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async search(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere un parametro de busqueda (q)',
        });
      }
      const customers = await this.customerService.searchCustomers(q);
      return res.status(200).json({
        success: true,
        data: customers,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CustomerController;
