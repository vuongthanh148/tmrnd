import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { fileCommon } from 'src/common/file';
import { generateLog } from '../logs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log('error', exception);
    console.log('error ', exception['message']);

    const logs = generateLog(ctx.getRequest(), {
      label: 'Errorr logging',
      metadata: exception['message'],
    });
    fileCommon.writeLogToFile(`gateway-date-${new Date().getDate()}.log`, logs);

    let customResponse;

    if (exception instanceof HttpException) {
      const baseResponse = exception.getResponse();
      if (baseResponse instanceof Object) {
        customResponse = {
          success: false,
          ...baseResponse,
        };
      }
    }
    httpAdapter.reply(ctx.getResponse(), customResponse, httpStatus);
  }
}
