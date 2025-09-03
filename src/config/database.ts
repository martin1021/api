import { PrismaClient } from '@prisma/client';
import { env } from './env';

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// Define global type for PrismaClient
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Define global variable for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Export prisma client
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Set global prisma client in development mode to prevent multiple instances
if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Function to connect to database
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return prisma;
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    process.exit(1);
  }
}