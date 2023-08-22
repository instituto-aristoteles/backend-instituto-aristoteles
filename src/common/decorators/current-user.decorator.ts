import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthRequest } from '../../modules/auth/application/models/auth-request';
import { UserTokenWithRefresh } from '../../modules/auth/application/models/user-token-with-refresh';

export const CurrentUser = createParamDecorator(
  (
    data: keyof UserTokenWithRefresh | undefined,
    context: ExecutionContext,
  ): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    if (!data) return request.user;

    return request.user[data];
  },
);
