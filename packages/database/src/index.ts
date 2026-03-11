// GABON BIZ Database Package
// Re-exports Prisma Client for use across microservices

import { PrismaClient } from '@prisma/client';

// Singleton pattern to avoid multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { PrismaClient } from '@prisma/client';
export * from '@prisma/client';
