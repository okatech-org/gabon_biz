// GABON BIZ — NestJS Auth Decorators

import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { GabonIdTokenPayload } from '../types';

// @Roles('ADMIN', 'ENTREPRENEUR') — restrict access to specific roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// @Public() — mark a route as publicly accessible (no auth required)
export const Public = () => SetMetadata('isPublic', true);

// @CurrentUser() — inject the authenticated user into the handler
export const CurrentUser = createParamDecorator(
  (data: keyof GabonIdTokenPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as GabonIdTokenPayload;

    if (!user) return null;
    return data ? user[data] : user;
  },
);
