import { HttpStatus } from '@nestjs/common';
import { ErrorBase } from '@/common/base/error.base';
import { ErrorTypes } from '@/common/exceptions/enums/error.types';

export class UnprocessableEntityError extends ErrorBase {
  constructor(message: string, type?: ErrorTypes) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, type);
  }
}
