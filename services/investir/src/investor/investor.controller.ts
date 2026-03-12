import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InvestorService } from './investor.service';

const Public = () => SetMetadata('isPublic', true);
const Roles = (...r: string[]) => SetMetadata('roles', r);
const CurrentUser = createParamDecorator((d: string | undefined, ctx: ExecutionContext) => {
  const u = ctx.switchToHttp().getRequest().user;
  return d ? u?.[d] : u;
});

@ApiTags('Investisseurs')
@Controller('investisseurs')
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Post('profil')
  @Roles('INVESTOR')
  @ApiOperation({ summary: 'Créer/MAJ mon profil investisseur' })
  createProfile(@CurrentUser('nip') nip: string, @Body() dto: any) {
    return this.investorService.createProfile(nip, dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lister les investisseurs' })
  findAll(@Query() query: any) {
    return this.investorService.findAll(query);
  }

  @Get('stats')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Statistiques investisseurs' })
  getStats() {
    return this.investorService.getStats();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Profil investisseur' })
  findOne(@Param('id') id: string) {
    return this.investorService.findOne(id);
  }

  @Get(':id/matching')
  @Roles('INVESTOR')
  @ApiOperation({ summary: 'Startups correspondantes' })
  match(@Param('id') id: string) {
    return this.investorService.matchStartups(id);
  }
}
