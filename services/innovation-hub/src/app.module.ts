import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { SolutionModule } from './solution/solution.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TerminusModule, SolutionModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
