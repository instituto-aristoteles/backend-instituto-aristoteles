import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from '@/modules/auth/application/models/auth-request';

@Injectable()
export class UserStatusGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const status = this.reflector.getAllAndOverride<string[]>('status', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!status) return true;

    const request = context.switchToHttp().getRequest<AuthRequest>();
    if (!status.some((value) => request.user.status === value))
      throw new ForbiddenException(
        'Only users with `unconfirmed` status can use this endpoint.',
      );

    return true;
  }
}
