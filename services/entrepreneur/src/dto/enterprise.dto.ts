// GABON BIZ — Enterprise DTOs
// Data Transfer Objects for M1 (Guichet Unique Entrepreneur)

import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsInt,
  IsNumber,
  IsObject,
  IsNotEmpty,
  Length,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================
// Address DTO
// ============================================
export class AddressDto {
  @ApiProperty({ example: 'Libreville' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Akébé' })
  @IsString()
  @IsNotEmpty()
  quartier: string;

  @ApiProperty({ example: 'Estuaire' })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiPropertyOptional({ example: 'BP 1234' })
  @IsOptional()
  @IsString()
  bp?: string;
}

// ============================================
// Create Enterprise DTO
// ============================================
export enum LegalFormDto {
  EI = 'EI',
  SARL = 'SARL',
  SA = 'SA',
  SAS = 'SAS',
  SNC = 'SNC',
  SCS = 'SCS',
}

export class CreateEnterpriseDto {
  @ApiProperty({ example: 'Mbadinga Technologies SARL' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  name: string;

  @ApiProperty({ enum: LegalFormDto, example: 'SARL' })
  @IsEnum(LegalFormDto)
  legalForm: LegalFormDto;

  @ApiProperty({ example: 'uuid-du-secteur' })
  @IsString()
  @IsNotEmpty()
  sectorId: string;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsObject()
  address: AddressDto;

  @ApiPropertyOptional({
    example: 'Entreprise spécialisée dans le développement logiciel.',
  })
  @IsOptional()
  @IsString()
  @Length(10, 2000)
  description?: string;

  @ApiPropertyOptional({ example: 15 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50000)
  employeeCount?: number;

  @ApiPropertyOptional({ example: 85000000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  revenue?: number;
}

// ============================================
// Update Enterprise DTO
// ============================================
export class UpdateEnterpriseDto {
  @ApiPropertyOptional({ example: 'Mbadinga Tech Group' })
  @IsOptional()
  @IsString()
  @Length(2, 200)
  name?: string;

  @ApiPropertyOptional({ type: AddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @ApiPropertyOptional({ example: 'Nouvelle description.' })
  @IsOptional()
  @IsString()
  @Length(10, 2000)
  description?: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsInt()
  @Min(1)
  employeeCount?: number;

  @ApiPropertyOptional({ example: 120000000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  revenue?: number;
}

// ============================================
// Query Filter DTO
// ============================================
export class EnterpriseQueryDto {
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

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'uuid-du-secteur' })
  @IsOptional()
  @IsString()
  sectorId?: string;

  @ApiPropertyOptional({ example: 'SARL' })
  @IsOptional()
  @IsEnum(LegalFormDto)
  legalForm?: LegalFormDto;

  @ApiPropertyOptional({ example: 'Mbadinga' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ example: 'desc' })
  @IsOptional()
  @IsString()
  sortOrder?: string = 'desc';
}

// ============================================
// Change Status DTO
// ============================================
export class ChangeStatusDto {
  @ApiProperty({ enum: ['PENDING', 'ACTIVE', 'SUSPENDED', 'CLOSED'] })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiPropertyOptional({ example: 'Validation des documents complète.' })
  @IsOptional()
  @IsString()
  reason?: string;
}
