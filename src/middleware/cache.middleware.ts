import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Redis } from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  private redisClient: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const cache = await this.redisClient.get(JSON.stringify(req.body));

    if (cache) {
      console.log('cache hit');
      return res.json(JSON.parse(cache));
    }
    next();
  }
}
