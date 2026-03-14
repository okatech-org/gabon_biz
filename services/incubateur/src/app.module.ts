import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { CohortModule } from './cohort/cohort.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TerminusModule, CohortModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
