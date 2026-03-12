import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { CohortModule } from './cohort/cohort.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CohortModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
