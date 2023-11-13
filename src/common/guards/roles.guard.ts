import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES_KEY } from '@/common/decorators/user-role.decorator';
import { UserRole } from '@/domain/enums/user-role';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from '@/modules/auth/application/models/auth-request';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<AuthRequest>();
    return requiredRoles.some((role) => user?.role.includes(role));
  }
}
