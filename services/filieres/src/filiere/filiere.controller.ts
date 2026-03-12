import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';
import { FiliereService } from './filiere.service';

const Public = () => SetMetadata('isPublic', true);
const Roles = (...r: string[]) => SetMetadata('roles', r);

@ApiTags('Filières')
@Controller('filieres')
export class FiliereController {
  constructor(private readonly filiereService: FiliereService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister les filières sectorielles' })
  findAll() {
    return this.filiereService.findAll();
  }

  @Get('stats')
  @Public()
  @ApiOperation({ summary: 'Statistiques par filière' })
  getStats() {
    return this.filiereService.getStats();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: "Détails d'une filière (entreprises + marchés)" })
  findOne(@Param('id') id: string) {
    return this.filiereService.findOne(id);
  }
}
