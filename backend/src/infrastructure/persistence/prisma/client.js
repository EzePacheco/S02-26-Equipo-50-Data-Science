/**
 * client.js
 * Capa de infraestructura: Cliente de Prisma para conexión a PostgreSQL
 * Inicializa el cliente de Prisma con el adapter de PostgreSQL
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Pool de conexiones PostgreSQL
 * @type {Pool}
 */
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/**
 * Adapter de Prisma para PostgreSQL
 * @type {PrismaPg}
 */
const adapter = new PrismaPg(pool);

/**
 * Instancia global del cliente de Prisma
 * @type {PrismaClient}
 */
const prisma = new PrismaClient({ adapter });

export default prisma;
