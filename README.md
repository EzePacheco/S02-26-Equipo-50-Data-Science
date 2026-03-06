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

## Decisiones Técnicas

### Neon (PostgreSQL Serverless)
Permite branching de base de datos para desarrollo sin afectar producción. Escalabilidad automática sin provisioning de servidores.

### Railway
Simplifica el despliegue de APIs Node.js con gestión automática de variables de entorno, SSL y escalabilidad.

### Vercel
Optimizado para frontend React con CI/CD automático, edge functions y optimización de rendimiento.

### Prisma ORM
Type-safety completo, migraciones simples y abstracción de consultas que evita SQL injection.

### JWT vs Session-based Auth
Stateless, ideal para arquitecturas SPA. Sin almacenamiento server-side y compatible con múltiples clientes.

### Clean Architecture
Separación estricta de dominio y framework. Facilita testing, cambios de tecnología y escalabilidad futura.

## Seguridad

- Hashing de contraseñas con bcrypt
- Autenticación vía JWT en todas las rutas protegidas
- Validación de input con Zod
- CORS configurado vía ALLOWED_ORIGINS
- Secrets almacenados en variables de entorno

## Roadmap

- OAuth con Facebook Login
- Exportación de datos a CSV
- Sistema de recuperación de contraseña
- Soporte multi-tienda por usuario

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

- [Ezequiel Pacheco](https://github.com/EzePacheco) | [LinkedIn](https://www.linkedin.com/in/ezepacheco-dev/) - Fullstack Lead
- [Estrella Cruz Ulloa](https://github.com/estrellacruzulloa) | [LinkedIn](https://www.linkedin.com/in/estrella-cruz-ulloa-102708275/) - Data & Frontend Developer
- [Nelson Alexander Borbor Diaz](https://github.com/NelsonBorbor98) - Data & Fullstack Developer
- [Jose Ardilez Ugaz](https://github.com/JoseloArdiles) | [LinkedIn](https://www.linkedin.com/in/joselo-ardiles-ugaz/) - Data Scientist & Frontend Developer
- [Daniel Lara](https://github.com/Sts87) | [LinkedIn](https://www.linkedin.com/in/daniel-lara-mendoza/) - Data Scientist & Backend Developer

## Licencia

Proyecto de código cerrado desarrollado para DATAMARK.
