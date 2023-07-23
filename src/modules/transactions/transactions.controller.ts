import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/interceptors/transaction.interceptor';

@Controller('transactions')
@UseInterceptors(ResponseInterceptor)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiCreatedResponse({
    description:
      'The create transaction request has been successfully processed',
  })
  public async createTransaction(@Body() transaction: CreateTransactionDto) {
    return await this.transactionsService.createTransaction(transaction);
  }
}
