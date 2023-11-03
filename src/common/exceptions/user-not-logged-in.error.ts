import { HttpStatus } from '@nestjs/common';
import { ErrorBase } from '@/common/base/error.base';

export class UserNotLoggedInError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, 'user_not_logged_in');
  }
}
