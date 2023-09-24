import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilterMiddleware implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const isHttpException = exception instanceof HttpException;
    const message = (exception as HttpException).getResponse()['message']
      ? (exception as HttpException).getResponse()['message']
      : (exception as HttpException).getResponse();

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const messages = isHttpException ? message : (exception as Error).message;

    const responseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      messages: messages,
    };

    this.logMessages(request, messages, status, exception);

    response.status(status).json(responseData);
  }

  private logMessages(
    request: Request,
    message: string | object,
    status: number,
    exception: HttpException,
  ) {
    if (status === 500) {
      Logger.error(
        `End request for: ${request.path}`,
        `method: ${request.method} | statusCode: ${status} | message: ${message}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      Logger.warn(
        `End request for: ${request.path}`,
        `method: ${request.method} | statusCode: ${status} | message: ${message}`,
      );
    }
  }
}
