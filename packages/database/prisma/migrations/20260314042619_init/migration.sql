-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('ENTREPRENEUR', 'INVESTOR', 'STARTUP', 'ADMIN', 'PUBLIC');

-- CreateEnum
CREATE TYPE "LegalForm" AS ENUM ('EI', 'SARL', 'SA', 'SAS', 'SNC', 'SCS');

-- CreateEnum
CREATE TYPE "EnterpriseStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'SUSPENDED', 'CLOSED');

-- CreateEnum
CREATE TYPE "TenderStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'AWARDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'AWARDED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "FundingStage" AS ENUM ('PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'GROWTH');

-- CreateEnum
CREATE TYPE "PricingModel" AS ENUM ('FREE', 'FREEMIUM', 'PAID', 'CUSTOM');

-- CreateEnum
CREATE TYPE "SolutionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "InvestorType" AS ENUM ('ANGEL', 'VC', 'CORPORATE', 'INSTITUTIONAL', 'DFI');

-- CreateEnum
CREATE TYPE "CohortStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEW', 'INTERVIEW', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "IndicatorCategory" AS ENUM ('INFRASTRUCTURE', 'SKILLS', 'INNOVATION', 'POLICY', 'INCLUSION');

-- CreateTable
CREATE TABLE "users" (
    "nip" VARCHAR(14) NOT NULL,
    "profileType" "ProfileType" NOT NULL DEFAULT 'PUBLIC',
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "fullName" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'fr',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "enterprises" (
    "id" TEXT NOT NULL,
    "rccm" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "ownerNip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legalForm" "LegalForm" NOT NULL,
    "sectorId" TEXT NOT NULL,
    "status" "EnterpriseStatus" NOT NULL DEFAULT 'DRAFT',
    "address" JSONB NOT NULL,
    "description" TEXT,
    "employeeCount" INTEGER,
    "revenue" DECIMAL(15,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enterprises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenders" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "issuingAuthority" TEXT NOT NULL,
    "sectorId" TEXT NOT NULL,
    "budgetMin" DECIMAL(15,2),
    "budgetMax" DECIMAL(15,2),
    "submissionDeadline" TIMESTAMP(3) NOT NULL,
    "openingDate" TIMESTAMP(3),
    "status" "TenderStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "tenderId" TEXT NOT NULL,
    "enterpriseId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "signatureHash" TEXT,
    "proposedAmount" DECIMAL(15,2),
    "technicalNote" TEXT,
    "evaluationNote" TEXT,
    "score" DECIMAL(5,2),
    "status" "SubmissionStatus" NOT NULL DEFAULT 'SUBMITTED',
    "motivation" TEXT,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "startups" (
    "id" TEXT NOT NULL,
    "enterpriseId" TEXT NOT NULL,
    "pitch" TEXT NOT NULL,
    "teamSize" INTEGER NOT NULL,
    "fundingStage" "FundingStage" NOT NULL DEFAULT 'PRE_SEED',
    "metrics" JSONB NOT NULL DEFAULT '{}',
    "website" TEXT,
    "seekingFunding" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "startups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solutions" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "pricingModel" "PricingModel" NOT NULL DEFAULT 'FREE',
    "status" "SolutionStatus" NOT NULL DEFAULT 'DRAFT',
    "averageRating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL,
    "solutionId" TEXT NOT NULL,
    "userNip" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investor_profiles" (
    "id" TEXT NOT NULL,
    "userNip" TEXT NOT NULL,
    "type" "InvestorType" NOT NULL,
    "ticketMin" DECIMAL(15,2) NOT NULL,
    "ticketMax" DECIMAL(15,2) NOT NULL,
    "bio" TEXT,
    "languages" TEXT[],
    "focusSectors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cohorts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "maxStartups" INTEGER NOT NULL,
    "status" "CohortStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cohorts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cohort_applications" (
    "id" TEXT NOT NULL,
    "cohortId" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "cohort_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicators" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "category" "IndicatorCategory" NOT NULL,
    "value" DECIMAL(15,4) NOT NULL,
    "unit" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "countryCode" VARCHAR(3) NOT NULL DEFAULT 'GA',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "isFiliere" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "storageKey" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "uploadedByNip" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userNip" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "senderNip" TEXT NOT NULL,
    "recipientNip" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_profileType_idx" ON "users"("profileType");

-- CreateIndex
CREATE UNIQUE INDEX "enterprises_rccm_key" ON "enterprises"("rccm");

-- CreateIndex
CREATE UNIQUE INDEX "enterprises_nif_key" ON "enterprises"("nif");

-- CreateIndex
CREATE INDEX "enterprises_ownerNip_idx" ON "enterprises"("ownerNip");

-- CreateIndex
CREATE INDEX "enterprises_sectorId_idx" ON "enterprises"("sectorId");

-- CreateIndex
CREATE INDEX "enterprises_status_idx" ON "enterprises"("status");

-- CreateIndex
CREATE INDEX "enterprises_name_idx" ON "enterprises"("name");

-- CreateIndex
CREATE INDEX "enterprises_createdAt_idx" ON "enterprises"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "tenders_reference_key" ON "tenders"("reference");

-- CreateIndex
CREATE INDEX "tenders_reference_idx" ON "tenders"("reference");

-- CreateIndex
CREATE INDEX "tenders_sectorId_idx" ON "tenders"("sectorId");

-- CreateIndex
CREATE INDEX "tenders_status_idx" ON "tenders"("status");

-- CreateIndex
CREATE INDEX "tenders_submissionDeadline_idx" ON "tenders"("submissionDeadline");

-- CreateIndex
CREATE INDEX "tenders_issuingAuthority_idx" ON "tenders"("issuingAuthority");

-- CreateIndex
CREATE INDEX "tenders_createdAt_idx" ON "tenders"("createdAt");

-- CreateIndex
CREATE INDEX "submissions_tenderId_idx" ON "submissions"("tenderId");

-- CreateIndex
CREATE INDEX "submissions_enterpriseId_idx" ON "submissions"("enterpriseId");

-- CreateIndex
CREATE INDEX "submissions_status_idx" ON "submissions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "submissions_tenderId_enterpriseId_key" ON "submissions"("tenderId", "enterpriseId");

-- CreateIndex
CREATE UNIQUE INDEX "startups_enterpriseId_key" ON "startups"("enterpriseId");

-- CreateIndex
CREATE INDEX "startups_fundingStage_idx" ON "startups"("fundingStage");

-- CreateIndex
CREATE INDEX "startups_seekingFunding_idx" ON "startups"("seekingFunding");

-- CreateIndex
CREATE INDEX "solutions_startupId_idx" ON "solutions"("startupId");

-- CreateIndex
CREATE INDEX "solutions_categoryId_idx" ON "solutions"("categoryId");

-- CreateIndex
CREATE INDEX "solutions_status_idx" ON "solutions"("status");

-- CreateIndex
CREATE INDEX "solutions_pricingModel_idx" ON "solutions"("pricingModel");

-- CreateIndex
CREATE INDEX "ratings_solutionId_idx" ON "ratings"("solutionId");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_solutionId_userNip_key" ON "ratings"("solutionId", "userNip");

-- CreateIndex
CREATE UNIQUE INDEX "investor_profiles_userNip_key" ON "investor_profiles"("userNip");

-- CreateIndex
CREATE INDEX "investor_profiles_type_idx" ON "investor_profiles"("type");

-- CreateIndex
CREATE INDEX "cohorts_status_idx" ON "cohorts"("status");

-- CreateIndex
CREATE INDEX "cohort_applications_cohortId_idx" ON "cohort_applications"("cohortId");

-- CreateIndex
CREATE INDEX "cohort_applications_startupId_idx" ON "cohort_applications"("startupId");

-- CreateIndex
CREATE INDEX "cohort_applications_status_idx" ON "cohort_applications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "cohort_applications_cohortId_startupId_key" ON "cohort_applications"("cohortId", "startupId");

-- CreateIndex
CREATE INDEX "indicators_category_idx" ON "indicators"("category");

-- CreateIndex
CREATE INDEX "indicators_period_idx" ON "indicators"("period");

-- CreateIndex
CREATE INDEX "indicators_countryCode_idx" ON "indicators"("countryCode");

-- CreateIndex
CREATE UNIQUE INDEX "indicators_name_period_countryCode_key" ON "indicators"("name", "period", "countryCode");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_name_key" ON "sectors"("name");

-- CreateIndex
CREATE INDEX "sectors_parentId_idx" ON "sectors"("parentId");

-- CreateIndex
CREATE INDEX "sectors_isFiliere_idx" ON "sectors"("isFiliere");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "documents_entityType_entityId_idx" ON "documents"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "documents_uploadedByNip_idx" ON "documents"("uploadedByNip");

-- CreateIndex
CREATE INDEX "notifications_userNip_idx" ON "notifications"("userNip");

-- CreateIndex
CREATE INDEX "notifications_read_idx" ON "notifications"("read");

-- CreateIndex
CREATE INDEX "notifications_createdAt_idx" ON "notifications"("createdAt");

-- CreateIndex
CREATE INDEX "messages_threadId_idx" ON "messages"("threadId");

-- CreateIndex
CREATE INDEX "messages_senderNip_idx" ON "messages"("senderNip");

-- CreateIndex
CREATE INDEX "messages_recipientNip_idx" ON "messages"("recipientNip");

-- CreateIndex
CREATE INDEX "messages_createdAt_idx" ON "messages"("createdAt");

-- AddForeignKey
ALTER TABLE "enterprises" ADD CONSTRAINT "enterprises_ownerNip_fkey" FOREIGN KEY ("ownerNip") REFERENCES "users"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprises" ADD CONSTRAINT "enterprises_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenders" ADD CONSTRAINT "tenders_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "tenders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "startups" ADD CONSTRAINT "startups_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "startups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "solutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userNip_fkey" FOREIGN KEY ("userNip") REFERENCES "users"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investor_profiles" ADD CONSTRAINT "investor_profiles_userNip_fkey" FOREIGN KEY ("userNip") REFERENCES "users"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cohort_applications" ADD CONSTRAINT "cohort_applications_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "cohorts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cohort_applications" ADD CONSTRAINT "cohort_applications_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "startups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sectors" ADD CONSTRAINT "sectors_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "sectors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploadedByNip_fkey" FOREIGN KEY ("uploadedByNip") REFERENCES "users"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userNip_fkey" FOREIGN KEY ("userNip") REFERENCES "users"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderNip_fkey" FOREIGN KEY ("senderNip") REFERENCES "users"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_recipientNip_fkey" FOREIGN KEY ("recipientNip") REFERENCES "users"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;
