// GABON BIZ — Enterprise Service (M1 — Guichet Unique)
// Business logic for enterprise management

import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma';
import {
  CreateEnterpriseDto,
  UpdateEnterpriseDto,
  EnterpriseQueryDto,
  ChangeStatusDto,
} from '../dto';

@Injectable()
export class EnterpriseService {
  constructor(private prisma: PrismaService) {}

  // ==========================================
  // CREATE
  // ==========================================
  async create(dto: CreateEnterpriseDto, ownerNip: string) {
    // Check if user already has an enterprise with the same name
    const existing = await this.prisma.enterprise.findFirst({
      where: { ownerNip, name: dto.name },
    });
    if (existing) {
      throw new ConflictException(`Vous avez déjà une entreprise nommée "${dto.name}".`);
    }

    // Verify sector exists
    const sector = await this.prisma.sector.findUnique({
      where: { id: dto.sectorId },
    });
    if (!sector) {
      throw new NotFoundException(`Secteur introuvable (ID: ${dto.sectorId}).`);
    }

    // Generate RCCM and NIF
    const rccm = await this.generateRccm(dto.address.city);
    const nif = await this.generateNif();

    const enterprise = await this.prisma.enterprise.create({
      data: {
        rccm,
        nif,
        ownerNip,
        name: dto.name,
        legalForm: dto.legalForm as any,
        sectorId: dto.sectorId,
        status: 'DRAFT',
        address: dto.address as any,
        description: dto.description,
        employeeCount: dto.employeeCount,
        revenue: dto.revenue,
      },
      include: {
        sector: true,
        owner: {
          select: { nip: true, fullName: true, email: true },
        },
      },
    });

    return enterprise;
  }

  // ==========================================
  // FIND ALL (paginated + filtered)
  // ==========================================
  async findAll(query: EnterpriseQueryDto) {
    const {
      page = 1,
      limit = 20,
      status,
      sectorId,
      legalForm,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (sectorId) where.sectorId = sectorId;
    if (legalForm) where.legalForm = legalForm;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { rccm: { contains: search, mode: 'insensitive' } },
        { nif: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.enterprise.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          sector: { select: { id: true, name: true } },
          owner: { select: { nip: true, fullName: true } },
        },
      }),
      this.prisma.enterprise.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ==========================================
  // FIND ONE
  // ==========================================
  async findOne(id: string) {
    const enterprise = await this.prisma.enterprise.findUnique({
      where: { id },
      include: {
        sector: true,
        owner: {
          select: { nip: true, fullName: true, email: true, phone: true },
        },
        startup: true,
        submissions: {
          select: { id: true, tenderId: true, status: true, submittedAt: true },
          orderBy: { submittedAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!enterprise) {
      throw new NotFoundException(`Entreprise introuvable (ID: ${id}).`);
    }

    return enterprise;
  }

  // ==========================================
  // FIND BY OWNER (mes entreprises)
  // ==========================================
  async findByOwner(ownerNip: string) {
    return this.prisma.enterprise.findMany({
      where: { ownerNip },
      include: {
        sector: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ==========================================
  // UPDATE
  // ==========================================
  async update(id: string, dto: UpdateEnterpriseDto, userNip: string) {
    const enterprise = await this.findOne(id);

    // Only owner or admin can update
    if (enterprise.ownerNip !== userNip) {
      throw new ForbiddenException('Seul le propriétaire peut modifier cette entreprise.');
    }

    return this.prisma.enterprise.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.address && { address: dto.address as any }),
        ...(dto.description && { description: dto.description }),
        ...(dto.employeeCount !== undefined && {
          employeeCount: dto.employeeCount,
        }),
        ...(dto.revenue !== undefined && { revenue: dto.revenue }),
      },
      include: {
        sector: true,
        owner: { select: { nip: true, fullName: true, email: true } },
      },
    });
  }

  // ==========================================
  // CHANGE STATUS (admin only)
  // ==========================================
  async changeStatus(id: string, dto: ChangeStatusDto) {
    await this.findOne(id); // Verify exists

    return this.prisma.enterprise.update({
      where: { id },
      data: { status: dto.status as any },
      include: {
        sector: true,
        owner: { select: { nip: true, fullName: true, email: true } },
      },
    });
  }

  // ==========================================
  // DELETE (soft — set status to CLOSED)
  // ==========================================
  async remove(id: string, userNip: string) {
    const enterprise = await this.findOne(id);

    if (enterprise.ownerNip !== userNip) {
      throw new ForbiddenException('Seul le propriétaire peut supprimer cette entreprise.');
    }

    return this.prisma.enterprise.update({
      where: { id },
      data: { status: 'CLOSED' },
    });
  }

  // ==========================================
  // STATS (dashboard)
  // ==========================================
  async getStats() {
    const [total, active, pending, draft] = await Promise.all([
      this.prisma.enterprise.count(),
      this.prisma.enterprise.count({ where: { status: 'ACTIVE' } }),
      this.prisma.enterprise.count({ where: { status: 'PENDING' } }),
      this.prisma.enterprise.count({ where: { status: 'DRAFT' } }),
    ]);

    const byLegalForm = await this.prisma.enterprise.groupBy({
      by: ['legalForm'],
      _count: { id: true },
    });

    const bySector = await this.prisma.enterprise.groupBy({
      by: ['sectorId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    return {
      total,
      active,
      pending,
      draft,
      byLegalForm: byLegalForm.map((g) => ({
        legalForm: g.legalForm,
        count: g._count.id,
      })),
      bySector,
    };
  }

  // ==========================================
  // PRIVATE: Generate RCCM
  // Format: GA-{CITY_CODE}-{YEAR}-{TYPE}-{SEQ}
  // ==========================================
  private async generateRccm(city: string): Promise<string> {
    const cityCode = city.toUpperCase().substring(0, 3);
    const year = new Date().getFullYear();

    // Count existing for this year
    const count = await this.prisma.enterprise.count({
      where: { rccm: { startsWith: `GA-${cityCode}-${year}` } },
    });

    const seq = String(count + 1).padStart(5, '0');
    const type = 'B'; // B = commercial enterprise

    return `GA-${cityCode}-${year}-${type}-${seq}`;
  }

  // ==========================================
  // PRIVATE: Generate NIF
  // Format: NIF-GA-{SEQ}
  // ==========================================
  private async generateNif(): Promise<string> {
    const count = await this.prisma.enterprise.count();
    const seq = String(count + 1).padStart(6, '0');
    return `NIF-GA-${seq}`;
  }
}
