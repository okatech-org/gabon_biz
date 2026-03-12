// GABON BIZ — Sector Service

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateSectorDto } from './sector.controller';

@Injectable()
export class SectorService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSectorDto) {
    const existing = await this.prisma.sector.findUnique({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException(`Le secteur "${dto.name}" existe déjà.`);
    }

    return this.prisma.sector.create({
      data: {
        name: dto.name,
        parentId: dto.parentId,
        isFiliere: dto.isFiliere ?? false,
      },
    });
  }

  async findAll() {
    return this.prisma.sector.findMany({
      include: {
        children: true,
        _count: { select: { enterprises: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findFilieres() {
    return this.prisma.sector.findMany({
      where: { isFiliere: true },
      include: {
        _count: { select: { enterprises: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const sector = await this.prisma.sector.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        enterprises: {
          where: { status: 'ACTIVE' },
          select: { id: true, name: true, legalForm: true },
          take: 20,
        },
        _count: { select: { enterprises: true, tenders: true } },
      },
    });

    if (!sector) {
      throw new NotFoundException(`Secteur introuvable (ID: ${id}).`);
    }

    return sector;
  }
}
