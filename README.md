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
- React 19 para la construcción de interfaces de usuario
- Tailwind CSS 4 para el diseño y estilización
- Vite como herramienta de desarrollo y bundling
- Axios para comunicación HTTP con el backend
- React Router DOM para navegación entre vistas

**Backend**
- Node.js con ES Modules para arquitectura moderna
- Express.js como framework web
- PostgreSQL (Neon) como base de datos relacional serverless
- Prisma ORM para modelado de datos y migraciones
- CORS configurado para múltiples orígenes

## Arquitectura

### Backend (Clean Architecture)
```
backend/
├── src/
│   ├── domain/           # Capa de negocio (núcleo)
│   │   ├── entities/    # Entidades (Product, Sale, Customer, etc.)
│   │   ├── repositories/ # Interfaces de repositorios
│   │   ├── schemas/     # Zod schemas para validación
│   │   ├── factories/   # Factories para crear entidades
│   │   ├── errors/     # Errores personalizados
│   │   └── enum/       # Enums (ProductCategory)
│   ├── application/     # Casos de uso
│   │   ├── services/   # Lógica de negocio
│   │   └── dto/       # Data Transfer Objects
│   ├── infrastructure/  # Implementaciones externas
│   │   └── persistence/repositories/  # Implementaciones Prisma
│   └── interface/       # Capa de presentación API
│       ├── controllers/ # Controladores Express
│       └── routes/     # Definición de rutas
├── prisma/
│   └── schema.prisma   # Modelo de datos
└── package.json
```

### Frontend (Feature-based)
```
frontend/
├── src/
│   ├── app/              # Configuración global (routes, providers)
│   ├── features/        # Funcionalidades por módulo
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── sales/
│   │   ├── products/
│   │   ├── customers/
│   │   ├── inventory/
│   │   ├── landing/
│   │   └── onboarding/
│   ├── shared/          # Componentes y utilitarios reutilizables
│   │   ├── components/ # Button, Input, Table, Modal, etc.
│   │   ├── hooks/      # useApi, useForm, useLocalStorage
│   │   ├── utils/      # formatters, validators
│   │   └── layouts/    # MainLayout
│   └── assets/         # Imágenes y recursos estáticos
└── package.json
```

## Estructura del Proyecto

```
/
├── backend/               # API REST (Express + Prisma)
│   ├── src/
│   │   ├── server.js    # Punto de entrada
│   │   └── ...
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   └── package.json
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   ├── .env
│   └── package.json
├── README.md
└── .gitignore
```

## Requisitos Previos

Para ejecutar este proyecto localmente es necesario tener instalado:
- Node.js versión 18 o superior
- npm como gestor de paquetes

## Instalación y Configuración (Desarrollo Local)

### Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` basándose en `.env.example`:

```env
PORT=3000
DATABASE_URL="postgresql://usuario:password@localhost:5432/datamark?schema=public"
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

Generar el cliente de Prisma y sincronizar la base de datos:

```bash
npm run prisma:generate
npm run prisma:db push
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
```

Crear un archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Deployment

### Arquitectura de Producción

```
┌─────────────────────┐      ┌─────────────────────┐
│   Vercel (Frontend)│      │  Railway (Backend) │
│   - React/Vite     │─────▶│  - Express/Node    │
│   - *.vercel.app   │      │  - Prisma ORM      │
└─────────────────────┘      └─────────┬───────────┘
                                        │
                                        ▼
                               ┌─────────────────────┐
                               │   Neon (PostgreSQL) │
                               │   - Serverless DB   │
                               └─────────────────────┘
```

### Pasos para Deployment

1. **Base de Datos (Neon)**
   - Crear proyecto en [neon.tech](https://neon.tech)
   - Obtener la URL de conexión

2. **Backend (Railway)**
   - Conectar repositorio GitHub a [Railway](https://railway.app)
   - Seleccionar carpeta `backend`
   - Configurar variables de entorno:
     - `DATABASE_URL` = URL de Neon
     - `ALLOWED_ORIGINS` = Dominio de Vercel
   - Deploy automático

3. **Frontend (Vercel)**
   - Conectar repositorio GitHub a [Vercel](https://vercel.com)
   - Configurar:
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Configurar variable:
     - `VITE_API_URL` = URL de Railway + `/api`

## Scripts Disponibles

### Backend

- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática
- `npm start`: Inicia el servidor en modo producción
- `npm run prisma:generate`: Genera el cliente de Prisma
- `npm run prisma:db push`: Sincroniza el esquema con la base de datos
- `npm run prisma:studio`: Abre interfaz visual de base de datos
- `npm test`: Ejecuta los tests

### Frontend

- `npm run dev`: Inicia servidor de desarrollo
- `npm run build`: Genera build de producción
- `npm run preview`: Previsualiza build de producción
- `npm run lint`: Ejecuta el linter

## Verificación de Instalación

Para verificar que el sistema está funcionando correctamente:
1. Acceder al endpoint de health check: `http://localhost:3000/api/health`
2. La respuesta debe ser un objeto JSON con `status: "OK"`
3. Abrir la aplicación frontend en `http://localhost:5173`

## Estado del Proyecto

- ✅ Backend con estructura Clean Architecture completa
- ✅ Frontend con rutas, layout base y componentes compartidos
- ✅ Base de datos PostgreSQL (Neon) configurada
- ✅ Despliegue en Railway y Vercel preparado
- ⚠️ Módulos de productos y clientes en desarrollo

## Equipo de Desarrollo

Este proyecto fue desarrollado como parte de la Simulación Laboral de NoCountry - Febrero 2026.

- **Ezequiel Pacheco** - Fullstack Developer & Scrum Master - [GitHub](https://github.com/EzePacheco) - [LinkedIn](https://www.linkedin.com/in/ezepacheco-dev/)
- **Estrella Cruz Ulloa** - Data & Frontend Developer - [GitHub](https://github.com/estrellacruzulloa)
- **Nelson Alexander Borbor Diaz** - Data & Fullstack Developer - [GitHub](https://github.com/NelsonBorbor98)
- **Jose Ardilez Ugaz** - Data Scientist & Frontend Developer - [GitHub](https://github.com/JoseloArdiles)
- **Daniel Lara** - Data Scientist & Backend Developer - [GitHub](https://github.com/Sts87)

## Acerca de NoCountry

NoCountry es una plataforma de simulación laboral que conecta profesionales de tecnología en proyectos reales colaborativos. Este proyecto forma parte de la cohorte de Febrero 2026.

Para más información sobre NoCountry: [https://nocountry.tech/showcase](https://nocountry.tech/showcase)

## Licencia

Este proyecto es de código cerrado y está siendo desarrollado como producto comercial por el equipo de DATAMARK.
