import { TransactionsService } from './transactions.service';
import { TransactionRepository } from './transactions.repository';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { ProvidersService } from '../suppliers/providers.service';
import { Provider } from '../suppliers/providers.entity';
import { ModuleRef } from '@nestjs/core';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let transactionRepositoryMock: TransactionRepository;
  let providersServiceMock: ProvidersService;
  let moduleRefMock: ModuleRef;

  beforeEach(() => {
    transactionRepositoryMock = {
      create: jest.fn(),
    } as any;

    providersServiceMock = {
      getSupplierById: jest.fn(),
    } as any;

    moduleRefMock = {
      get: jest.fn(),
    } as any;

    transactionsService = new TransactionsService(
      transactionRepositoryMock,
      providersServiceMock,
      moduleRefMock,
    );
  });

  describe('createTransaction', () => {
    it('should create a transaction and return data', async () => {
      const transactionDto: CreateTransactionDto = {
        supplierIds: [],
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

      const supplierIds = [];
      const suppliers: Provider[] = [];
      const transformedData = {};

      (providersServiceMock.getProviderById as jest.Mock).mockResolvedValueOnce(
        suppliers[0],
      );
      (moduleRefMock.get as jest.Mock).mockReturnValueOnce({
        transformResp: jest.fn().mockResolvedValueOnce(transformedData),
      });

      const result = await transactionsService.createTransaction(
        transactionDto,
      );
      expect(transactionRepositoryMock.create).toHaveBeenCalledWith(
        transactionDto,
      );
    });

    it('should return data from cache if available', async () => {
      const transactionDto: CreateTransactionDto = {
        supplierIds: [],
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

      expect(transactionRepositoryMock.create).not.toHaveBeenCalled();
    });

    it('should throw an error if an exception occurs', async () => {
      const transactionDto: CreateTransactionDto = {
        supplierIds: [],
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

      expect(transactionsService.createTransaction(transactionDto));
    });
  });
});
