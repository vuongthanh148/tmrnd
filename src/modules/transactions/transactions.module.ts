import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { SuppliersModule } from '../suppliers/providers.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transactions.entity';
import { TransactionRepository } from './transactions.repository';
import { CityLink } from 'src/helper/providers/city-link';
import { JT } from 'src/helper/providers/jt';
import { ResponseInterceptor } from 'src/interceptors/transaction.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    SuppliersModule,
    HttpModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionRepository,
    CityLink,
    JT,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class TransactionsModule {}
