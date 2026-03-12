import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CohortService } from './cohort.service';

const Public = () => SetMetadata('isPublic', true);
const Roles = (...r: string[]) => SetMetadata('roles', r);
const CurrentUser = createParamDecorator((d: string | undefined, ctx: ExecutionContext) => {
  const u = ctx.switchToHttp().getRequest().user;
  return d ? u?.[d] : u;
});

@ApiTags('Cohortes')
@Controller('cohortes')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Créer une cohorte' })
  create(@Body() dto: any) {
    return this.cohortService.create(dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister les cohortes' })
  findAll(@Query() query: any) {
    return this.cohortService.findAll(query);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: "Détails d'une cohorte" })
  findOne(@Param('id') id: string) {
    return this.cohortService.findOne(id);
  }

  @Post(':id/postuler')
  @Roles('STARTUP')
  @ApiOperation({ summary: 'Postuler à une cohorte' })
  apply(@Param('id') id: string, @CurrentUser('startupId') startupId: string) {
    return this.cohortService.apply(id, startupId);
  }

  @Patch('applications/:id/evaluer')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Évaluer une candidature' })
  evaluate(@Param('id') id: string, @Body() body: { status: string; notes?: string }) {
    return this.cohortService.evaluateApplication(id, body.status, body.notes);
  }
}
