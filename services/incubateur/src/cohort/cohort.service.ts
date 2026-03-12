// GABON BIZ — M4 Incubateur: Cohort + CohortApplication CRUD

import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CohortService {
  async create(dto: any) {
    return prisma.cohort.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        status: 'OPEN',
      },
    });
  }

  async findAll(query: { status?: string }) {
    const where: any = {};
    if (query.status) where.status = query.status;
    return prisma.cohort.findMany({
      where,
      include: { _count: { select: { applications: true } } },
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const cohort = await prisma.cohort.findUnique({
      where: { id },
      include: {
        applications: {
          include: {
            startup: { select: { id: true, pitch: true, enterprise: { select: { name: true } } } },
          },
          orderBy: { appliedAt: 'desc' },
        },
      },
    });
    if (!cohort) throw new NotFoundException(`Cohorte introuvable (${id}).`);
    return cohort;
  }

  async apply(cohortId: string, startupId: string) {
    const cohort = await this.findOne(cohortId);
    if (cohort.status !== 'OPEN')
      throw new BadRequestException("Cette cohorte n'accepte plus de candidatures.");

    const existing = await prisma.cohortApplication.findUnique({
      where: { cohortId_startupId: { cohortId, startupId } },
    });
    if (existing) throw new ConflictException('Vous avez déjà postulé à cette cohorte.');

    return prisma.cohortApplication.create({
      data: { cohortId, startupId, status: 'PENDING' },
      include: { cohort: { select: { name: true } }, startup: true },
    });
  }

  async evaluateApplication(applicationId: string, status: string, notes?: string) {
    return prisma.cohortApplication.update({
      where: { id: applicationId },
      data: { status: status as any, notes },
      include: { cohort: true, startup: true },
    });
  }
}
