import { createProductSchema } from '../schemas/product.schema.js';
import { createProductService } from '../services/product.service.js';

export const createProduct = async (req, res) => {
  try {
    const validatedData = createProductSchema.parse(req.body);

    const newProduct = await createProductService(validatedData);

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: newProduct
    });

  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }

    console.error('Error al crear producto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};