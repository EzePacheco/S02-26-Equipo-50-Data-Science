// express.js
// Capa de infraestructura: Configuración de aplicación Express

import express from 'express';
import cors from 'cors';

const configureExpress = () => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // TODO: Agregar configuración de rutas
  // TODO: Agregar middleware de manejo de errores

  return app;
};

export default configureExpress;
