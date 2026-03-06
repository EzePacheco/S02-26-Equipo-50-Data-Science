# DATAMARK Backend

SaaS B2B para pequeños negocios de ropa y calzado en Perú.

## Tecnologías

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Autenticación**: JWT + bcrypt

## Estructura del Proyecto (Clean Architecture)

```
backend/
├── prisma/           # Esquema y migraciones de base de datos
└── src/
    ├── server.js     # Punto de entrada de la aplicación
    ├── application/  # Logica de negocio (servicios, DTOs)
    ├── domain/       # Entidades, esquemas, interfaces de repositorios
    ├── infrastructure/  # Persistencia de base de datos (Prisma)
    └── interface/    # Controladores y rutas
```

## Configuración

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

Crear archivo `.env` en el directorio raíz:

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

- `npm run dev` - Iniciar servidor de desarrollo- `npm run build` - Generar cliente Prisma para producción
- `npm start` - Ejecutar servidor en producción- `npm test` - Ejecutar pruebas
- `npx prisma studio` - Abrir interfaz gráfica de Prisma
