import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transactions.repository';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { ProvidersService } from '../suppliers/providers.service';
import { Provider } from '../suppliers/providers.entity';
import { CityLink } from '../../helper/providers/city-link';
import { ModuleRef } from '@nestjs/core';
import { JT } from '../../helper/providers/jt';

const services = {
  CityLink,
  JT,
};

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly providersService: ProvidersService,
    private readonly moduleRef: ModuleRef,
  ) {}

  public async createTransaction(transaction: CreateTransactionDto) {
    try {
      this.transactionRepository.create(transaction);
      const { supplierIds } = transaction;
      const suppliers = await Promise.all(
        supplierIds.map((providerId: number) =>
          this.providersService.getProviderById(providerId),
        ),
      );

      const data = await Promise.all(
        suppliers.map((provider: Provider) => {
          const service = this.moduleRef.get(services[provider.code]);

          return service.transformResp(
            transaction,
            provider.url,
            provider.code,
          );
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
