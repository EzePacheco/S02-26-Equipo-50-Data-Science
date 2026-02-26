import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { configureRoutes } from './interface/routes/index.js';
import PrismaStoreRepository from './infrastructure/persistence/repositories/PrismaStoreRepository.js';
import PrismaSaleRepository from './infrastructure/persistence/repositories/PrismaSaleRepository.js';
import PrismaProductRepository from './infrastructure/persistence/repositories/PrismaProductRepository.js';
import PrismaInventoryRepository from './infrastructure/persistence/repositories/PrismaInventoryRepository.js';
import PrismaUserRepository from './infrastructure/persistence/repositories/PrismaUserRepository.js';
import PrismaCustomerRepository from './infrastructure/persistence/repositories/PrismaCustomerRepository.js';
import StoreService from './application/services/StoreService.js';
import SaleService from './application/services/SaleService.js';
import InventoryService from './application/services/InventoryService.js';
import ProductService from './application/services/ProductService.js';
import CustomerService from './application/services/CustomerService.js';
import UserService from './application/services/UserService.js';
import AuthService from './application/services/AuthService.js';
import StoreController from './interface/controllers/store.controller.js';
import SaleController from './interface/controllers/sale.controller.js';
import InventoryController from './interface/controllers/inventory.controller.js';
import ProductController from './interface/controllers/product.controller.js';
import CustomerController from './interface/controllers/customer.controller.js';
import UserController from './interface/controllers/user.controller.js';
import AuthController from './interface/controllers/auth.controller.js';
import errorHandler from './infrastructure/web/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

const storeRepository = new PrismaStoreRepository();
const saleRepository = new PrismaSaleRepository();
const productRepository = new PrismaProductRepository();
const inventoryRepository = new PrismaInventoryRepository();
const userRepository = new PrismaUserRepository();
const customerRepository = new PrismaCustomerRepository();

const storeService = new StoreService(storeRepository);
const customerService = new CustomerService(customerRepository);
const saleService = new SaleService(saleRepository, productRepository, inventoryRepository, customerService);
const inventoryService = new InventoryService(inventoryRepository, productRepository);
const productService = new ProductService(productRepository, inventoryRepository);
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);

const storeController = new StoreController(storeService);
const saleController = new SaleController(saleService);
const inventoryController = new InventoryController(inventoryService);
const productController = new ProductController(productService);
const customerController = new CustomerController(customerService);
const userController = new UserController(userService);
const authController = new AuthController(authService);

const controllers = {
  storeController,
  saleController,
  inventoryController,
  productController,
  customerController,
  userController,
  authController,
};

const routes = configureRoutes(controllers);
app.use('/api', routes);

app.use(/(.*)/, (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
