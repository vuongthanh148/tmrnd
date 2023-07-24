import { Module } from '@nestjs/common';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { ProvidersModule } from '../providers/providers.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './rates.entity';
import { RateRepository } from './rates.repository';
import { CityLink } from 'src/modules/rates/common/city-link';
import { JT } from 'src/modules/rates/common/jt';

@Module({
  imports: [TypeOrmModule.forFeature([Rate]), ProvidersModule, HttpModule],
  controllers: [RatesController],
  providers: [
    RatesService,
    RateRepository,
    CityLink,
    JT,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class RatesModule {}
