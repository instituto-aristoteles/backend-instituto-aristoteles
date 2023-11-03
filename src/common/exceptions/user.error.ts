import { ErrorBase } from '@/common/base/error.base';
import { HttpStatus } from '@nestjs/common';

export class UserError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, 'username_or_password_incorrect');
  }
}
