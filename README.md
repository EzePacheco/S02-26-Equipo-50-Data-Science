# DATAMARK

Plataforma B2B SaaS para automatización y visualización de datos comerciales orientada a pequeños negocios de ropa y calzado en Perú.

## Descripción del Proyecto

DATAMARK es una startup en etapa MVP que desarrolla una solución integral para pequeños comercios del sector textil y calzado en provincias del Perú. La plataforma centraliza y automatiza la gestión de ventas, inventarios y clientes, transformando datos dispersos en información accionable mediante dashboards intuitivos que no requieren conocimientos técnicos.

## Problema

Los pequeños negocios de ropa y calzado enfrentan desafíos críticos en la gestión de su información comercial. La administración manual y desorganizada de datos genera errores operativos, pérdidas económicas y decisiones empresariales basadas en información incompleta o inexacta. DATAMARK aborda esta problemática ofreciendo una plataforma que estructura y visualiza la información de manera clara y accesible.

## Funcionalidades Principales

La plataforma incluye módulos especializados para cubrir las necesidades operativas del negocio. El sistema de gestión de inventario permite controlar el stock de productos en tiempo real, registrando entradas, salidas y niveles críticos de reposición. El módulo de clientes centraliza la información de contacto y el historial de compras, facilitando el seguimiento de relaciones comerciales. El registro de ventas captura transacciones completas con detalles de productos, cantidades y montos. Los dashboards analíticos presentan métricas clave como volumen de ventas por período, productos más vendidos, rotación de inventario y tendencias de demanda, todo visualizado mediante gráficos comprensibles.

## Stack Tecnológico

El proyecto está estructurado como monorepo con frontend y backend independientes pero integrados.

**Frontend**
- React 18 para la construcción de interfaces de usuario
- Tailwind CSS para el diseño y estilización
- Vite como herramienta de desarrollo y bundling
- Axios para comunicación HTTP con el backend
- React Router DOM para navegación entre vistas

**Backend**
- Node.js con ES Modules para arquitectura moderna
- Express.js como framework web
- PostgreSQL como base de datos relacional
- Prisma ORM para modelado de datos y migraciones
- CORS para manejo de peticiones cross-origin

## Estructura del Proyecto

```
/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── middlewares/
│   │   │   └── server.js
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── .env.example
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── config/
│       │   └── App.jsx
│       ├── .env.example
│       └── package.json
└── README.md
```

## Requisitos Previos

Para ejecutar este proyecto localmente es necesario tener instalado Node.js versión 18 o superior, PostgreSQL versión 14 o superior, y npm o yarn como gestor de paquetes. Se recomienda utilizar un cliente de base de datos como pgAdmin o DBeaver para administración de PostgreSQL.

## Instalación y Configuración

### Configuración de Base de Datos

Primero, crear una base de datos PostgreSQL para el proyecto. Acceder a PostgreSQL mediante terminal o cliente gráfico y ejecutar el siguiente comando SQL para crear la base de datos.

```sql
CREATE DATABASE datamark;
```

### Configuración del Backend

Navegar al directorio del backend e instalar las dependencias necesarias.

```bash
cd apps/backend
npm install
```

Crear un archivo `.env` basándose en `.env.example` y configurar las variables de entorno con los valores correspondientes al entorno local.

```env
PORT=3000
DATABASE_URL="postgresql://usuario:password@localhost:5432/datamark?schema=public"
NODE_ENV=development
```

Generar el cliente de Prisma y ejecutar las migraciones iniciales para crear las tablas en la base de datos.

```bash
npm run prisma:generate
npm run prisma:migrate
```

Iniciar el servidor de desarrollo del backend.

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

### Configuración del Frontend

En una nueva terminal, navegar al directorio del frontend e instalar las dependencias.

```bash
cd apps/frontend
npm install
```

Crear un archivo `.env` basándose en `.env.example` y configurar la URL del backend.

```env
VITE_API_URL=http://localhost:3000/api
```

Iniciar el servidor de desarrollo del frontend.

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Scripts Disponibles

### Backend

- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática
- `npm start`: Inicia el servidor en modo producción
- `npm run prisma:generate`: Genera el cliente de Prisma
- `npm run prisma:migrate`: Ejecuta migraciones de base de datos
- `npm run prisma:studio`: Abre interfaz visual de base de datos

### Frontend

- `npm run dev`: Inicia servidor de desarrollo
- `npm run build`: Genera build de producción
- `npm run preview`: Previsualiza build de producción

## Verificación de Instalación

Para verificar que el sistema está funcionando correctamente, acceder al endpoint de health check del backend navegando a `http://localhost:3000/api/health`. La respuesta debe ser un objeto JSON con estado OK. Posteriormente, abrir la aplicación frontend en el navegador en `http://localhost:5173` para confirmar que la interfaz de usuario se carga correctamente.

## Equipo de Desarrollo

Este proyecto fue desarrollado como parte de la Simulación Laboral de NoCountry - Febrero 2026.

- **Ezequiel Pacheco** - Fullstack Developer & Scrum Master - [GitHub](https://github.com/EzePacheco) - [LinkedIn](https://www.linkedin.com/in/ezepacheco-dev/)
- **Estrella Cruz Ulloa** - Data & Frontend Developer - [GitHub](https://github.com/estrellacruzulloa) - [LinkedIn](enlace)
- **Nelson Alexander Borbor Diaz** - Data & Fullstack Developer - [GitHub](https://github.com/NelsonBorbor98) - [LinkedIn](enlace)
- **Jose Ardilez Ugaz** - Data Scientist & Frontend Developer - [GitHub](https://github.com/JoseloArdiles) - [LinkedIn](enlace)
- **Daniel Lara** - Data Scientist & Backend Developer - [GitHub](https://github.com/Sts87) - [LinkedIn](enlace)

## Acerca de NoCountry

NoCountry es una plataforma de simulación laboral que conecta profesionales de tecnología en proyectos reales colaborativos. Este proyecto forma parte de la cohorte de Febrero 2026.

Para más información sobre NoCountry: [https://nocountry.tech/showcase](https://nocountry.tech/showcase)

## Licencia

Este proyecto es de código cerrado y está siendo desarrollado como producto comercial por el equipo de DATAMARK.
