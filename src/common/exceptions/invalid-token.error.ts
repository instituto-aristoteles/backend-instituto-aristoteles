import { ErrorBase } from '@/common/base/error.base';
import { HttpStatus } from '@nestjs/common';

export class InvalidTokenError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN, 'invalid_token');
  }
}
