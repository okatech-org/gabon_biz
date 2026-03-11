// GABON BIZ — NestJS Auth Guard (GABON ID)
// Protects routes by verifying the JWT access token

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyMockJwt, decodeJwtPayload } from '@gabon-biz/shared/src/auth/jwt-utils';
import type { GabonIdTokenPayload } from '@gabon-biz/shared/src/auth/types';

const JWT_SECRET = process.env.JWT_SECRET || 'gabon-id-mock-secret-dev-only';

@Injectable()
export class GabonIdAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if route is marked as public
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Token d'authentification manquant");
    }

    // Verify the token
    const payload = verifyMockJwt(token, JWT_SECRET);
    if (!payload) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }

    // Check role-based access if @Roles() is used
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (requiredRoles && requiredRoles.length > 0) {
      if (!requiredRoles.includes(payload.profileType)) {
        throw new UnauthorizedException(
          `Accès refusé. Rôle requis : ${requiredRoles.join(' ou ')}`,
        );
      }
    }

    // Attach user to request
    request.user = payload;
    return true;
  }

  private extractToken(request: any): string | null {
    // Try Authorization header first
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Try cookie
    const cookieToken = request.cookies?.['gabon-biz-session'];
    if (cookieToken) return cookieToken;

    return null;
  }
}
