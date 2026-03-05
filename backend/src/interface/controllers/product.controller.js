class ProductController {
  /**
   * @param {import('../services/ProductService.js').default} productService
   */
  constructor(productService) {
    this.productService = productService;
  }

  /**
   * POST /api/products
   * Crea un nuevo producto
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
    
      const product = await this.productService.createProduct(req.body);

      return res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: product,
      });
    } catch (error) {

      next(error);
    }
  }

  /**
   * GET /api/products
   * Obtiene todos los productos
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAll(req, res, next) {
    try {
      const { category } = req.query;
      const products = category 
        ? await this.productService.getProductsByCategory(category)
        : await this.productService.getAllProducts();

      return res.status(200).json({ success: true, data: products });
    } catch (error) { next(error); }
  }

  /**
   * GET /api/products/:id
   * Obtiene un producto por ID
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const product = await this.productService.getProductById(req.params.id);
      return res.status(200).json({ success: true, data: product });
    } catch (error) { next(error); }
  }

  /**
   * GET /api/products/category/:category
   * Obtiene productos por categoria
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getByCategory(req, res, next) {
    try {
      const products = await this.productService.getProductsByCategory(req.params.category);
      return res.status(200).json({ success: true, data: products });
    } catch (error) { next(error); }
  }

  /**
   * PUT /api/products/:id
   * Actualiza un producto
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;

      const product = await this.productService.updateProduct(id, req.body);

      return res.status(200).json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/products/:id
   * Elimina un producto
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async delete(req, res, next) {
    try {
      await this.productService.deleteProduct(req.params.id);
      return res.status(204).send();
    } catch (error) { next(error); }
  }
}

export default ProductController;
