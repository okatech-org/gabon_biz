// GABON BIZ — Marchés Publics DTOs
// Data Transfer Objects for M2 (Tender + Submission)

import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  Length,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================
// Create Tender DTO
// ============================================
export class CreateTenderDto {
  @ApiProperty({ example: 'Développement du SI de gestion des marchés publics' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  title: string;

  @ApiProperty({ example: "Description complète de l'appel d'offres..." })
  @IsString()
  @IsNotEmpty()
  @Length(50, 10000)
  description: string;

  @ApiProperty({ example: 'MENUDI — Direction Générale des Marchés Publics' })
  @IsString()
  @IsNotEmpty()
  issuingAuthority: string;

  @ApiProperty({ example: 'uuid-du-secteur' })
  @IsString()
  @IsNotEmpty()
  sectorId: string;

  @ApiPropertyOptional({ example: 500000000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  budgetMin?: number;

  @ApiPropertyOptional({ example: 1200000000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  budgetMax?: number;

  @ApiProperty({ example: '2026-06-30T00:00:00Z' })
  @IsDateString()
  submissionDeadline: string;

  @ApiPropertyOptional({ example: '2026-07-05T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  openingDate?: string;
}

// ============================================
// Update Tender DTO
// ============================================
export class UpdateTenderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(10, 500)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(50, 10000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  budgetMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  budgetMax?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  submissionDeadline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  openingDate?: string;
}

// ============================================
// Tender Query DTO
// ============================================
export class TenderQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ example: 'PUBLISHED' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sectorId?: string;

  @ApiPropertyOptional({ example: 'numérique' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'submissionDeadline' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ example: 'desc' })
  @IsOptional()
  @IsString()
  sortOrder?: string = 'desc';
}

// ============================================
// Create Submission DTO
// ============================================
export class CreateSubmissionDto {
  @ApiProperty({ example: 'uuid-du-tender' })
  @IsString()
  @IsNotEmpty()
  tenderId: string;

  @ApiProperty({ example: 'uuid-de-l-entreprise' })
  @IsString()
  @IsNotEmpty()
  enterpriseId: string;

  @ApiPropertyOptional({ example: 750000000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  proposedAmount?: number;

  @ApiPropertyOptional({ example: 'Notre proposition technique...' })
  @IsOptional()
  @IsString()
  @Length(20, 10000)
  technicalNote?: string;
}

// ============================================
// Evaluate Submission DTO (admin)
// ============================================
export class EvaluateSubmissionDto {
  @ApiProperty({ enum: ['UNDER_REVIEW', 'ACCEPTED', 'REJECTED'] })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional({ example: 85 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  score?: number;

  @ApiPropertyOptional({ example: 'Proposition technique solide, prix compétitif.' })
  @IsOptional()
  @IsString()
  evaluationNote?: string;
}

// ============================================
// Change Tender Status DTO
// ============================================
export class ChangeTenderStatusDto {
  @ApiProperty({ enum: ['DRAFT', 'PUBLISHED', 'CLOSED', 'AWARDED', 'CANCELLED'] })
  @IsString()
  @IsNotEmpty()
  status: string;
}
