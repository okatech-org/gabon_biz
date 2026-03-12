import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';
import { IndicatorService } from './indicator.service';

const Public = () => SetMetadata('isPublic', true);
const Roles = (...r: string[]) => SetMetadata('roles', r);

@ApiTags('Observatoire')
@Controller('indicateurs')
export class IndicatorController {
  constructor(private readonly indicatorService: IndicatorService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Créer un indicateur' })
  create(@Body() dto: any) {
    return this.indicatorService.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister les indicateurs' })
  findAll(@Query() query: any) {
    return this.indicatorService.findAll(query);
  }

  @Get('dashboard')
  @Public()
  @ApiOperation({ summary: 'Tableau de bord écosystème numérique' })
  getDashboard() {
    return this.indicatorService.getDashboard();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: "Détails d'un indicateur" })
  findOne(@Param('id') id: string) {
    return this.indicatorService.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Mettre à jour un indicateur' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.indicatorService.update(id, dto);
  }
}
