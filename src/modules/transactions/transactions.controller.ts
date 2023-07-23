import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       supplierIds: { type: [Number] },
  //       departure_post_code: { type: 'number' },
  //       arrival_post_code: { type: 'number' },
  //       departure_state_name: { type: 'string' },
  //       departure_country_code: { type: 'string' },
  //       arrival_state_name: { type: 'string' },
  //       arrival_country_code: { type: 'string' },
  //       item_length: { type: 'number' },
  //       item_width: { type: 'number' },
  //       item_height: { type: 'number' },
  //       item_weight: { type: 'number' },
  //     },
  //   },
  // })
  @ApiCreatedResponse({
    description:
      'The create transaction request has been successfully processed',
  })
  public async createTransaction(@Body() transaction: CreateTransactionDto) {
    return await this.transactionsService.createTransaction(transaction);
  }
}
