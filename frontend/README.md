# DATAMARK Frontend

SaaS B2B para pequeños negocios de ropa y calzado en Perú.

## Tecnologías

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Estilos**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Enrutamiento**: React Router DOM 7
- **Validación**: Zod

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── config/      # Configuracion de API
│   │   ├── providers/  # Context providers
│   │   └── routes/     # Definiciones de rutas
│   ├── features/       # Modulos de funciones (auth, ventas, productos, etc.)
│   ├── hooks/          # Custom React hooks
│   └── shared/         # Componentes compartidos, utilidades, layouts
└── public/
```

## Configuracion

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para produccion
npm run build

# Previsualizar construccion de produccion
npm run preview
```

## Variables de Entorno

Crear archivo `.env` en la raiz del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

## Funcionalidades

- **Autenticacion**: Inicio de sesion, Registro, Gestion de tokens JWT
- **Panel de Control**: Resumen y analiticas
- **Gestion de Ventas**: Crear y rastrear ventas
- **Productos**: Catalogo de productos con categorias y variantes
- **Inventario**: Control de stock con alertas de stock bajo
- **Clientes**: Gestion de base de datos de clientes

## API Integration

The frontend uses Axios with interceptors for:
- Automatic JWT token inclusion in requests
- 401 error handling (redirects to login)
- Base URL configuration from environment variables
