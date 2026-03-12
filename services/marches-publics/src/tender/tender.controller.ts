// GABON BIZ — Tender Controller (M2)

import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';
import { TenderService } from './tender.service';
import { CreateTenderDto, UpdateTenderDto, TenderQueryDto, ChangeTenderStatusDto } from '../dto';

const Roles = (...roles: string[]) => SetMetadata('roles', roles);
const Public = () => SetMetadata('isPublic', true);

@ApiTags('Marchés Publics')
@Controller('marches')
export class TenderController {
  constructor(private readonly tenderService: TenderService) {}

  @Post()
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Créer un appel d'offres (admin)" })
  create(@Body() dto: CreateTenderDto) {
    return this.tenderService.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister les marchés publics (paginé)' })
  findAll(@Query() query: TenderQueryDto) {
    return this.tenderService.findAll(query);
  }

  @Get('ouverts')
  @Public()
  @ApiOperation({ summary: 'Marchés ouverts (deadline non dépassée)' })
  findOpen() {
    return this.tenderService.findOpen();
  }

  @Get('stats')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Statistiques des marchés publics' })
  getStats() {
    return this.tenderService.getStats();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: "Détails d'un marché" })
  @ApiParam({ name: 'id', description: 'UUID du marché' })
  findOne(@Param('id') id: string) {
    return this.tenderService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier un marché' })
  update(@Param('id') id: string, @Body() dto: UpdateTenderDto) {
    return this.tenderService.update(id, dto);
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Changer le statut (validation transitions)' })
  changeStatus(@Param('id') id: string, @Body() dto: ChangeTenderStatusDto) {
    return this.tenderService.changeStatus(id, dto);
  }
}
