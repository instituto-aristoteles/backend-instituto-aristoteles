import { HttpStatus } from '@nestjs/common';
import { ErrorBase } from '@/common/base/error.base';

export class DuplicatedKeyError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT, 'duplicated_key');
  }
}
