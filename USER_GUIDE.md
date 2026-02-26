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

#### Crear Producto

1. Navega a la seccion "Productos"
2. Haz clic en "Agregar producto" o boton "+"
3. Completa los datos:
   - Nombre del producto
   - SKU (codigo unico de identificacion)
   - Precio de venta
   - Categoria (ROPA o CALZADO)
   - Stock inicial
   - Stock minimo (opcional, para alertas)
4. Haz clic en "Guardar"

#### Editar Producto

1. Busca el producto en la lista
2. Haz clic en el producto o en el icono de editar
3. Modifica los campos necesarios
4. Guarda los cambios

#### Eliminar Producto

1. Busca el producto
2. Haz clic en eliminar
3. Confirma la accion

### Ventas

Registro de transacciones comerciales.

#### Nueva Venta

1. Navega a "Ventas"
2. Haz clic en "Nueva venta" o "Registrar venta"
3. Selecciona los productos y cantidades
4. Opcional: Agrega un cliente
5. El sistema descontara automaticamente del inventario
6. Confirma la venta

#### Ver Historico

1. Accede a "Ventas" para ver el historial
2. Filtra por fecha o cliente
3. Haz clic en una venta para ver el detalle

### Clientes

Gestion de la base de clientes.

#### Agregar Cliente

1. Navega a "Clientes"
2. Haz clic en "Agregar cliente"
3. Ingresa:
   - Nombre completo
   - Correo electronico (opcional)
   - Telefono (opcional)

#### Buscar Cliente

Utiliza la barra de busqueda para encontrar clientes por nombre o correo.

### Inventario

Control de stock y alertas.

#### Ver Stock

1. Navega a "Inventario"
2. Observa la lista de productos con sus cantidades
3. Los productos con stock bajo se marcan con alerta

#### Ajustar Stock

1. Busca el producto
2. Modifica la cantidad directamente o usa "Ajustar"
3. Ingresa la nueva cantidad o el ajuste (positivo/negativo)

#### Configurar Alertas

1. En el producto, establece un "Stock minimo"
2. Cuando el stock caiga por debajo, aparecera una alerta

### Dashboard

Panel de metricas y analisis.

- Ventas del dia/semana/mes
- Productos mas vendidos
- Clientes frecuentes
- Tendencias de demanda

---

## Referencia de API

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

### Productos

#### Listar Productos

```bash
GET /api/products
```

#### Obtener Producto por ID

```bash
GET /api/products/:id
```

#### Crear Producto

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

#### Actualizar Producto

```bash
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Camisa Manga Corta",
  "price": 39.99
}
```

#### Eliminar Producto

```bash
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Ventas

#### Crear Venta

```bash
POST /api/sales
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "uuid-usuario",
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

#### Listar Ventas

```bash
GET /api/sales
Authorization: Bearer <token>
```

#### Ventas por Fecha

```bash
GET /api/sales/date-range?startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer <token>
```

### Inventario

#### Obtener Todo el Inventario

```bash
GET /api/inventory
Authorization: Bearer <token>
```

#### Obtener Stock Bajo

```bash
GET /api/inventory/low-stock
Authorization: Bearer <token>
```

#### Actualizar Stock

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

### Clientes

#### Listar Clientes

```bash
GET /api/customers
Authorization: Bearer <token>
```

#### Crear Cliente

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

#### Actualizar Cliente

```bash
PUT /api/customers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "phone": "+51 888 888 888"
}
```

#### Eliminar Cliente

```bash
DELETE /api/customers/:id
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
