import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargamos las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares => Estos procesan las peticiones antes de llegar a las rutas.
app.use(cors()); // Permite peticiones desde otros origenes (frontend)
app.use(express.json()); // Permite que Express entienda JSON en el body de las peticiones
app.use(express.urlencoded({extended: true})); // Permite datos de formularios

// Ruta de prueba para verificar que el servidor funciona.
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Backend fucionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada.'});
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;