import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

type ResponseData = {
  statusCode: number;
  timestamp: string;
  path: string;
  messages: string | string[];
};

@Catch()
export class HttpExceptionFilterMiddleware implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const messages = isHttpException
      ? exception.getResponse()['message'] || exception.getResponse()
      : (exception as Error).message;

    const responseData: ResponseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      messages: messages,
    };

    this.logMessages(
      httpAdapter.getRequestMethod(ctx.getRequest()),
      responseData,
      exception,
    );

    httpAdapter.reply(ctx.getResponse(), responseData, status);
  }

  private logMessages(
    method: string,
    response: ResponseData,
    exception: unknown,
  ) {
    if (response.statusCode === 500) {
      Logger.error(
        `method: ${method} | statusCode: ${response.statusCode} | messages: ${response.messages}`,
        `End request for: ${response.path}`,
        response.statusCode >= 500 ? exception : '',
      );
    } else {
      Logger.warn(
        `method: ${method} | statusCode: ${response.statusCode} | messages: ${response.messages}`,
        `End request for: ${response.path}`,
        '',
      );
    }
  }
}
