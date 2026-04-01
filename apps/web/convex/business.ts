import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// ═══ STARTUPS ═══════════════════════════════════════════════════════════════
export const listStartups = query({
  args: { fundingStage: v.optional(v.string()), seekingFunding: v.optional(v.boolean()) },
  handler: async (ctx, { fundingStage, seekingFunding }) => {
    let results;
    if (seekingFunding !== undefined) {
      results = await ctx.db
        .query('startups')
        .withIndex('by_seekingFunding', (q) => q.eq('seekingFunding', seekingFunding))
        .collect();
    } else {
      results = await ctx.db.query('startups').collect();
    }
    if (fundingStage) {
      results = results.filter((s) => s.fundingStage === fundingStage);
    }
    const enriched = await Promise.all(
      results.map(async (s) => {
        const enterprise = await ctx.db.get(s.enterpriseId);
        return { ...s, enterpriseName: enterprise?.name ?? '—' };
      }),
    );
    return enriched;
  },
});

export const getStartup = query({
  args: { id: v.id('startups') },
  handler: async (ctx, { id }) => {
    const startup = await ctx.db.get(id);
    if (!startup) return null;
    const enterprise = await ctx.db.get(startup.enterpriseId);
    const solutions = await ctx.db
      .query('solutions')
      .withIndex('by_startup', (q) => q.eq('startupId', id))
      .collect();
    return { ...startup, enterprise, solutions };
  },
});

export const createStartup = mutation({
  args: {
    enterpriseId: v.id('enterprises'),
    pitch: v.string(),
    teamSize: v.number(),
    fundingStage: v.optional(v.string()),
    website: v.optional(v.string()),
    seekingFunding: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('startups', {
      ...args,
      fundingStage: (args.fundingStage ?? 'PRE_SEED') as
        | 'PRE_SEED'
        | 'SEED'
        | 'SERIES_A'
        | 'SERIES_B'
        | 'GROWTH',
      metrics: {},
      seekingFunding: args.seekingFunding ?? false,
    });
  },
});

// ═══ SOLUTIONS ══════════════════════════════════════════════════════════════
export const listSolutions = query({
  args: { categoryId: v.optional(v.id('categories')), status: v.optional(v.string()) },
  handler: async (ctx, { categoryId, status }) => {
    let results;
    if (categoryId) {
      results = await ctx.db
        .query('solutions')
        .withIndex('by_category', (q) => q.eq('categoryId', categoryId))
        .collect();
    } else if (status) {
      results = await ctx.db
        .query('solutions')
        .withIndex('by_status', (q) => q.eq('status', status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'))
        .collect();
    } else {
      results = await ctx.db.query('solutions').collect();
    }
    return results;
  },
});

export const createSolution = mutation({
  args: {
    startupId: v.id('startups'),
    name: v.string(),
    description: v.string(),
    categoryId: v.id('categories'),
    pricingModel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('solutions', {
      ...args,
      pricingModel: (args.pricingModel ?? 'FREE') as 'FREE' | 'FREEMIUM' | 'PAID' | 'CUSTOM',
      status: 'DRAFT',
    });
  },
});

export const rateSolution = mutation({
  args: {
    solutionId: v.id('solutions'),
    userNip: v.string(),
    score: v.number(),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('ratings', args);
    // Update average
    const ratings = await ctx.db
      .query('ratings')
      .withIndex('by_solution', (q) => q.eq('solutionId', args.solutionId))
      .collect();
    const avg = ratings.reduce((s, r) => s + r.score, 0) / ratings.length;
    await ctx.db.patch(args.solutionId, { averageRating: Math.round(avg * 10) / 10 });
    return id;
  },
});

// ═══ COHORTS ════════════════════════════════════════════════════════════════
export const listCohorts = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, { status }) => {
    if (status) {
      return await ctx.db
        .query('cohorts')
        .withIndex('by_status', (q) =>
          q.eq('status', status as 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'),
        )
        .collect();
    }
    return await ctx.db.query('cohorts').collect();
  },
});

export const applyCohort = mutation({
  args: { cohortId: v.id('cohorts'), startupId: v.id('startups'), notes: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await ctx.db.insert('cohortApplications', { ...args, status: 'PENDING' });
  },
});

// ═══ INDICATORS ═════════════════════════════════════════════════════════════
export const listIndicators = query({
  args: { category: v.optional(v.string()), period: v.optional(v.string()) },
  handler: async (ctx, { category, period }) => {
    let results;
    if (category) {
      results = await ctx.db
        .query('indicators')
        .withIndex('by_category', (q) =>
          q.eq(
            'category',
            category as 'INFRASTRUCTURE' | 'SKILLS' | 'INNOVATION' | 'POLICY' | 'INCLUSION',
          ),
        )
        .collect();
    } else {
      results = await ctx.db.query('indicators').collect();
    }
    if (period) {
      results = results.filter((i) => i.period === period);
    }
    return results;
  },
});

// ═══ SECTORS & CATEGORIES ═══════════════════════════════════════════════════
export const listSectors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('sectors').collect();
  },
});

export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('categories').collect();
  },
});

// ═══ INVESTOR PROFILES ══════════════════════════════════════════════════════
export const listInvestors = query({
  args: { type: v.optional(v.string()) },
  handler: async (ctx, { type }) => {
    if (type) {
      return await ctx.db
        .query('investorProfiles')
        .withIndex('by_type', (q) =>
          q.eq('type', type as 'ANGEL' | 'VC' | 'CORPORATE' | 'INSTITUTIONAL' | 'DFI'),
        )
        .collect();
    }
    return await ctx.db.query('investorProfiles').collect();
  },
});

export const createInvestorProfile = mutation({
  args: {
    userNip: v.string(),
    type: v.string(),
    ticketMin: v.number(),
    ticketMax: v.number(),
    bio: v.optional(v.string()),
    languages: v.array(v.string()),
    focusSectors: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('investorProfiles', {
      ...args,
      type: args.type as 'ANGEL' | 'VC' | 'CORPORATE' | 'INSTITUTIONAL' | 'DFI',
    });
  },
});

// ═══ NOTIFICATIONS & MESSAGES ═══════════════════════════════════════════════
export const getNotifications = query({
  args: { userNip: v.string(), unreadOnly: v.optional(v.boolean()) },
  handler: async (ctx, { userNip, unreadOnly }) => {
    let results = await ctx.db
      .query('notifications')
      .withIndex('by_user', (q) => q.eq('userNip', userNip))
      .order('desc')
      .collect();
    if (unreadOnly) results = results.filter((n) => !n.read);
    return results;
  },
});

export const markNotificationRead = mutation({
  args: { id: v.id('notifications') },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { read: true });
  },
});

export const getMessages = query({
  args: { threadId: v.string() },
  handler: async (ctx, { threadId }) => {
    return await ctx.db
      .query('messages')
      .withIndex('by_thread', (q) => q.eq('threadId', threadId))
      .collect();
  },
});

export const sendMessage = mutation({
  args: {
    threadId: v.string(),
    senderNip: v.string(),
    recipientNip: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('messages', args);
  },
});
