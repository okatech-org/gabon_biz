// GABON BIZ — Notification Service (Transversal)

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class NotificationService {
  async create(dto: { userNip: string; type: string; title: string; body: string; link?: string }) {
    return prisma.notification.create({ data: dto });
  }

  async createBulk(
    userNips: string[],
    payload: { type: string; title: string; body: string; link?: string },
  ) {
    return prisma.notification.createMany({
      data: userNips.map((nip) => ({ userNip: nip, ...payload })),
    });
  }

  async findByUser(userNip: string, query: { read?: string; page?: number; limit?: number }) {
    const { read, page = 1, limit = 30 } = query;
    const where: any = { userNip };
    if (read === 'true') where.read = true;
    if (read === 'false') where.read = false;

    const [data, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { userNip, read: false } }),
    ]);

    return { data, meta: { total, page, limit, unreadCount } };
  }

  async markAsRead(id: string, userNip: string) {
    const notif = await prisma.notification.findFirst({ where: { id, userNip } });
    if (!notif) throw new NotFoundException('Notification introuvable.');
    return prisma.notification.update({ where: { id }, data: { read: true } });
  }

  async markAllAsRead(userNip: string) {
    return prisma.notification.updateMany({
      where: { userNip, read: false },
      data: { read: true },
    });
  }

  async getUnreadCount(userNip: string) {
    const count = await prisma.notification.count({ where: { userNip, read: false } });
    return { unreadCount: count };
  }

  async delete(id: string, userNip: string) {
    const notif = await prisma.notification.findFirst({ where: { id, userNip } });
    if (!notif) throw new NotFoundException('Notification introuvable.');
    return prisma.notification.delete({ where: { id } });
  }
}
