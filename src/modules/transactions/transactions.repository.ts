import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../utils/base/base-repository';
import { Transaction } from './transactions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRepository extends BaseRepository<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    transactionRepository: Repository<Transaction>,
  ) {
    super(transactionRepository);
  }
}
