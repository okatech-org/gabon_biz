/**
 * GABON BIZ — Convex Schema
 * Migrated from Prisma PostgreSQL (16 models, 487 lines)
 * Super-application économique et entrepreneuriale du Gabon
 */
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // ═══ 1. USER (via GABON ID) ═══════════════════════════════════════════════
  users: defineTable({
    nip: v.string(), // National ID
    profileType: v.union(
      v.literal('ENTREPRENEUR'),
      v.literal('INVESTOR'),
      v.literal('STARTUP'),
      v.literal('ADMIN'),
      v.literal('PUBLIC'),
    ),
    email: v.string(),
    phone: v.optional(v.string()),
    fullName: v.string(),
    preferredLanguage: v.string(),
  })
    .index('by_nip', ['nip'])
    .index('by_email', ['email'])
    .index('by_profileType', ['profileType']),

  // ═══ 2. ENTERPRISE ════════════════════════════════════════════════════════
  enterprises: defineTable({
    rccm: v.string(),
    nif: v.string(),
    ownerNip: v.string(),
    name: v.string(),
    legalForm: v.union(
      v.literal('EI'),
      v.literal('SARL'),
      v.literal('SA'),
      v.literal('SAS'),
      v.literal('SNC'),
      v.literal('SCS'),
    ),
    sectorId: v.id('sectors'),
    status: v.union(
      v.literal('DRAFT'),
      v.literal('PENDING'),
      v.literal('ACTIVE'),
      v.literal('SUSPENDED'),
      v.literal('CLOSED'),
    ),
    address: v.any(),
    description: v.optional(v.string()),
    employeeCount: v.optional(v.number()),
    revenue: v.optional(v.number()),
  })
    .index('by_rccm', ['rccm'])
    .index('by_nif', ['nif'])
    .index('by_owner', ['ownerNip'])
    .index('by_sector', ['sectorId'])
    .index('by_status', ['status']),

  // ═══ 3. TENDER (Marché Public) ════════════════════════════════════════════
  tenders: defineTable({
    reference: v.string(),
    title: v.string(),
    description: v.string(),
    issuingAuthority: v.string(),
    sectorId: v.id('sectors'),
    budgetMin: v.optional(v.number()),
    budgetMax: v.optional(v.number()),
    submissionDeadline: v.string(),
    openingDate: v.optional(v.string()),
    status: v.union(
      v.literal('DRAFT'),
      v.literal('PUBLISHED'),
      v.literal('CLOSED'),
      v.literal('AWARDED'),
      v.literal('CANCELLED'),
    ),
  })
    .index('by_reference', ['reference'])
    .index('by_sector', ['sectorId'])
    .index('by_status', ['status'])
    .index('by_authority', ['issuingAuthority']),

  // ═══ 4. SUBMISSION (Soumission) ═══════════════════════════════════════════
  submissions: defineTable({
    tenderId: v.id('tenders'),
    enterpriseId: v.id('enterprises'),
    signatureHash: v.optional(v.string()),
    proposedAmount: v.optional(v.number()),
    technicalNote: v.optional(v.string()),
    evaluationNote: v.optional(v.string()),
    score: v.optional(v.number()),
    status: v.union(
      v.literal('SUBMITTED'),
      v.literal('UNDER_REVIEW'),
      v.literal('AWARDED'),
      v.literal('REJECTED'),
      v.literal('WITHDRAWN'),
    ),
    motivation: v.optional(v.string()),
  })
    .index('by_tender', ['tenderId'])
    .index('by_enterprise', ['enterpriseId'])
    .index('by_status', ['status']),

  // ═══ 5. STARTUP ═══════════════════════════════════════════════════════════
  startups: defineTable({
    enterpriseId: v.id('enterprises'),
    pitch: v.string(),
    teamSize: v.number(),
    fundingStage: v.union(
      v.literal('PRE_SEED'),
      v.literal('SEED'),
      v.literal('SERIES_A'),
      v.literal('SERIES_B'),
      v.literal('GROWTH'),
    ),
    metrics: v.any(),
    website: v.optional(v.string()),
    seekingFunding: v.boolean(),
  })
    .index('by_enterprise', ['enterpriseId'])
    .index('by_fundingStage', ['fundingStage'])
    .index('by_seekingFunding', ['seekingFunding']),

  // ═══ 6. SOLUTION (Innovation Hub) ═════════════════════════════════════════
  solutions: defineTable({
    startupId: v.id('startups'),
    name: v.string(),
    description: v.string(),
    categoryId: v.id('categories'),
    pricingModel: v.union(
      v.literal('FREE'),
      v.literal('FREEMIUM'),
      v.literal('PAID'),
      v.literal('CUSTOM'),
    ),
    status: v.union(v.literal('DRAFT'), v.literal('PUBLISHED'), v.literal('ARCHIVED')),
    averageRating: v.optional(v.number()),
  })
    .index('by_startup', ['startupId'])
    .index('by_category', ['categoryId'])
    .index('by_status', ['status']),

  // ═══ 7. RATING ════════════════════════════════════════════════════════════
  ratings: defineTable({
    solutionId: v.id('solutions'),
    userNip: v.string(),
    score: v.number(),
    comment: v.optional(v.string()),
  }).index('by_solution', ['solutionId']),

  // ═══ 8. INVESTOR PROFILE ══════════════════════════════════════════════════
  investorProfiles: defineTable({
    userNip: v.string(),
    type: v.union(
      v.literal('ANGEL'),
      v.literal('VC'),
      v.literal('CORPORATE'),
      v.literal('INSTITUTIONAL'),
      v.literal('DFI'),
    ),
    ticketMin: v.number(),
    ticketMax: v.number(),
    bio: v.optional(v.string()),
    languages: v.array(v.string()),
    focusSectors: v.array(v.string()),
  })
    .index('by_userNip', ['userNip'])
    .index('by_type', ['type']),

  // ═══ 9. COHORT (Incubateur) ═══════════════════════════════════════════════
  cohorts: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    startDate: v.string(),
    endDate: v.string(),
    maxStartups: v.number(),
    status: v.union(v.literal('OPEN'), v.literal('IN_PROGRESS'), v.literal('COMPLETED')),
  }).index('by_status', ['status']),

  // ═══ 10. COHORT APPLICATION ═══════════════════════════════════════════════
  cohortApplications: defineTable({
    cohortId: v.id('cohorts'),
    startupId: v.id('startups'),
    status: v.union(
      v.literal('PENDING'),
      v.literal('REVIEW'),
      v.literal('INTERVIEW'),
      v.literal('ACCEPTED'),
      v.literal('REJECTED'),
    ),
    notes: v.optional(v.string()),
  })
    .index('by_cohort', ['cohortId'])
    .index('by_startup', ['startupId'])
    .index('by_status', ['status']),

  // ═══ 11. INDICATOR (Observatoire) ═════════════════════════════════════════
  indicators: defineTable({
    name: v.string(),
    source: v.string(),
    category: v.union(
      v.literal('INFRASTRUCTURE'),
      v.literal('SKILLS'),
      v.literal('INNOVATION'),
      v.literal('POLICY'),
      v.literal('INCLUSION'),
    ),
    value: v.number(),
    unit: v.string(),
    period: v.string(),
    countryCode: v.string(),
  })
    .index('by_category', ['category'])
    .index('by_period', ['period']),

  // ═══ 12. SECTOR ═══════════════════════════════════════════════════════════
  sectors: defineTable({
    name: v.string(),
    parentId: v.optional(v.id('sectors')),
    isFiliere: v.boolean(),
  })
    .index('by_name', ['name'])
    .index('by_parent', ['parentId']),

  // ═══ 13. CATEGORY ═════════════════════════════════════════════════════════
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    icon: v.optional(v.string()),
  })
    .index('by_name', ['name'])
    .index('by_slug', ['slug']),

  // ═══ 14. DOCUMENT ═════════════════════════════════════════════════════════
  documents: defineTable({
    name: v.string(),
    mimeType: v.string(),
    size: v.number(),
    storageKey: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    uploadedByNip: v.string(),
  })
    .index('by_entity', ['entityType', 'entityId'])
    .index('by_uploader', ['uploadedByNip']),

  // ═══ 15. NOTIFICATION ═════════════════════════════════════════════════════
  notifications: defineTable({
    userNip: v.string(),
    type: v.string(),
    title: v.string(),
    body: v.string(),
    read: v.boolean(),
    link: v.optional(v.string()),
  })
    .index('by_user', ['userNip'])
    .index('by_read', ['read']),

  // ═══ 16. MESSAGE (Messagerie) ═════════════════════════════════════════════
  messages: defineTable({
    threadId: v.string(),
    senderNip: v.string(),
    recipientNip: v.string(),
    content: v.string(),
    readAt: v.optional(v.string()),
  })
    .index('by_thread', ['threadId'])
    .index('by_sender', ['senderNip'])
    .index('by_recipient', ['recipientNip']),
});
