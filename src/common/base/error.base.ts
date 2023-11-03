import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorTypes } from '@/common/exceptions/enums/error.types';

export class ErrorBase extends HttpException {
  type: string;
  constructor(message: string, status: HttpStatus, type?: ErrorTypes) {
    super(message, status);
    this.type = type;
  }
}
