// GABON BIZ - Shared Types, DTOs & Utilities

// Auth module
export * from './auth';
export * from './services';

// ============================================
// ENUMS
// ============================================

export enum ProfileType {
  ENTREPRENEUR = 'ENTREPRENEUR',
  INVESTOR = 'INVESTOR',
  STARTUP = 'STARTUP',
  ADMIN = 'ADMIN',
  PUBLIC = 'PUBLIC',
}

export enum LegalForm {
  EI = 'EI',
  SARL = 'SARL',
  SA = 'SA',
  SAS = 'SAS',
  SNC = 'SNC',
  SCS = 'SCS',
}

export enum EnterpriseStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

export enum TenderStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  AWARDED = 'AWARDED',
  CANCELLED = 'CANCELLED',
}

export enum SubmissionStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  AWARDED = 'AWARDED',
  REJECTED = 'REJECTED',
}

export enum FundingStage {
  PRE_SEED = 'PRE_SEED',
  SEED = 'SEED',
  SERIES_A = 'SERIES_A',
  SERIES_B = 'SERIES_B',
  GROWTH = 'GROWTH',
}

export enum PricingModel {
  FREE = 'FREE',
  FREEMIUM = 'FREEMIUM',
  PAID = 'PAID',
  CUSTOM = 'CUSTOM',
}

export enum SolutionStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum InvestorType {
  ANGEL = 'ANGEL',
  VC = 'VC',
  CORPORATE = 'CORPORATE',
  INSTITUTIONAL = 'INSTITUTIONAL',
  DFI = 'DFI',
}

export enum CohortStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum IndicatorCategory {
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  SKILLS = 'SKILLS',
  INNOVATION = 'INNOVATION',
  POLICY = 'POLICY',
  INCLUSION = 'INCLUSION',
}

// ============================================
// INTERFACES
// ============================================

export interface User {
  nip: string; // 14 characters, primary key from GABON ID
  profileType: ProfileType;
  email: string;
  phone?: string;
  fullName: string;
  preferredLanguage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enterprise {
  id: string;
  rccm: string;
  nif: string;
  ownerNip: string;
  name: string;
  legalForm: LegalForm;
  sectorId: string;
  status: EnterpriseStatus;
  address: Record<string, unknown>;
  description?: string;
  employeeCount?: number;
  revenue?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tender {
  id: string;
  reference: string;
  title: string;
  description: string;
  issuingAuthority: string;
  sectorId: string;
  budgetMin: number;
  budgetMax: number;
  submissionDeadline: Date;
  openingDate?: Date;
  status: TenderStatus;
  createdAt: Date;
}

export interface Submission {
  id: string;
  tenderId: string;
  enterpriseId: string;
  submittedAt: Date;
  signatureHash: string;
  score?: number;
  status: SubmissionStatus;
}

export interface Startup {
  id: string;
  enterpriseId: string;
  pitch: string;
  teamSize: number;
  fundingStage: FundingStage;
  metrics: Record<string, unknown>;
  website?: string;
}

export interface Solution {
  id: string;
  startupId: string;
  name: string;
  description: string;
  categoryId: string;
  pricingModel: PricingModel;
  status: SolutionStatus;
  averageRating?: number;
}

export interface Indicator {
  id: string;
  name: string;
  source: string;
  category: IndicatorCategory;
  value: number;
  unit: string;
  period: string;
  countryCode: string;
  updatedAt: Date;
}

export interface Sector {
  id: string;
  name: string;
  parentId?: string;
  isFiliere: boolean;
}

// ============================================
// CONSTANTS
// ============================================

export const GABON_BIZ_COLORS = {
  primary: '#E67E22',
  primaryDark: '#D35400',
  primaryLight: '#F39C12',
  secondary: '#2C3E50',
  success: '#27AE60',
  warning: '#F1C40F',
  danger: '#E74C3C',
  info: '#3498DB',
} as const;

export const NIP_LENGTH = 14;

export const API_VERSION = 'v1';

// ============================================
// UTILITIES
// ============================================

export function validateNip(nip: string): boolean {
  return typeof nip === 'string' && nip.length === NIP_LENGTH;
}

export function formatRccm(rccm: string): string {
  return rccm.toUpperCase().trim();
}
