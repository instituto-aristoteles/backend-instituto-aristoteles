import { SetMetadata } from '@nestjs/common';

export const UserStatusType = (...args: string[]) =>
  SetMetadata('status', args);
