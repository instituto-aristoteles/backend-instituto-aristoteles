import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface IError {
  message: string | string[];
  statusCode: number;
}

@Catch()
export class HttpExceptionFilterMiddleware implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const isHttpException = exception instanceof HttpException;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const messages = isHttpException
      ? (exception.getResponse() as IError)
      : { message: (exception as Error).message, statusCode: null };

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      ...messages,
    };

    this.logMessages(request, messages, status, exception);

    response.status(status).json(responseData);
  }

  private logMessages(
    request: Request,
    message: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      Logger.error(
        `End request for: ${request.path}`,
        `method: ${request.method} | statusCode: ${
          message.statusCode ? message.statusCode : null
        } | message: ${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      Logger.warn(
        `End request for: ${request.path}`,
        `method: ${request.method} | statusCode: ${
          message.statusCode ? message.statusCode : null
        } | message: ${message.message ? message.message : null}`,
      );
    }
  }
}
