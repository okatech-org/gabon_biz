// GABON BIZ — NestJS Auth Module
// Drop-in module for any microservice to enable GABON ID authentication

import { Module, Global } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GabonIdAuthGuard } from './gabon-id.guard';

@Global()
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: GabonIdAuthGuard,
    },
  ],
  exports: [],
})
export class GabonIdAuthModule {}

// Re-export everything for easy importing
export { GabonIdAuthGuard } from './gabon-id.guard';
export { Roles, Public, CurrentUser } from './decorators';
