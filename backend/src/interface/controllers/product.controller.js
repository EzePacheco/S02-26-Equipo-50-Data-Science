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
      const { name, sku, price, category, initialStock, minStock } = req.body;

      if (!name || !sku) {
        return res.status(400).json({
          success: false,
          error: 'Nombre y SKU son requeridos',
        });
      }

      const product = await this.productService.createProduct({
        name,
        sku,
        price: parseFloat(price),
        category,
        initialStock: initialStock ? parseInt(initialStock) : 0,
        minStock: minStock ? parseInt(minStock) : null,
      });

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
      
      let products;
      if (category) {
        products = await this.productService.getProductsByCategory(category);
      } else {
        products = await this.productService.getAllProducts();
      }

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
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
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
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
      const { category } = req.params;
      const products = await this.productService.getProductsByCategory(category);
      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
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
      const { name, sku, price, category, active } = req.body;
      
      const updateData = {};
      if (name) updateData.name = name;
      if (sku) updateData.sku = sku;
      if (price) updateData.price = parseFloat(price);
      if (category) updateData.category = category;
      if (active !== undefined) updateData.active = active;

      const product = await this.productService.updateProduct(id, updateData);
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
      const { id } = req.params;
      await this.productService.deleteProduct(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
