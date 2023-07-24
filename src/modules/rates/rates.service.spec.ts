import { RatesService } from './rates.service';
import { CalculateRateDto } from './dtos/calculate-rate.dto';
import { ProvidersService } from '../providers/providers.service';
import { Provider } from '../providers/providers.entity';
import { ModuleRef } from '@nestjs/core';
import { RateRepository } from './rates.repository';

describe('RatesService', () => {
  let ratesService: RatesService;
  let rateRepositoryMock: RateRepository;
  let providersServiceMock: ProvidersService;
  let moduleRefMock: ModuleRef;

  beforeEach(() => {
    rateRepositoryMock = {
      create: jest.fn(),
    } as any;

    providersServiceMock = {
      getProviderById: jest.fn(),
    } as any;

    moduleRefMock = {
      get: jest.fn(),
    } as any;

    ratesService = new RatesService(
      rateRepositoryMock,
      providersServiceMock,
      moduleRefMock,
    );
  });

  describe('createRateCalculation', () => {
    it('should get rate calculation and return data', async () => {
      const calculateRateDto: CalculateRateDto = {
        providerIds: [],
        departure_post_code: 0,
        arrival_post_code: 0,
        departure_state_name: '',
        departure_country_code: '',
        arrival_state_name: '',
        arrival_country_code: '',
        item_length: 0,
        item_width: 0,
        item_height: 0,
        item_weight: 0,
        addons: undefined,
      };

      const providerIds = [];
      const providers: Provider[] = [];
      const transformedData = {};

      (providersServiceMock.getProviderById as jest.Mock).mockResolvedValueOnce(
        providers[0],
      );
      (moduleRefMock.get as jest.Mock).mockReturnValueOnce({
        transformResp: jest.fn().mockResolvedValueOnce(transformedData),
      });

      const result = await ratesService.createRate(calculateRateDto);
      expect(rateRepositoryMock.create).toHaveBeenCalledWith(calculateRateDto);
    });

    it('should return data from cache if available', async () => {
      const calculateRateDto: CalculateRateDto = {
        providerIds: [],
        departure_post_code: 0,
        arrival_post_code: 0,
        departure_state_name: '',
        departure_country_code: '',
        arrival_state_name: '',
        arrival_country_code: '',
        item_length: 0,
        item_width: 0,
        item_height: 0,
        item_weight: 0,
        addons: undefined,
      };

      expect(rateRepositoryMock.create).not.toHaveBeenCalled();
    });

    it('should throw an error if an exception occurs', async () => {
      const calculateRateDto: CalculateRateDto = {
        providerIds: [],
        departure_post_code: 1000,
        arrival_post_code: 1000,
        departure_state_name: '',
        departure_country_code: '',
        arrival_state_name: '',
        arrival_country_code: '',
        item_length: 50,
        item_width: 50,
        item_height: 50,
        item_weight: 50,
        addons: undefined,
      };

      expect(ratesService.createRate(calculateRateDto));
    });
  });
});
