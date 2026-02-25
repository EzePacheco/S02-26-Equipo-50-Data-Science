import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, deleteProduct} from '../controllers/product.controller.js';

const router = Router();

// Definimos que cuando alguien haga un POST a la raíz de esta ruta,
// se ejecute nuestro controlador 'createProduct'
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

export default router;