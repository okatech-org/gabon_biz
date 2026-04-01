import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// ═══ TENDERS ════════════════════════════════════════════════════════════════
export const listTenders = query({
  args: {
    status: v.optional(v.string()),
    sectorId: v.optional(v.id('sectors')),
    search: v.optional(v.string()),
  },
  handler: async (ctx, { status, sectorId, search }) => {
    let results;
    if (status) {
      results = await ctx.db
        .query('tenders')
        .withIndex('by_status', (q) =>
          q.eq('status', status as 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'AWARDED' | 'CANCELLED'),
        )
        .collect();
    } else if (sectorId) {
      results = await ctx.db
        .query('tenders')
        .withIndex('by_sector', (q) => q.eq('sectorId', sectorId))
        .collect();
    } else {
      results = await ctx.db.query('tenders').collect();
    }
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(
        (t) => t.title.toLowerCase().includes(s) || t.reference.toLowerCase().includes(s),
      );
    }
    return results;
  },
});

export const getTender = query({
  args: { id: v.id('tenders') },
  handler: async (ctx, { id }) => {
    const tender = await ctx.db.get(id);
    if (!tender) return null;
    const submissions = await ctx.db
      .query('submissions')
      .withIndex('by_tender', (q) => q.eq('tenderId', id))
      .collect();
    const sector = await ctx.db.get(tender.sectorId);
    return { ...tender, sector, submissions, submissionCount: submissions.length };
  },
});

export const createTender = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    issuingAuthority: v.string(),
    sectorId: v.id('sectors'),
    submissionDeadline: v.string(),
    budgetMin: v.optional(v.number()),
    budgetMax: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query('tenders').collect();
    const year = new Date().getFullYear();
    const seq = existing.filter((t) => t.reference.startsWith(`MP-${year}`)).length + 1;
    const reference = `MP-${year}-${String(seq).padStart(4, '0')}`;
    return await ctx.db.insert('tenders', { ...args, reference, status: 'DRAFT' });
  },
});

// ═══ SUBMISSIONS ════════════════════════════════════════════════════════════
export const submitToTender = mutation({
  args: {
    tenderId: v.id('tenders'),
    enterpriseId: v.id('enterprises'),
    proposedAmount: v.optional(v.number()),
    technicalNote: v.optional(v.string()),
    motivation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('submissions', { ...args, status: 'SUBMITTED' });
  },
});

export const evaluateSubmission = mutation({
  args: {
    id: v.id('submissions'),
    score: v.number(),
    evaluationNote: v.optional(v.string()),
    status: v.string(),
  },
  handler: async (ctx, { id, ...updates }) => {
    await ctx.db.patch(id, updates);
  },
});
