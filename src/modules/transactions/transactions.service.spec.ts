import { TransactionsService } from './transactions.service';
import { TransactionRepository } from './transactions.repository';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/suppliers.entity';
import { CachesService } from '../caches/caches.service';
import { ModuleRef } from '@nestjs/core';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let transactionRepositoryMock: TransactionRepository;
  let suppliersServiceMock: SuppliersService;
  let moduleRefMock: ModuleRef;
  let cachesServiceMock: CachesService;

  beforeEach(() => {
    transactionRepositoryMock = {
      create: jest.fn(),
    } as any;

    suppliersServiceMock = {
      getSupplierById: jest.fn(),
    } as any;

    moduleRefMock = {
      get: jest.fn(),
    } as any;

    cachesServiceMock = {
      get: jest.fn(),
      set: jest.fn(),
    } as any;

    transactionsService = new TransactionsService(
      transactionRepositoryMock,
      suppliersServiceMock,
      moduleRefMock,
      cachesServiceMock,
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

      const cache = null;
      const supplierIds = [];
      const suppliers: Supplier[] = [];
      const transformedData = {};

      (cachesServiceMock.get as jest.Mock).mockResolvedValue(cache);
      (suppliersServiceMock.getSupplierById as jest.Mock).mockResolvedValueOnce(
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
      expect(cachesServiceMock.get).toHaveBeenCalledWith(
        JSON.stringify(transactionDto),
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

      const cache = {};

      (cachesServiceMock.get as jest.Mock).mockResolvedValue(cache);

      const result = await transactionsService.createTransaction(
        transactionDto,
      );

      expect(result).toEqual({ data: cache });
      expect(transactionRepositoryMock.create).not.toHaveBeenCalled();
      expect(cachesServiceMock.get).toHaveBeenCalledWith(
        JSON.stringify(transactionDto),
      );
      expect(cachesServiceMock.set).not.toHaveBeenCalled();
    });

    it('should throw an error if an exception occurs', async () => {
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

      const error = new Error('Jest test error message');

      (cachesServiceMock.get as jest.Mock).mockRejectedValue(error);

      await expect(
        transactionsService.createTransaction(transactionDto),
      ).rejects.toThrow(error.message);
      expect(cachesServiceMock.get).toHaveBeenCalledWith(
        JSON.stringify(transactionDto),
      );
      expect(cachesServiceMock.set).not.toHaveBeenCalled();
    });
  });
});
