import { Module } from '@nestjs/common';
import { SolutionController } from './solution.controller';
import { SolutionService, RatingService } from './solution.service';

@Module({
  controllers: [SolutionController],
  providers: [SolutionService, RatingService],
})
export class SolutionModule {}
