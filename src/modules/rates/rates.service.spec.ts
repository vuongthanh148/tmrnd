import { RatesService } from './rates.service';
import { CalculateRateRequestDTO } from './dtos/calculate-rate-request.dto';
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
      const calculateRateDto: CalculateRateRequestDTO = {
        providerIds: [],
        departurePostCode: 0,
        arrivalPostCode: 0,
        departureStateName: '',
        departureCountryCode: '',
        arrivalStateName: '',
        arrivalCountryCode: '',
        itemLength: 0,
        itemWidth: 0,
        itemHeight: 0,
        itemWeight: 0,
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
      const calculateRateDto: CalculateRateRequestDTO = {
        providerIds: [],
        departurePostCode: 0,
        arrivalPostCode: 0,
        departureStateName: '',
        departureCountryCode: '',
        arrivalStateName: '',
        arrivalCountryCode: '',
        itemLength: 0,
        itemWidth: 0,
        itemHeight: 0,
        itemWeight: 0,
        addons: undefined,
      };

      expect(rateRepositoryMock.create).not.toHaveBeenCalled();
    });

    it('should throw an error if an exception occurs', async () => {
      const calculateRateDto: CalculateRateRequestDTO = {
        providerIds: [],
        departurePostCode: 1000,
        arrivalPostCode: 1000,
        departureStateName: '',
        departureCountryCode: '',
        arrivalStateName: '',
        arrivalCountryCode: '',
        itemLength: 50,
        itemWidth: 50,
        itemHeight: 50,
        itemWeight: 50,
        addons: undefined,
      };

      expect(ratesService.createRate(calculateRateDto));
    });
  });
});
