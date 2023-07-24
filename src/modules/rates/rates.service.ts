import { Injectable } from '@nestjs/common';
import { RateRepository } from './rates.repository';
import { CalculateRateDto } from './dtos/calculate-rate.dto';
import { ProvidersService } from '../providers/providers.service';
import { Provider } from '../providers/providers.entity';
import { CityLink } from './common/city-link';
import { ModuleRef } from '@nestjs/core';
import { JT } from './common/jt';

const services = {
  CityLink,
  JT,
};

@Injectable()
export class RatesService {
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly providersService: ProvidersService,
    private readonly moduleRef: ModuleRef,
  ) {}

  public async createRate(rate: CalculateRateDto) {
    try {
      this.rateRepository.create(rate);
      const { providerIds } = rate;
      const providers = await Promise.all(
        providerIds.map((providerId: number) =>
          this.providersService.getProviderById(providerId),
        ),
      );

      const data = await Promise.all(
        providers.map((provider: Provider) => {
          const service = this.moduleRef.get(services[provider.code]);

          return service.transformResp(rate, provider.url, provider.code);
        }),
      );

      return {
        data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
