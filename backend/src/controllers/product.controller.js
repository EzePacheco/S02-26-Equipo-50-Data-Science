import { createProductSchema } from '../schemas/product.schema.js';
import { createProductService, 
         getAllProductsService, 
         getProductByIdService,
         deleteProductService} from '../services/product.service.js';


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

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    
    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductService(id);

    
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado o ya fue eliminado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Producto y sus variantes eliminados correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};