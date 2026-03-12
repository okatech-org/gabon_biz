// GABON BIZ — Tender Service (M2 — Marchés Publics)

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenderDto, UpdateTenderDto, TenderQueryDto, ChangeTenderStatusDto } from '../dto';

@Injectable()
export class TenderService {
  constructor(private prisma: PrismaService) {}

  // ==========================================
  // CREATE
  // ==========================================
  async create(dto: CreateTenderDto) {
    // Verify sector
    const sector = await this.prisma.sector.findUnique({ where: { id: dto.sectorId } });
    if (!sector) throw new NotFoundException(`Secteur introuvable (ID: ${dto.sectorId}).`);

    // Generate reference
    const reference = await this.generateReference();

    return this.prisma.tender.create({
      data: {
        reference,
        title: dto.title,
        description: dto.description,
        issuingAuthority: dto.issuingAuthority,
        sectorId: dto.sectorId,
        budgetMin: dto.budgetMin,
        budgetMax: dto.budgetMax,
        submissionDeadline: new Date(dto.submissionDeadline),
        openingDate: dto.openingDate ? new Date(dto.openingDate) : undefined,
        status: 'DRAFT',
      },
      include: { sector: { select: { id: true, name: true } } },
    });
  }

  // ==========================================
  // FIND ALL (paginated)
  // ==========================================
  async findAll(query: TenderQueryDto) {
    const {
      page = 1,
      limit = 20,
      status,
      sectorId,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (sectorId) where.sectorId = sectorId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { reference: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { issuingAuthority: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.tender.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          sector: { select: { id: true, name: true } },
          _count: { select: { submissions: true } },
        },
      }),
      this.prisma.tender.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ==========================================
  // FIND ONE
  // ==========================================
  async findOne(id: string) {
    const tender = await this.prisma.tender.findUnique({
      where: { id },
      include: {
        sector: true,
        submissions: {
          select: {
            id: true,
            enterpriseId: true,
            status: true,
            proposedAmount: true,
            submittedAt: true,
            enterprise: { select: { id: true, name: true, legalForm: true } },
          },
          orderBy: { submittedAt: 'desc' },
        },
        _count: { select: { submissions: true } },
      },
    });

    if (!tender) throw new NotFoundException(`Marché introuvable (ID: ${id}).`);
    return tender;
  }

  // ==========================================
  // FIND OPEN (public — only published, deadline not passed)
  // ==========================================
  async findOpen() {
    return this.prisma.tender.findMany({
      where: {
        status: 'PUBLISHED',
        submissionDeadline: { gt: new Date() },
      },
      include: {
        sector: { select: { id: true, name: true } },
        _count: { select: { submissions: true } },
      },
      orderBy: { submissionDeadline: 'asc' },
    });
  }

  // ==========================================
  // UPDATE
  // ==========================================
  async update(id: string, dto: UpdateTenderDto) {
    await this.findOne(id);

    return this.prisma.tender.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.description && { description: dto.description }),
        ...(dto.budgetMin !== undefined && { budgetMin: dto.budgetMin }),
        ...(dto.budgetMax !== undefined && { budgetMax: dto.budgetMax }),
        ...(dto.submissionDeadline && { submissionDeadline: new Date(dto.submissionDeadline) }),
        ...(dto.openingDate && { openingDate: new Date(dto.openingDate) }),
      },
      include: { sector: { select: { id: true, name: true } } },
    });
  }

  // ==========================================
  // CHANGE STATUS
  // ==========================================
  async changeStatus(id: string, dto: ChangeTenderStatusDto) {
    const tender = await this.findOne(id);

    // Validate status transitions
    const validTransitions: Record<string, string[]> = {
      DRAFT: ['PUBLISHED', 'CANCELLED'],
      PUBLISHED: ['CLOSED', 'CANCELLED'],
      CLOSED: ['AWARDED', 'CANCELLED'],
      AWARDED: [],
      CANCELLED: [],
    };

    const allowed = validTransitions[tender.status] || [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Transition invalide : ${tender.status} → ${dto.status}. Transitions autorisées : ${allowed.join(', ') || 'aucune'}.`,
      );
    }

    return this.prisma.tender.update({
      where: { id },
      data: { status: dto.status as any },
      include: { sector: true },
    });
  }

  // ==========================================
  // STATS
  // ==========================================
  async getStats() {
    const [total, published, closed, awarded] = await Promise.all([
      this.prisma.tender.count(),
      this.prisma.tender.count({ where: { status: 'PUBLISHED' } }),
      this.prisma.tender.count({ where: { status: 'CLOSED' } }),
      this.prisma.tender.count({ where: { status: 'AWARDED' } }),
    ]);

    const bySector = await this.prisma.tender.groupBy({
      by: ['sectorId'],
      _count: { id: true },
      _sum: { budgetMax: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    const totalBudget = await this.prisma.tender.aggregate({
      _sum: { budgetMax: true },
      where: { status: { in: ['PUBLISHED', 'CLOSED', 'AWARDED'] } },
    });

    return {
      total,
      published,
      closed,
      awarded,
      bySector,
      totalBudget: totalBudget._sum.budgetMax || 0,
    };
  }

  // ==========================================
  // Generate reference: DGMP-{YEAR}-AO-{SEQ}
  // ==========================================
  private async generateReference(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.tender.count({
      where: { reference: { startsWith: `DGMP-${year}` } },
    });
    const seq = String(count + 1).padStart(3, '0');
    return `DGMP-${year}-AO-${seq}`;
  }
}
