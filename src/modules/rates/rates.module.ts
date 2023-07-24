import { Module } from '@nestjs/common';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { ProvidersModule } from '../providers/providers.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './rates.entity';
import { RateRepository } from './rates.repository';
import { ShippingServiceModule } from '../shipping-service/shipping-service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rate]), ProvidersModule, HttpModule, ShippingServiceModule],
  controllers: [RatesController],
  providers: [
    RatesService,
    RateRepository,
  ],
})
export class RatesModule { }
