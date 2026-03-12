// GABON BIZ — M6 Observatoire: Indicators + Dashboard Stats

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class IndicatorService {
  async create(dto: any) {
    return prisma.indicator.create({ data: dto });
  }

  async findAll(query: { category?: string; period?: string; page?: number; limit?: number }) {
    const { category, period, page = 1, limit = 50 } = query;
    const where: any = {};
    if (category) where.category = category;
    if (period) where.period = period;

    const [data, total] = await Promise.all([
      prisma.indicator.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ category: 'asc' }, { name: 'asc' }],
      }),
      prisma.indicator.count({ where }),
    ]);
    return { data, meta: { total, page, limit } };
  }

  async findOne(id: string) {
    const ind = await prisma.indicator.findUnique({ where: { id } });
    if (!ind) throw new NotFoundException(`Indicateur introuvable (${id}).`);
    return ind;
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    return prisma.indicator.update({ where: { id }, data: dto });
  }

  async getDashboard() {
    const [totalIndicators, byCategory, totalEnterprises, totalStartups, totalTenders] =
      await Promise.all([
        prisma.indicator.count(),
        prisma.indicator.groupBy({ by: ['category'], _count: { id: true }, _avg: { value: true } }),
        prisma.enterprise.count({ where: { status: 'ACTIVE' } }),
        prisma.startup.count(),
        prisma.tender.count({ where: { status: { in: ['PUBLISHED', 'CLOSED', 'AWARDED'] } } }),
      ]);

    return {
      totalIndicators,
      byCategory,
      ecosystem: { enterprises: totalEnterprises, startups: totalStartups, tenders: totalTenders },
    };
  }
}
