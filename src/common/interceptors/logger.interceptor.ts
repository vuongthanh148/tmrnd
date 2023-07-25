import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fileCommon } from 'src/common/file';
import { generateLog } from 'src/common/logs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap((response) => {
        const logs = generateLog(request, {
          label: 'gateway',
          bodyPayload: response,
        });
        fileCommon.writeLogToFile(
          `gateway-date-${new Date().getDate()}.log`,
          logs,
        );
      }),
    );
  }
}
