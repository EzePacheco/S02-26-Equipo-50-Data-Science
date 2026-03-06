import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});
async function main() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    await prisma.$connect();
    console.log("Connected successfully!");
    await prisma.$disconnect();
}
main().catch(e => {
    console.error("Connection failed:");
    console.error(e);
    process.exit(1);
});
