// index.js
// Capa de interfaz: Configuración principal del router

import { Router } from 'express';
import userRoutes from './user.routes.js';
import customerRoutes from './customer.routes.js';
import productRoutes from './product.routes.js';
import saleRoutes from './sale.routes.js';
import inventoryRoutes from './inventory.routes.js';

const router = Router();

// TODO: Montar rutas
// router.use('/users', userRoutes);
// router.use('/customers', customerRoutes);
// router.use('/products', productRoutes);
// router.use('/sales', saleRoutes);
// router.use('/inventory', inventoryRoutes);

export default router;
