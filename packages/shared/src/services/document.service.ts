// GABON BIZ — Document Service (Transversal)

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DocumentService {
  async upload(dto: {
    name: string;
    mimeType: string;
    size: number;
    storageKey: string;
    entityType: string;
    entityId: string;
    uploadedByNip: string;
  }) {
    return prisma.document.create({ data: dto });
  }

  async findByEntity(entityType: string, entityId: string) {
    return prisma.document.findMany({
      where: { entityType, entityId },
      include: { uploadedBy: { select: { fullName: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const doc = await prisma.document.findUnique({
      where: { id },
      include: { uploadedBy: { select: { fullName: true } } },
    });
    if (!doc) throw new NotFoundException(`Document introuvable (${id}).`);
    return doc;
  }

  async findByUser(userNip: string, query: { page?: number; limit?: number }) {
    const { page = 1, limit = 20 } = query;
    const [data, total] = await Promise.all([
      prisma.document.findMany({
        where: { uploadedByNip: userNip },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.document.count({ where: { uploadedByNip: userNip } }),
    ]);
    return { data, meta: { total, page, limit } };
  }

  async delete(id: string, userNip: string) {
    const doc = await this.findOne(id);
    if (doc.uploadedByNip !== userNip) {
      throw new NotFoundException('Seul le propriétaire peut supprimer ce document.');
    }
    return prisma.document.delete({ where: { id } });
  }

  async getStats() {
    const [total, byType] = await Promise.all([
      prisma.document.count(),
      prisma.document.groupBy({ by: ['entityType'], _count: { id: true } }),
    ]);
    return { total, byType };
  }
}
