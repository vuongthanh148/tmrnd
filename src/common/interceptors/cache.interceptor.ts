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

@Injectable()
export class CacheInterceptor implements NestInterceptor {
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

    return next.handle().pipe(
      tap((response) => {
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
  }
}
