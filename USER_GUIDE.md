# Guia de Usuario - DATAMARK

## Indice

1. [Introduccion](#introduccion)
2. [Primeros Pasos](#primeros-pasos)
3. [Modulos de la Aplicacion](#modulos-de-la-aplicacion)
4. [Referencia de API](#referencia-de-api)
5. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introduccion

DATAMARK es una plataforma integral para la gestion de pequenos comercios de ropa y calzado. Permite gestionar productos, ventas, clientes e inventario desde una interfaz intuitiva.

### Caracteristicas Principales

- Gestion de productos con codigo SKU
- Registro de ventas con control de inventario automatico
- Gestion de clientes
- Dashboard con metricas y tendencias
- Control de stock con alertas de nivel minimo

---

## Primeros Pasos

### 1. Registro de Cuenta

1. Accede a la aplicacion en [datamark.vercel.app](https://s02-26-equipo-50-data-science.vercel.app)
2. Haz clic en "Registrarse" o "Crear cuenta"
3. Completa el formulario:
   - Nombre completo
   - Correo electronico
   - Contrasena (minimo 6 caracteres)
4. Haz clic en "Registrarse"

### 2. Onboarding (Configuracion de Tienda)

Despues del registro, se iniciara el proceso de configuracion:

**Paso 1: Nombre de la tienda**
- Ingresa el nombre de tu negocio
- Ejemplo: "Boutique Maria" o "Zapateria El Rey"

**Paso 2: Categorias**
- Selecciona las categorias de productos que vendes
- Opciones: Ropa de Mujer, Ropa de Hombre, Ropa de Ninos, Calzado de mujer, Calzado de hombre, Accesorios, Ropa Deportiva, Ropa Interior, Otros

### 3. Inicio de Sesion

1. Haz clic en "Iniciar sesion"
2. Ingresa tu correo electronico y contrasena
3. Selecciona "Recordarme" para mantener la sesion activa

---

## Modulos de la Aplicacion

### Productos

Permite gestionar el catalogo de productos.

**Estado: Pendiente de implementación de interfaz**

La gestión de productos se realizará a través de la interfaz de usuario cuando esté disponible.

#### Crear Producto (API)

```bash
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Camisa Manga Larga",
  "sku": "CML-001",
  "price": 49.99,
  "category": "ROPA",
  "initialStock": 100,
  "minStock": 10
}
```

#### Editar Producto (API)

```bash
PUT /api/products/:id
Authorization: Bearer <token>
```

#### Eliminar Producto (API)

```bash
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Ventas

Registro de transacciones comerciales.

**Estado: Pendiente de implementación de interfaz**

#### Nueva Venta (API)

```bash
POST /api/sales
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerId": "uuid-cliente (opcional)",
  "items": [
    {
      "productId": "uuid-producto",
      "productName": "Camisa",
      "quantity": 2,
      "unitPrice": 49.99
    }
  ]
}
```

**Nota:** El `userId` se obtiene automáticamente del token JWT.

#### Listar Ventas (API)

```bash
GET /api/sales
Authorization: Bearer <token>
```

#### Ventas por Fecha (API)

```bash
GET /api/sales/date-range?startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer <token>
```

### Clientes

Gestion de la base de clientes.

**Estado: Pendiente de implementación de interfaz**

#### Agregar Cliente (API)

```bash
POST /api/customers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Juan Perez",
  "email": "juan@correo.com",
  "phone": "+51 999 999 999"
}
```

#### Buscar Cliente (API)

```bash
GET /api/customers/search?q=juan
Authorization: Bearer <token>
```

#### Actualizar Cliente (API)

```bash
PUT /api/customers/:id
Authorization: Bearer <token>
```

#### Eliminar Cliente (API)

```bash
DELETE /api/customers/:id
Authorization: Bearer <token>
```

### Inventario

Control de stock y alertas.

**Estado: Pendiente de implementación de interfaz**

#### Obtener Stock (API)

```bash
GET /api/inventory
Authorization: Bearer <token>
```

#### Obtener Stock Bajo (API)

```bash
GET /api/inventory/low-stock
Authorization: Bearer <token>
```

#### Actualizar Stock (API)

```bash
PUT /api/inventory/product/:productId/stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 50
}
```

O para ajustar (aumentar/disminuir):

```json
{
  "adjustment": -5
}
```

#### Configurar Stock Minimo (API)

```bash
PATCH /api/inventory/product/:productId/min-stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "minStock": 10
}
```

### Dashboard

Panel de metricas y analisis.

- Ventas del dia/semana/mes
- Productos mas vendidos
- Clientes frecuentes
- Tendencias de demanda

---

## Referencia de API

**Nota Importante:** Todas las rutas (excepto `/api/auth/register` y `/api/auth/login`) requieren el header de autenticación:

```bash
Authorization: Bearer <token>
```

### Autenticacion

#### Registro de Usuario

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Nombre Completo",
  "email": "correo@ejemplo.com",
  "password": "contrasena123"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": "uuid",
      "name": "Nombre Completo",
      "email": "correo@ejemplo.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Inicio de Sesion

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "correo@ejemplo.com",
  "password": "contrasena123"
}
```

#### Obtener Usuario Actual

```bash
GET /api/auth/me
Authorization: Bearer <token>
```

### Tiendas

#### Crear Tienda (Onboarding)

```bash
POST /api/stores
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mi Tienda",
  "categories": ["Ropa de Mujer", "Calzado de mujer"]
}
```

#### Obtener Mi Tienda

```bash
GET /api/stores/my-store
Authorization: Bearer <token>
```

---

## Preguntas Frecuentes

### ¿Como recupero mi contrasena?

Actualmente, la recuperacion de contrasena debe realizarse contactando al administrador del sistema.

### ¿Que pasa si el stock llega a cero?

El sistema permitira registrar ventas incluso con stock cero. Sin embargo, se recomienda mantener productos con stock disponible.

### ¿Puedo tener varias tiendas?

No, actualmente el sistema permite una tienda por usuario.

### ¿Como funcionan las alertas de stock bajo?

Cuando configuras un "stock minimo" en un producto, el sistema te notificara cuando la cantidad disponible sea igual o inferior a ese valor.

### ¿Puedo exportar mis datos?

Actualmente no esta disponible la exportacion de datos. Esta funcionalidad esta en desarrollo.

### ¿El sistema hace backup de mis datos?

Si, la base de datos en Neon realiza backups automaticos.

---

## Soporte

Para soporte tecnico o consultas:
- Correo: soporte@datamark.com
- GitHub: https://github.com/EzePacheco/S02-26-Equipo-50-Data-Science

---

*Ultima actualizacion: Febrero 2026*
