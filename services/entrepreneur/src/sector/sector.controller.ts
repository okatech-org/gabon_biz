// GABON BIZ — Sector Controller
// CRUD for sectors (used across modules)

import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';

const Roles = (...roles: string[]) => SetMetadata('roles', roles);
const Public = () => SetMetadata('isPublic', true);

import { SectorService } from './sector.service';

// DTO
export class CreateSectorDto {
  @ApiProperty({ example: "Technologies de l'Information" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'uuid-parent' })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isFiliere?: boolean;
}

@ApiTags('Secteurs')
@Controller('secteurs')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer un secteur (admin)' })
  create(@Body() dto: CreateSectorDto) {
    return this.sectorService.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister tous les secteurs' })
  findAll() {
    return this.sectorService.findAll();
  }

  @Get('filieres')
  @Public()
  @ApiOperation({ summary: 'Lister les filières uniquement' })
  findFilieres() {
    return this.sectorService.findFilieres();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: "Détails d'un secteur" })
  findOne(@Param('id') id: string) {
    return this.sectorService.findOne(id);
  }
}
