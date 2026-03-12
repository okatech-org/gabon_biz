// GABON BIZ — M3 Innovation Hub Controller

import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SolutionService, RatingService } from './solution.service';

const Public = () => SetMetadata('isPublic', true);
const Roles = (...r: string[]) => SetMetadata('roles', r);
const CurrentUser = createParamDecorator((d: string | undefined, ctx: ExecutionContext) => {
  const u = ctx.switchToHttp().getRequest().user;
  return d ? u?.[d] : u;
});

@ApiTags('Solutions')
@Controller('solutions')
export class SolutionController {
  constructor(
    private readonly solutionService: SolutionService,
    private readonly ratingService: RatingService,
  ) {}

  @Post()
  @Roles('STARTUP', 'ADMIN')
  @ApiOperation({ summary: 'Publier une solution' })
  create(@Body() dto: any, @CurrentUser('startupId') startupId: string) {
    return this.solutionService.create(dto, startupId);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister les solutions (paginé)' })
  findAll(@Query() query: any) {
    return this.solutionService.findAll(query);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: "Détails d'une solution" })
  findOne(@Param('id') id: string) {
    return this.solutionService.findOne(id);
  }

  @Put(':id')
  @Roles('STARTUP', 'ADMIN')
  @ApiOperation({ summary: 'Modifier une solution' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.solutionService.update(id, dto);
  }

  @Post(':id/rate')
  @ApiOperation({ summary: 'Noter une solution' })
  rate(
    @Param('id') id: string,
    @Body() body: { score: number; comment?: string },
    @CurrentUser('nip') nip: string,
  ) {
    return this.ratingService.rate(id, nip, body.score, body.comment);
  }

  @Get(':id/ratings')
  @Public()
  @ApiOperation({ summary: 'Voir les évaluations' })
  getRatings(@Param('id') id: string) {
    return this.ratingService.findBySolution(id);
  }
}
