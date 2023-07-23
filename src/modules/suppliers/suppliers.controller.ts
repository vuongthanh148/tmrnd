import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { Supplier } from './suppliers.entity';
import { UpdateResult } from 'typeorm';
import { ReadSupplierDto } from './dtos/read-supplier.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('supplier')
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiCreatedResponse({
    description: 'The create suppplier request has been successfully processed',
  })
  public async createSupplier(
    @Body() supplier: CreateSupplierDto,
  ): Promise<Supplier> {
    return await this.suppliersService.createNewSupllier(supplier);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a supplier' })
  @ApiParam({ name: 'id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        code: { type: 'string' },
        apiKey: { type: 'string' },
        url: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Supplier updated successfully',
    type: UpdateResult,
  })
  public async updateSupplier(
    @Param() params,
    @Body() dataUpdate: Partial<Supplier>,
  ): Promise<UpdateResult> {
    return await this.suppliersService.updateSupplierById(
      params.id,
      dataUpdate,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get suppliers' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of suppliers',
    type: Supplier,
    isArray: true,
  })
  public async readSupplier(
    @Query() filter: ReadSupplierDto,
  ): Promise<Supplier[]> {
    return await this.suppliersService.readSupplierByCondition(filter);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a supplier' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    description: 'Supplier deleted successfully',
    type: () => ({ message: String }),
  })
  public async deleteSupplier(@Param() params): Promise<{ message: string }> {
    return await this.suppliersService.deleteSupplierById(params.id);
  }
}
