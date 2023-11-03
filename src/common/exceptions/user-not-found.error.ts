import { ErrorBase } from '@/common/base/error.base';
import { HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND, 'user_not_found');
  }
}
