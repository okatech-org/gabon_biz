import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {
    sectorId: v.optional(v.id('sectors')),
    status: v.optional(v.string()),
    search: v.optional(v.string()),
    ownerNip: v.optional(v.string()),
  },
  handler: async (ctx, { sectorId, status, search, ownerNip }) => {
    let results;
    if (sectorId) {
      results = await ctx.db
        .query('enterprises')
        .withIndex('by_sector', (q) => q.eq('sectorId', sectorId))
        .collect();
    } else if (ownerNip) {
      results = await ctx.db
        .query('enterprises')
        .withIndex('by_owner', (q) => q.eq('ownerNip', ownerNip))
        .collect();
    } else if (status) {
      results = await ctx.db
        .query('enterprises')
        .withIndex('by_status', (q) =>
          q.eq('status', status as 'DRAFT' | 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED'),
        )
        .collect();
    } else {
      results = await ctx.db.query('enterprises').collect();
    }
    if (search) {
      const s = search.toLowerCase();
      results = results.filter((e) => e.name.toLowerCase().includes(s));
    }
    return results;
  },
});

export const get = query({
  args: { id: v.id('enterprises') },
  handler: async (ctx, { id }) => {
    const enterprise = await ctx.db.get(id);
    if (!enterprise) return null;
    const sector = await ctx.db.get(enterprise.sectorId);
    return { ...enterprise, sector };
  },
});

export const create = mutation({
  args: {
    rccm: v.string(),
    nif: v.string(),
    ownerNip: v.string(),
    name: v.string(),
    legalForm: v.string(),
    sectorId: v.id('sectors'),
    address: v.any(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('enterprises', {
      ...args,
      legalForm: args.legalForm as 'EI' | 'SARL' | 'SA' | 'SAS' | 'SNC' | 'SCS',
      status: 'DRAFT',
    });
  },
});

export const update = mutation({
  args: {
    id: v.id('enterprises'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    employeeCount: v.optional(v.number()),
    revenue: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...updates }) => {
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, val]) => val !== undefined),
    );
    await ctx.db.patch(id, filtered);
  },
});
