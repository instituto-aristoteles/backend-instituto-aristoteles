import { HttpStatus } from '@nestjs/common';
import { ErrorBase } from '@/common/base/error.base';
import { ErrorTypes } from '@/common/exceptions/enums/error.types';

export class BadRequestError extends ErrorBase {
  constructor(message: string, type?: ErrorTypes) {
    super(message, HttpStatus.BAD_REQUEST, type);
  }
}
