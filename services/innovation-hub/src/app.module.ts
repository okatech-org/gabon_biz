import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { SolutionModule } from './solution/solution.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SolutionModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
