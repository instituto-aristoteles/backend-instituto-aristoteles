import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '@/modules/auth/application/models/auth-request';
import { UserTokenWithRefresh } from '@/modules/auth/application/models/user-token-with-refresh';
import { UserEntity } from '@/domain/entities/user.entity';

type User = keyof UserTokenWithRefresh | undefined;

export const CurrentUser = createParamDecorator(
  (data: User, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return data ? request.user?.[data] : request.user;
  },
);
