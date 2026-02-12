// environment.js
// Capa de infraestructura: Gestión de variables de entorno

const environment = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  
  // TODO: Agregar secreto JWT cuando se implemente auth
  // JWT_SECRET: process.env.JWT_SECRET,
  
  isDevelopment() {
    return this.NODE_ENV === 'development';
  },

  isProduction() {
    return this.NODE_ENV === 'production';
  }
};

export default environment;
