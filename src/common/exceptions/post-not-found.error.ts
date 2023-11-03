import { ErrorBase } from '@/common/base/error.base';
import { HttpStatus } from '@nestjs/common';

export class PostNotFoundError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND, 'post_not_found');
  }
}
