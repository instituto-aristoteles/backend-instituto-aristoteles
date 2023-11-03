import { ErrorBase } from '@/common/base/error.base';
import { HttpStatus } from '@nestjs/common';

export class TokenExpiredError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN, 'token_expired');
  }
}
