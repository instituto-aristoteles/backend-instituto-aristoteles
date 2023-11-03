import { HttpStatus } from '@nestjs/common';
import { ErrorBase } from '@/common/base/error.base';

export class CategoryNotFoundError extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND, 'category_not_found');
  }
}
