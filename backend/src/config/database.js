import { PrismaClient } from '@prisma/client';

// Aseguramos que solo haya una instancia de Prisma [Singleton Pattern]

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
});

export default prisma;