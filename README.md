# DATAMARK

Plataforma B2B SaaS para automatización y visualización de datos comerciales orientada a pequeños negocios de ropa y calzado en Perú.

## Descripción

DATAMARK es una solución integral para pequeños comercios del sector textil y calzado en provincias del Perú. La plataforma centraliza y automatiza la gestión de ventas, inventarios y clientes, transformando datos dispersos en información accionable mediante dashboards intuitivos.

## Stack Tecnológico

**Frontend**
- React 19
- Tailwind CSS 4
- Vite
- Axios
- React Router DOM

**Backend**
- Node.js (ES Modules)
- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- JWT + bcryptjs

## Estructura del Proyecto

```
/                    # Raíz del monorepo
├── backend/         # API REST
│   ├── src/
│   │   ├── domain/           # Entidades, repositorios, errores
│   │   ├── application/      # Servicios, DTOs
│   │   ├── infrastructure/  # Implementaciones (Prisma)
│   │   └── interface/       # Controladores y rutas
│   └── prisma/               # Schema de base de datos
├── frontend/        # Aplicación React
│   └── src/
│       ├── app/             # Configuración global
│       ├── features/        # Módulos (auth, sales, products, etc.)
│       └── shared/          # Componentes y utilitarios
└── README.md
```

## Requisitos Previos

- Node.js 18+
- npm

## Instalación

### Backend

```bash
cd backend
npm install
```

Crear `.env` basado en `.env.example`:

```env
PORT=3000
DATABASE_URL="postgresql://..."
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
JWT_SECRET=your-secret-key
```

```bash
npm run prisma:generate
npm run prisma:db push
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Crear `.env`:

```env
VITE_API_URL_DEV=http://localhost:3000/api
VITE_API_URL_PROD=https://your-railway-app.up.railway.app/api
```

```bash
npm run dev
```

## API Endpoints

**Nota:** Todas las rutas (excepto `/api/auth/register` y `/api/auth/login`) requieren el header `Authorization: Bearer <token>`.

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |
| GET | /api/auth/me | Obtener usuario actual |
| GET | /api/health | Health check |
| CRUD | /api/products | Gestión de productos |
| CRUD | /api/sales | Gestión de ventas |
| CRUD | /api/customers | Gestión de clientes |
| CRUD | /api/inventory | Gestión de inventario |
| CRUD | /api/stores | Gestión de tiendas |

## Deployment

```
┌──────────────┐      ┌──────────────┐
│ Vercel       │─────▶│ Railway      │
│ (Frontend)   │      │ (Backend)    │
└──────────────┘      └──────┬───────┘
                             │
                             ▼
                    ┌──────────────┐
                    │ Neon         │
                    │ (PostgreSQL) │
                    └──────────────┘
```

### Railway
- Conectar repositorio GitHub
- Configurar variables: DATABASE_URL, JWT_SECRET, ALLOWED_ORIGINS

### Vercel
- Root Directory: frontend
- Build Command: npm run build
- Output Directory: dist
- Variables: VITE_API_URL_PROD

## Scripts

**Backend**
- `npm run dev` - Desarrollo
- `npm start` - Produccion
- `npm test` - Tests

**Frontend**
- `npm run dev` - Desarrollo
- `npm run build` - Build produccion
- `npm run lint` - Linting

## Guia de Usuario

Consulta la [guia completa](./USER_GUIDE.md) para instrucciones detalladas sobre el uso de la aplicacion.

## Equipo

- Ezequiel Pacheco - Fullstack Developer & Scrum Master
- Estrella Cruz Ulloa - Data & Frontend Developer
- Nelson Alexander Borbor Diaz - Data & Fullstack Developer
- Jose Ardilez Ugaz - Data Scientist & Frontend Developer
- Daniel Lara - Data Scientist & Backend Developer

## Licencia

Proyecto de código cerrado desarrollado para DATAMARK.
