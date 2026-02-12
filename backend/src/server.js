import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

// Cargamos las variables de entorno
dotenv.config();

// TODO: Importar configuración de Express desde infraestructura
// import configureExpress from './infrastructure/web/express.js';

// TODO: Importar repositorios
// import PrismaUserRepository from './infrastructure/persistence/repositories/PrismaUserRepository.js';
// import PrismaCustomerRepository from './infrastructure/persistence/repositories/PrismaCustomerRepository.js';
// etc...

// TODO: Importar servicios
// import UserService from './application/services/UserService.js';
// import CustomerService from './application/services/CustomerService.js';
// etc...

// TODO: Importar controladores
// import UserController from './interface/controllers/user.controller.js';
// etc...

// TODO: Importar rutas
// import routes from './interface/routes/index.js';

// TODO: Importar middleware de errores
// import errorHandler from './infrastructure/web/middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// CONFIGURACIÓN TEMPORAL - MANTENER HASTA IMPLEMENTAR CLEAN ARCH
// ============================================================

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Backend funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// TODO: Configurar rutas cuando estén implementadas
// app.use('/api', routes);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada.'});
});

// TODO: Agregar middleware de manejo de errores
// app.use(errorHandler);

// ============================================================
// INYECCIÓN DE DEPENDENCIAS (TODO: Implementar cuando estén listos)
// ============================================================
/*
// Repositorios
const userRepository = new PrismaUserRepository();
const customerRepository = new PrismaCustomerRepository();
const productRepository = new PrismaProductRepository();
const saleRepository = new PrismaSaleRepository();
const inventoryRepository = new PrismaInventoryRepository();

// Servicios
const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepository);
const productService = new ProductService(productRepository, inventoryRepository);
const inventoryService = new InventoryService(inventoryRepository, productRepository);
const saleService = new SaleService(
  saleRepository,
  productRepository,
  inventoryRepository,
  customerRepository
);

// Controladores
const userController = new UserController(userService);
const customerController = new CustomerController(customerService);
const productController = new ProductController(productService);
const saleController = new SaleController(saleService);
const inventoryController = new InventoryController(inventoryService);
*/

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;