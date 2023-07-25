import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { REDIS_SET_EXPIRED_TIME } from 'src/common/constant';
import { fileCommon } from 'src/common/file';
import { generateLog } from 'src/common/logs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private redisClient: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const cache = await this.redisClient.get(JSON.stringify(request.body));

    // if (!cache) {

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
        if (!cache) {
          console.log('cache miss');

          this.redisClient.set(
            JSON.stringify(request.body),
            JSON.stringify(response),
            'EX',
            REDIS_SET_EXPIRED_TIME,
          );
        }

        console.log('Response:', response);
      }),
    );
    // }
  }
}
