# Guía de Configuración del Proyecto DATAMARK

## Requisitos del Sistema

- **Node.js**: v18 o superior
- **npm**: v9 o superior
- **PostgreSQL**: 14 o superior (Neon serverless o local)
- **Git**: para clonar el repositorio

## Instalación Rápida

### 1. Backend - Configuración

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores:
# - DATABASE_URL: URL de tu base de datos PostgreSQL
# - JWT_SECRET: Una clave segura para tokens JWT
# - ALLOWED_ORIGINS: URLs permitidas (incluye frontend)

# Generar cliente Prisma y sincronizar BD
npm run prisma:generate
npm run prisma:db push

# Iniciar servidor (desarrollo)
npm run dev
```

**Configuración .env recomendada para desarrollo:**
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=tu-secreto-muy-seguro-cambiar-en-produccion
DATABASE_URL=postgresql://usuario:password@localhost:5432/datamarkdb
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 2. Frontend - Configuración

```bash
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env (si no existe)
cat > .env << EOF
VITE_API_URL_DEV=http://localhost:3000/api
VITE_API_URL_PROD=https://resplendent-reverence-production.up.railway.app/api
EOF

# Iniciar servidor (desarrollo)
npm run dev
```

### 3. Acceder la Aplicación

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## Flujo de Autenticación

### 1. Registro de Usuario

**Endpoint:** `POST /api/auth/register`

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": "uuid-123",
      "name": "Juan Pérez",
      "email": "juan@ejemplo.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Iniciar Sesión

**Endpoint:** `POST /api/auth/login`

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

Token se almacena automáticamente en `localStorage` del navegador.

### 3. Acceder Rutas Protegidas

El token se envía automáticamente en todas las peticiones realizadas desde el frontend. En peticiones manuales:

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Protección de Rutas Frontend

### Rutas Públicas (sin autenticación)
- `/` - Landing page
- `/login` - Iniciar sesión
- `/registro` - Registro de usuario
- `/onboarding` - Configuración inicial

### Rutas Protegidas (requieren autenticación)
- `/dashboard` - Panel principal
- `/ventas` - Gestión de ventas
- `/productos` - Gestión de productos
- `/clientes` - Gestión de clientes
- `/inventario` - Control de inventario

**Comportamiento:**
- Si intentas acceder a una ruta protegida sin autenticación, serás redirigido a `/login`
- El componente `ProtectedRoute` verifica la autenticación automáticamente

## Estructura de Base de Datos

### Tablas principales

**users**
- id: UUID
- name: String
- email: String (único)
- password: String (hasheado)
- createdAt: DateTime
- updatedAt: DateTime

**stores**
- id: UUID
- userId: UUID (FK)
- name: String
- categories: JSON
- createdAt: DateTime
- updatedAt: DateTime

**products**
- id: UUID
- storeId: UUID (FK)
- name: String
- sku: String (único)
- price: Decimal
- category: ROPA | CALZADO
- isActive: Boolean
- createdAt: DateTime
- updatedAt: DateTime

**sales**
- id: UUID
- storeId: UUID (FK)
- customerId: UUID (FK, opcional)
- totalAmount: Decimal
- createdAt: DateTime
- updatedAt: DateTime

**sales_items**
- id: UUID
- saleId: UUID (FK)
- productId: UUID (FK)
- quantity: Int
- unitPrice: Decimal
- subtotal: Decimal

**customers**
- id: UUID
- storeId: UUID (FK)
- name: String
- email: String (opcional)
- phone: String (opcional)
- createdAt: DateTime
- updatedAt: DateTime

**inventory**
- id: UUID
- productId: UUID (FK)
- storeId: UUID (FK)
- quantity: Int
- minStock: Int
- lastRestocked: DateTime
- updatedAt: DateTime

## Testing

### Backend - Tests Unitarios

```bash
cd backend

# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Cobertura de tests
npm run test:coverage
```

### Frontend - Tests

```bash
cd frontend

# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch
```

## Troubleshooting

### Error: "JWT_SECRET no está definida"
**Solución:** Asegúrate de agregar `JWT_SECRET` a tu archivo `.env`

```env
JWT_SECRET=tu-secreto-muy-seguro-aqui
```

### Error: "Error de conexión a base de datos"
**Solución:** Verifica que tu `DATABASE_URL` es correcta y la BD está accesible

```bash
# Test de conexión a Neon
npm run prisma:db push
```

### Error: "Token no proporcionado"
**Solución 1:** Asegúrate de estar enviando el token en el header `Authorization`

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <tu-token>"
```

**Solución 2:** Verifica que el token no ha expirado. Si es así, vuelve a iniciar sesión.

### Error: "Usuario no encontrado"
**Causa:** Token válido pero usuario no existe en BD
**Solución:** 
1. Asegúrate de completar el register primero
2. Verifica que la BD tiene contenido (migrations aplicadas)

### Error: "CORS bloqueó la solicitud"
**Solución:** Actualiza `ALLOWED_ORIGINS` en `.env`

```env
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,https://tu-dominio.com
```

## Desarrollo

### Código limpio
- Sigue Clean Architecture en backend
- Componentes reutilizables en frontend
- Separación de responsabilidades

### Convenciones
- **Backend**: camelCase para variables, PascalCase para clases/servicios
- **Frontend**: PascalCase para componentes, camelCase para hooks/utilidades
- **Commits**: feat/, fix/, docs/, style/ (conventional commits)

### Git Workflow

```bash
# Crear rama de feature
git checkout -b feat/nueva-funcionalidad

# Hacer cambios y commits
git add .
git commit -m "feat: descripción clara del cambio"

# Push a rama
git push origin feat/nueva-funcionalidad

# Crear PR en GitHub
```

## Deployment

### Railway (Backend)

1. Conectar repositorio GitHub
2. Seleccionar rama `main`
3. Agregar variables de entorno:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ALLOWED_ORIGINS`
   - `NODE_ENV=production`

### Vercel (Frontend)

1. Conectar repositorio GitHub
2. Selector **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. Variables de entorno:
   - `VITE_API_URL_PROD=https://tu-api-railway.up.railway.app/api`

## Recursos

- [Documentación de Usuario](./USER_GUIDE.md)
- [Documentación de API](./README.md#api-endpoints)
- [Prisma Docs](https://www.prisma.io/docs/)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com/)

## Soporte

Para reportar problemas o sugerencias:
1. Abre un issue en GitHub
2. Proporciona: pasos para reproducir, error exacto, sistema operativo
3. Contacta al equipo de desarrollo

---

**Última actualización:** Marzo 6, 2026
