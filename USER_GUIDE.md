# Guía de Usuario - DATAMARK

## Índice

1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Módulos de la Aplicación](#módulos-de-la-aplicación)
4. [Referencia de API](#referencia-de-api)
5. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

DATAMARK es una plataforma integral para la gestión de pequeños comercios de ropa y calzado. Permite gestionar productos, ventas, clientes e inventario desde una interfaz intuitiva.

### Arquitectura del Sistema

DATAMARK está compuesto por:

- **Frontend SPA**: Aplicación React desplegada en Vercel
- **Backend REST API**: Servidor Node/Express desplegado en Railway
- **Base de datos**: PostgreSQL alojada en Neon (serverless)

Esta arquitectura permite escalabilidad independiente de cada componente y costos optimizados según el uso.

### Características Principales

- Gestión de productos con código SKU
- Registro de ventas con control de inventario automático
- Gestión de clientes
- Dashboard con métricas y tendencias
- Control de stock con alertas de nivel mínimo

---

## Primeros Pasos

### 1. Registro de Cuenta

1. Accede a la aplicación en [datamark.vercel.app](https://s02-26-equipo-50-data-science.vercel.app)
2. Haz clic en "Registrarse" o "Crear cuenta"
3. Completa el formulario:
   - Nombre completo
   - Correo electrónico
   - Contraseña (mínimo 6 caracteres)
4. Haz clic en "Registrarse"

### 2. Onboarding (Configuración de Tienda)

Después del registro, se inició el proceso de configuración:

**Paso 1: Nombre de la tienda**
- Ingresa el nombre de tu negocio
- Ejemplo: "Boutique María" o "Zapatería El Rey"

**Paso 2: Categorías**
- Selecciona las categorías de productos que vendes
- Opciones: Ropa de Mujer, Ropa de Hombre, Ropa de Niños, Calzado de mujer, Calzado de hombre, Accesorios, Ropa Deportiva, Ropa Interior, Otros

### 3. Inicio de Sesión

1. Haz clic en "Iniciar sesión"
2. Ingresa tu correo electrónico y contraseña
3. Selecciona "Recordarme" para mantener la sesión activa

---

## Módulos de la Aplicación

### Productos

Permite gestionar el catálogo de productos.

**Estado actual:** Implementado

#### Acceso desde la interfaz

1. Navega a **Productos** en el menú lateral
2. Puedes:
   - Ver todos los productos en lista o tabla
   - Buscar por nombre o SKU
   - Filtrar por categoría (ROPA/CALZADO)
   - Agregar nuevo producto
   - Editar producto existente
   - Eliminar producto

#### Crear Producto

Desde la interfaz, haz clic en **"Agregar producto"** y completa:
- Nombre del producto
- Variantes con SKU, talla, color, precio y stock
- Categoría: ROPA o CALZADO
- Activo/Inactivo

### Ventas

Registro de transacciones comerciales.

**Estado actual:** Implementado

#### Acceso desde la interfaz

1. Navega a **Ventas** en el menú lateral
2. Verás el total de ventas del día
3. Haz clic en el botón **"+"** para registrar una nueva venta

#### Registrar una venta

1. Selecciona los productos del inventario
2. Ingresa la cantidad de cada uno
3. El precio se carga automáticamente (puede modificarse)
4. Selecciona el cliente (opcional)
5. Confirma el total y registra

**Nota:** El sistema descuenta automáticamente el stock del inventario.

### Clientes

Gestión de la base de clientes.

**Estado actual:** Implementado

#### Acceso desde la interfaz

1. Navega a **Clientes** en el menú lateral
2. Puedes:
   - Ver todos los clientes en lista o tabla
   - Buscar por nombre, email o teléfono
   - Agregar nuevo cliente
   - Editar cliente existente
   - Eliminar cliente

#### Agregar Cliente

Desde la interfaz, haz clic en **"Agregar cliente"** y completa:
- Nombre del cliente
- Email (opcional)
- Teléfono (opcional)

### Inventario

Control de stock y alertas.

**Estado actual:** Implementado

#### Acceso desde la interfaz

1. Navega a **Inventario** en el menú lateral
2. Verás:
   - Lista de productos con su stock actual
   - Alerta de productos con stock crítico (menos de 3 unidades)
   - Puedes buscar y filtrar por categoría

#### Gestionar stock

- Para agregar inventario, edita el producto y configura el stock inicial
- El stock se descuenta automáticamente al registrar una venta
- Si un producto llega a menos de 3 unidades, aparecerá una alerta

### Dashboard

Panel de métricas y análisis.

**Estado actual:** Implementado

#### Características

- Resumen de ventas del día
- Total vendido en el día y en el mes
- Comparación con el mes anterior
- Ganancia estimada
- Alertas de stock bajo
- Acceso rápido a las demás secciones

---

## Referencia de API

**Nota:** Todas las rutas (excepto `/api/auth/register` y `/api/auth/login`) requieren el header de autenticación:

```bash
Authorization: Bearer <token>
```

### Autenticación

#### Registro de Usuario

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Nombre Completo",
  "email": "correo@ejemplo.com",
  "password": "contraseña123"
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

#### Inicio de Sesión

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "correo@ejemplo.com",
  "password": "contraseña123"
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

### ¿Cómo recupero mi contraseña?

Actualmente, la recuperación de contraseña debe realizarse contactando al administrador del sistema.

### ¿Qué pasa si el stock llega a cero?

El sistema permite registrar ventas siempre que haya stock disponible. Si intentas vender más de lo que hay en inventario, el sistema te mostrará un mensaje de error indicando la cantidad disponible.

### ¿Puedo tener varias tiendas?

No, actualmente el sistema permite una tienda por usuario.

### ¿Cómo funcionan las alertas de stock bajo?

Cuando un producto tiene menos de 3 unidades en stock, aparecerá una alerta en la sección de productos indicando que hay stock crítico.

### ¿Puedo exportar mis datos?

Actualmente no está disponible la exportación de datos. Esta funcionalidad está en desarrollo.

### ¿El sistema hace backup de mis datos?

Sí, la base de datos en Neon realiza backups automáticos.

---

## Soporte

Para soporte técnico o consultas:
- Correo: soporte@datamark.com
- GitHub: https://github.com/EzePacheco/S02-26-Equipo-50-Data-Science

---

*Última actualización: Marzo 2026*
