import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
// import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class CachesService {
  private redisClient: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async get(key: string): Promise<any> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: any, expiresIn: number): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', expiresIn);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
