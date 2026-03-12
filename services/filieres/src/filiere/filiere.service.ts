// GABON BIZ — M7 Filières: Extended Sector + Enterprise analytics by filière

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class FiliereService {
  async findAll() {
    return prisma.sector.findMany({
      where: { isFiliere: true },
      include: {
        children: { include: { _count: { select: { enterprises: true } } } },
        _count: { select: { enterprises: true, tenders: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const filiere = await prisma.sector.findUnique({
      where: { id },
      include: {
        parent: true,
        children: { include: { _count: { select: { enterprises: true } } } },
        enterprises: {
          where: { status: 'ACTIVE' },
          select: { id: true, name: true, legalForm: true, employeeCount: true, revenue: true },
          orderBy: { revenue: 'desc' },
          take: 50,
        },
        tenders: {
          where: { status: { in: ['PUBLISHED', 'CLOSED', 'AWARDED'] } },
          select: { id: true, reference: true, title: true, status: true, budgetMax: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { enterprises: true, tenders: true } },
      },
    });
    if (!filiere) throw new NotFoundException(`Filière introuvable (${id}).`);
    return filiere;
  }

  async getStats() {
    const filieres = await prisma.sector.findMany({
      where: { isFiliere: true },
      include: {
        _count: { select: { enterprises: true, tenders: true } },
      },
    });

    const totalEnterprises = filieres.reduce((sum, f) => sum + f._count.enterprises, 0);
    const totalTenders = filieres.reduce((sum, f) => sum + f._count.tenders, 0);

    return {
      totalFilieres: filieres.length,
      totalEnterprises,
      totalTenders,
      byFiliere: filieres.map((f) => ({
        id: f.id,
        name: f.name,
        enterprises: f._count.enterprises,
        tenders: f._count.tenders,
      })),
    };
  }
}
