import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transactions.repository';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/suppliers.entity';
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
    private readonly suppliersSerive: SuppliersService,
    private readonly moduleRef: ModuleRef,
  ) {}

  public async createTransaction(transaction: CreateTransactionDto) {
    try {
      this.transactionRepository.create(transaction);
      const { supplierIds } = transaction;
      const suppliers = await Promise.all(
        supplierIds.map((supplierId: number) =>
          this.suppliersSerive.getSupplierById(supplierId),
        ),
      );

      const data = await Promise.all(
        suppliers.map((supplier: Supplier) => {
          const service = this.moduleRef.get(services[supplier.code]);

          return service.transformResp(
            transaction,
            supplier.url,
            supplier.code,
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
