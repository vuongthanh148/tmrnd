import { Injectable } from '@nestjs/common';
import { RateRepository } from './rates.repository';
import { CalculateRateRequestDTO } from './dtos/calculate-rate-request.dto';
import { ProvidersService } from '../providers/providers.service';
import { Provider } from '../providers/providers.entity';
import { ShippingServiceInterface } from '../shipping-service/interfaces/shipping-service.interface';
import { ShippingServiceFactory } from '../shipping-service/shipping-service.factory';

@Injectable()
export class RatesService {
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly providersService: ProvidersService,
    private readonly shippingServiceFactory: ShippingServiceFactory,
  ) {}

  public async createRate(rate: CalculateRateRequestDTO) {
    try {
      const rateEntity = new CalculateRateRequestDTO(rate);
      console.log({ rateEntity });
      this.rateRepository.create(rateEntity);
      const { providerIds } = rate;
      const providers = await Promise.all(
        providerIds.map((providerId: number) =>
          this.providersService.getProviderById(providerId),
        ),
      );

      const data = await Promise.all(
        providers.map((provider: Provider) => {
          const service: ShippingServiceInterface =
            this.shippingServiceFactory.getShippingService(provider.code);

          return service.calculateRate(rate, provider.url, provider.code);
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
