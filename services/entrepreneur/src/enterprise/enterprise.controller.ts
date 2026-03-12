// GABON BIZ — Enterprise Controller (M1 — Guichet Unique)
// REST API endpoints for enterprise management

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { EnterpriseService } from './enterprise.service';
import {
  CreateEnterpriseDto,
  UpdateEnterpriseDto,
  EnterpriseQueryDto,
  ChangeStatusDto,
} from '../dto';

// Decorators (inline since shared package may not resolve in all environments)
import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
const Roles = (...roles: string[]) => SetMetadata('roles', roles);
const Public = () => SetMetadata('isPublic', true);
const CurrentUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user?.[data] : user;
});

@ApiTags('Entreprises')
@ApiBearerAuth()
@Controller('entreprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  // ==========================================
  // POST /entreprises — Créer une entreprise
  // ==========================================
  @Post()
  @Roles('ENTREPRENEUR', 'ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer une nouvelle entreprise' })
  @ApiResponse({ status: 201, description: 'Entreprise créée avec RCCM et NIF générés.' })
  @ApiResponse({ status: 409, description: 'Entreprise avec ce nom existe déjà.' })
  create(@Body() dto: CreateEnterpriseDto, @CurrentUser('nip') userNip: string) {
    return this.enterpriseService.create(dto, userNip);
  }

  // ==========================================
  // GET /entreprises — Lister toutes les entreprises
  // ==========================================
  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister les entreprises (paginé, filtré)' })
  @ApiResponse({ status: 200, description: 'Liste paginée avec métadonnées.' })
  findAll(@Query() query: EnterpriseQueryDto) {
    return this.enterpriseService.findAll(query);
  }

  // ==========================================
  // GET /entreprises/stats — Statistiques
  // ==========================================
  @Get('stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Statistiques des entreprises (admin)' })
  getStats() {
    return this.enterpriseService.getStats();
  }

  // ==========================================
  // GET /entreprises/mes-entreprises — Mes entreprises
  // ==========================================
  @Get('mes-entreprises')
  @ApiOperation({ summary: 'Lister mes entreprises' })
  findMyEnterprises(@CurrentUser('nip') userNip: string) {
    return this.enterpriseService.findByOwner(userNip);
  }

  // ==========================================
  // GET /entreprises/:id — Détails d'une entreprise
  // ==========================================
  @Get(':id')
  @Public()
  @ApiOperation({ summary: "Détails d'une entreprise" })
  @ApiParam({ name: 'id', description: "UUID de l'entreprise" })
  @ApiResponse({ status: 200, description: "Détails complets de l'entreprise." })
  @ApiResponse({ status: 404, description: 'Entreprise introuvable.' })
  findOne(@Param('id') id: string) {
    return this.enterpriseService.findOne(id);
  }

  // ==========================================
  // PUT /entreprises/:id — Mettre à jour
  // ==========================================
  @Put(':id')
  @Roles('ENTREPRENEUR', 'ADMIN')
  @ApiOperation({ summary: 'Mettre à jour une entreprise' })
  @ApiParam({ name: 'id', description: "UUID de l'entreprise" })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEnterpriseDto,
    @CurrentUser('nip') userNip: string,
  ) {
    return this.enterpriseService.update(id, dto, userNip);
  }

  // ==========================================
  // PATCH /entreprises/:id/status — Changer le statut
  // ==========================================
  @Patch(':id/status')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Changer le statut (admin uniquement)' })
  @ApiParam({ name: 'id', description: "UUID de l'entreprise" })
  changeStatus(@Param('id') id: string, @Body() dto: ChangeStatusDto) {
    return this.enterpriseService.changeStatus(id, dto);
  }

  // ==========================================
  // DELETE /entreprises/:id — Fermer (soft delete)
  // ==========================================
  @Delete(':id')
  @Roles('ENTREPRENEUR', 'ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Fermer une entreprise (soft delete)' })
  @ApiParam({ name: 'id', description: "UUID de l'entreprise" })
  remove(@Param('id') id: string, @CurrentUser('nip') userNip: string) {
    return this.enterpriseService.remove(id, userNip);
  }
}
