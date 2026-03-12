// GABON BIZ — Messaging Service (Transversal)

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MessagingService {
  async sendMessage(
    senderNip: string,
    dto: { recipientNip: string; content: string; threadId?: string },
  ) {
    const threadId = dto.threadId || this.generateThreadId(senderNip, dto.recipientNip);

    return prisma.message.create({
      data: {
        threadId,
        senderNip,
        recipientNip: dto.recipientNip,
        content: dto.content,
      },
      include: {
        sender: { select: { fullName: true } },
        recipient: { select: { fullName: true } },
      },
    });
  }

  async getConversations(userNip: string) {
    // Get latest message per thread
    const messages = await prisma.message.findMany({
      where: { OR: [{ senderNip: userNip }, { recipientNip: userNip }] },
      orderBy: { createdAt: 'desc' },
      distinct: ['threadId'],
      include: {
        sender: { select: { fullName: true, nip: true } },
        recipient: { select: { fullName: true, nip: true } },
      },
      take: 50,
    });

    // Count unread per thread
    const threads = await Promise.all(
      messages.map(async (msg) => {
        const unread = await prisma.message.count({
          where: { threadId: msg.threadId, recipientNip: userNip, readAt: null },
        });
        return { ...msg, unreadCount: unread };
      }),
    );

    return threads;
  }

  async getThread(threadId: string, userNip: string, query: { page?: number; limit?: number }) {
    const { page = 1, limit = 50 } = query;

    // Verify user is part of the thread
    const check = await prisma.message.findFirst({
      where: { threadId, OR: [{ senderNip: userNip }, { recipientNip: userNip }] },
    });
    if (!check) throw new ForbiddenException('Vous ne faites pas partie de cette conversation.');

    // Mark as read
    await prisma.message.updateMany({
      where: { threadId, recipientNip: userNip, readAt: null },
      data: { readAt: new Date() },
    });

    const [data, total] = await Promise.all([
      prisma.message.findMany({
        where: { threadId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'asc' },
        include: {
          sender: { select: { fullName: true, nip: true } },
          recipient: { select: { fullName: true, nip: true } },
        },
      }),
      prisma.message.count({ where: { threadId } }),
    ]);

    return { data, meta: { total, page, limit, threadId } };
  }

  async getUnreadCount(userNip: string) {
    const count = await prisma.message.count({
      where: { recipientNip: userNip, readAt: null },
    });
    return { unreadCount: count };
  }

  private generateThreadId(nip1: string, nip2: string): string {
    const sorted = [nip1, nip2].sort();
    return `thread_${sorted[0]}_${sorted[1]}`;
  }
}
