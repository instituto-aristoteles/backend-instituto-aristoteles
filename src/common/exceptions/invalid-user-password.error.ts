import { ErrorBase } from '@/common/base/error.base';
import { HttpStatus } from '@nestjs/common';

export class InvalidUserPasswordError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, 'incorrect_password');
  }
}
