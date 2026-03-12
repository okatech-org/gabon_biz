// GABON BIZ — M3 Innovation Hub: Solution + Rating CRUD

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// Solution Service
// ============================================
@Injectable()
export class SolutionService {
  async create(dto: any, startupId: string) {
    return prisma.solution.create({
      data: { ...dto, startupId, status: 'DRAFT' },
      include: { startup: { select: { id: true, pitch: true } }, category: true },
    });
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    categoryId?: string;
    search?: string;
    status?: string;
  }) {
    const { page = 1, limit = 20, categoryId, search, status } = query;
    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (status) where.status = status;
    if (search)
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];

    const [data, total] = await Promise.all([
      prisma.solution.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          startup: { select: { id: true, pitch: true, enterprise: { select: { name: true } } } },
          category: true,
          _count: { select: { ratings: true } },
        },
      }),
      prisma.solution.count({ where }),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: string) {
    const solution = await prisma.solution.findUnique({
      where: { id },
      include: {
        startup: true,
        category: true,
        ratings: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!solution) throw new NotFoundException(`Solution introuvable (${id}).`);
    return solution;
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    return prisma.solution.update({ where: { id }, data: dto, include: { category: true } });
  }
}

// ============================================
// Rating Service
// ============================================
@Injectable()
export class RatingService {
  async rate(solutionId: string, userNip: string, score: number, comment?: string) {
    return prisma.rating.upsert({
      where: { solutionId_userNip: { solutionId, userNip } },
      update: { score, comment },
      create: { solutionId, userNip, score, comment },
    });
  }

  async findBySolution(solutionId: string) {
    return prisma.rating.findMany({
      where: { solutionId },
      include: { user: { select: { fullName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
