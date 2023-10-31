import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { responseError } from './../utils/response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message = exception.message;
    if (Array.isArray((exception.getResponse() as any).message)) message = (exception.getResponse() as any).message[0];
    response.status(status).json(responseError(status, message));
  }
}
