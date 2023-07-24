import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/exceptions/exception';
import { ConfigModule } from '@nestjs/config';
import { SuppliersModule } from './modules/suppliers/providers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LoggerModule } from 'nestjs-pino';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TransactionsController } from './modules/transactions/transactions.controller';
import { CacheMiddleware } from './middleware/cache.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/envs/development.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
      },
    }),
    LoggerModule.forRoot(),
    SuppliersModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TransactionsController);
    consumer.apply(CacheMiddleware).forRoutes(TransactionsController);
  }
}
