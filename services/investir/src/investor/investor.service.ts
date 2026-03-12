// GABON BIZ — M5 Investir: InvestorProfile + Matching

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class InvestorService {
  async createProfile(userNip: string, dto: any) {
    return prisma.investorProfile.upsert({
      where: { userNip },
      update: dto,
      create: { userNip, ...dto },
    });
  }

  async findAll(query: { type?: string; page?: number; limit?: number }) {
    const { type, page = 1, limit = 20 } = query;
    const where: any = {};
    if (type) where.type = type;

    const [data, total] = await Promise.all([
      prisma.investorProfile.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { user: { select: { fullName: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.investorProfile.count({ where }),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: string) {
    const profile = await prisma.investorProfile.findUnique({
      where: { id },
      include: { user: { select: { fullName: true, email: true, phone: true } } },
    });
    if (!profile) throw new NotFoundException(`Profil investisseur introuvable (${id}).`);
    return profile;
  }

  async matchStartups(investorId: string) {
    const investor = await this.findOne(investorId);
    // Match startups seeking funding in investor's focus sectors
    return prisma.startup.findMany({
      where: {
        seekingFunding: true,
        enterprise: { sector: { name: { in: investor.focusSectors } } },
      },
      include: { enterprise: { select: { name: true, sector: { select: { name: true } } } } },
      take: 20,
    });
  }

  async getStats() {
    const [total, byType] = await Promise.all([
      prisma.investorProfile.count(),
      prisma.investorProfile.groupBy({ by: ['type'], _count: { id: true } }),
    ]);

    const totalTicket = await prisma.investorProfile.aggregate({ _sum: { ticketMax: true } });

    return { total, byType, totalTicketMax: totalTicket._sum.ticketMax || 0 };
  }
}
