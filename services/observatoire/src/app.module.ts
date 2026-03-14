import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { IndicatorModule } from './indicator/indicator.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TerminusModule, IndicatorModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
