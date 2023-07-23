import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { TransactionRepository } from './transactions.repository';
import { CityLink } from 'src/helper/providers/city-link';
import { CachesModule } from '../caches/caches.module';
import { JT } from 'src/helper/providers/jt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    SuppliersModule,
    HttpModule,
    CachesModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository, CityLink, JT],
})
export class TransactionsModule {}
