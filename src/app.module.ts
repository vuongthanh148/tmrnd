import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exceptions/exception';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesModule } from './modules/rates/rates.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LoggerModule } from 'nestjs-pino';
import { RatesController } from './modules/rates/rates.controller';
import globalConfig from './config/global.config';
import databaseConfig from './database/database.config';
import { ProvidersModule } from './modules/providers/providers.module';
import { CacheMiddleware } from './common/middlewares/cache.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CityLinkModule } from './modules/shipping-service/city-link/city-link.module';
import { JtModule } from './modules/shipping-service/jt/jt.module';
import { ShippingServiceModule } from './modules/shipping-service/shipping-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${process.cwd()}/src/config/env/development.env`,
      ],
      load: [globalConfig, databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('postgres'),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: configService.get('redis'),
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot(),
    ProvidersModule,
    RatesModule,
    ShippingServiceModule
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
    consumer.apply(LoggerMiddleware).forRoutes(RatesController);
    consumer.apply(CacheMiddleware).forRoutes(RatesController);
  }
}
