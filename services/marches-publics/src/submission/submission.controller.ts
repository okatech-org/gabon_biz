// GABON BIZ — Submission Controller (M2)

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto, EvaluateSubmissionDto } from '../dto';

const Roles = (...roles: string[]) => SetMetadata('roles', roles);
const CurrentUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  return data ? user?.[data] : user;
});

@ApiTags('Soumissions')
@ApiBearerAuth()
@Controller('soumissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @Roles('ENTREPRENEUR')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Soumissionner à un marché' })
  submit(@Body() dto: CreateSubmissionDto, @CurrentUser('nip') userNip: string) {
    return this.submissionService.submit(dto, userNip);
  }

  @Get('mes-soumissions')
  @ApiOperation({ summary: 'Mes soumissions' })
  findMySubmissions(@CurrentUser('nip') userNip: string) {
    return this.submissionService.findMySubmissions(userNip);
  }

  @Get('marche/:tenderId')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Soumissions pour un marché (admin)' })
  @ApiParam({ name: 'tenderId' })
  findByTender(@Param('tenderId') tenderId: string) {
    return this.submissionService.findByTender(tenderId);
  }

  @Get(':id')
  @ApiOperation({ summary: "Détails d'une soumission" })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.submissionService.findOne(id);
  }

  @Patch(':id/evaluer')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Évaluer une soumission (admin)' })
  @ApiParam({ name: 'id' })
  evaluate(@Param('id') id: string, @Body() dto: EvaluateSubmissionDto) {
    return this.submissionService.evaluate(id, dto);
  }

  @Delete(':id/retirer')
  @Roles('ENTREPRENEUR')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Retirer ma soumission' })
  @ApiParam({ name: 'id' })
  withdraw(@Param('id') id: string, @CurrentUser('nip') userNip: string) {
    return this.submissionService.withdraw(id, userNip);
  }
}
