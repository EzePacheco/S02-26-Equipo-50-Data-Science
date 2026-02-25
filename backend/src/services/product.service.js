import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export const createProductService = async (productData) => {
  
  const newProduct = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      category: productData.category,
      gender: productData.gender,
      style: productData.style,
      
      variants: {
        create: productData.variants.map(variant => ({
          sku: variant.sku,
          size: variant.size,
          color: variant.color,
          price: variant.price,
          stock: variant.stock,
        })),
      },
    },
    include: {
      variants: true, 
    },
  });

  return newProduct;
};