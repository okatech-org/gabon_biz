// GABON BIZ — Submission Service (M2)

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionDto, EvaluateSubmissionDto } from '../dto';

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  // ==========================================
  // SUBMIT (soumissionner)
  // ==========================================
  async submit(dto: CreateSubmissionDto, userNip: string) {
    // Verify tender exists and is open
    const tender = await this.prisma.tender.findUnique({ where: { id: dto.tenderId } });
    if (!tender) throw new NotFoundException(`Marché introuvable (ID: ${dto.tenderId}).`);
    if (tender.status !== 'PUBLISHED') {
      throw new BadRequestException("Ce marché n'accepte plus de soumissions.");
    }
    if (tender.submissionDeadline && new Date(tender.submissionDeadline) < new Date()) {
      throw new BadRequestException('La date limite de soumission est dépassée.');
    }

    // Verify enterprise exists and belongs to user
    const enterprise = await this.prisma.enterprise.findUnique({ where: { id: dto.enterpriseId } });
    if (!enterprise)
      throw new NotFoundException(`Entreprise introuvable (ID: ${dto.enterpriseId}).`);
    if (enterprise.ownerNip !== userNip) {
      throw new ForbiddenException("Vous ne pouvez soumissionner qu'avec vos propres entreprises.");
    }

    // Check not already submitted
    const existing = await this.prisma.submission.findUnique({
      where: { tenderId_enterpriseId: { tenderId: dto.tenderId, enterpriseId: dto.enterpriseId } },
    });
    if (existing) {
      throw new ConflictException('Vous avez déjà soumissionné pour ce marché.');
    }

    return this.prisma.submission.create({
      data: {
        tenderId: dto.tenderId,
        enterpriseId: dto.enterpriseId,
        proposedAmount: dto.proposedAmount,
        technicalNote: dto.technicalNote,
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
      include: {
        tender: { select: { id: true, reference: true, title: true } },
        enterprise: { select: { id: true, name: true, rccm: true } },
      },
    });
  }

  // ==========================================
  // FIND BY TENDER (admin — all submissions for a tender)
  // ==========================================
  async findByTender(tenderId: string) {
    return this.prisma.submission.findMany({
      where: { tenderId },
      include: {
        enterprise: { select: { id: true, name: true, legalForm: true, rccm: true } },
      },
      orderBy: { submittedAt: 'desc' },
    });
  }

  // ==========================================
  // FIND MY SUBMISSIONS
  // ==========================================
  async findMySubmissions(userNip: string) {
    return this.prisma.submission.findMany({
      where: { enterprise: { ownerNip: userNip } },
      include: {
        tender: {
          select: {
            id: true,
            reference: true,
            title: true,
            status: true,
            submissionDeadline: true,
          },
        },
        enterprise: { select: { id: true, name: true } },
      },
      orderBy: { submittedAt: 'desc' },
    });
  }

  // ==========================================
  // FIND ONE
  // ==========================================
  async findOne(id: string) {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      include: {
        tender: true,
        enterprise: {
          select: { id: true, name: true, legalForm: true, rccm: true, nif: true, ownerNip: true },
        },
      },
    });

    if (!submission) throw new NotFoundException(`Soumission introuvable (ID: ${id}).`);
    return submission;
  }

  // ==========================================
  // EVALUATE (admin)
  // ==========================================
  async evaluate(id: string, dto: EvaluateSubmissionDto) {
    const submission = await this.findOne(id);

    if (submission.status !== 'SUBMITTED' && submission.status !== 'UNDER_REVIEW') {
      throw new BadRequestException(
        `Impossible d'évaluer une soumission au statut "${submission.status}".`,
      );
    }

    return this.prisma.submission.update({
      where: { id },
      data: {
        status: dto.status as any,
        score: dto.score,
        evaluationNote: dto.evaluationNote,
      },
      include: {
        tender: { select: { id: true, reference: true, title: true } },
        enterprise: { select: { id: true, name: true } },
      },
    });
  }

  // ==========================================
  // WITHDRAW (retirer sa soumission)
  // ==========================================
  async withdraw(id: string, userNip: string) {
    const submission = await this.findOne(id);

    if (submission.enterprise.ownerNip !== userNip) {
      throw new ForbiddenException('Seul le propriétaire peut retirer cette soumission.');
    }

    if (submission.status !== 'SUBMITTED') {
      throw new BadRequestException(
        'Seules les soumissions au statut "SUBMITTED" peuvent être retirées.',
      );
    }

    return this.prisma.submission.update({
      where: { id },
      data: { status: 'WITHDRAWN' as any },
    });
  }
}
