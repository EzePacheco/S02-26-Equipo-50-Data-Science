import { Router } from 'express';
import { createProduct } from '../controllers/product.controller.js';

const router = Router();

// Definimos que cuando alguien haga un POST a la raíz de esta ruta,
// se ejecute nuestro controlador 'createProduct'
router.post('/', createProduct);

export default router;