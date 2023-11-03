import { HttpStatus } from '@nestjs/common';
import { ErrorBase } from '@/common/base/error.base';

export class DatabaseError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'database_error');
  }
}
