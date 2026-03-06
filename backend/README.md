# DATAMARK Backend

SaaS B2P para pequenos negocios de ropa y calzado en Peru.

## Tecnologias

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de datos**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Autenticacion**: JWT + bcrypt

## Estructura del Proyecto (Clean Architecture)

```
backend/
├── prisma/           # Esquema y migraciones de base de datos
└── src/
    ├── server.js     # Punto de entrada de la aplicacion
    ├── application/  # Logica de negocio (servicios, DTOs)
    ├── domain/       # Entidades, esquemas, interfaces de repositorios
    ├── infrastructure/  # Persistencia de base de datos (Prisma)
    └── interface/    # Controladores y rutas
```

## Configuracion

```bash
# Instalar dependencias
npm install

# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones de base de datos
npx prisma migrate dev

# Iniciar servidor de desarrollo
npm run dev
```

## Variables de Entorno

Crear archivo `.env` en el directorio raiz:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="tu-clave-secreta"
PORT=3000
```

## Endpoints de API

- **Auth**: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
- **Usuarios**: `/api/users`
- **Tiendas**: `/api/stores`, `/api/stores/my-store`
- **Productos**: `/api/products`
- **Ventas**: `/api/sales`
- **Inventario**: `/api/inventory`, `/api/inventory/low-stock`
- **Clientes**: `/api/customers`

## Scripts

- `npm run dev` - Iniciar servidor de desarrollo
- `npm test` - Ejecutar pruebas
- `npx prisma studio` - Abrir interfaz grafica de Prisma
