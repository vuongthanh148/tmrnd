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
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { Provider } from './providers.entity';
import { UpdateResult } from 'typeorm';
import { ReadProviderDto } from './dtos/read-provider.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UseAppGuard } from '../auth/decorators/use-app-guard.decorator';

@ApiTags('provider')
@Controller('providers')
@UseAppGuard()
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new provider' })
  @ApiCreatedResponse({
    description: 'The create provider request has been successfully processed',
  })
  public async createProvider(
    @Body() provider: CreateProviderDto,
  ): Promise<Provider> {
    return await this.providersService.createNewProvider(provider);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a provider' })
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
    description: 'Provider updated successfully',
    type: UpdateResult,
  })
  public async updateProvider(
    @Param() params,
    @Body() dataUpdate: Partial<Provider>,
  ): Promise<UpdateResult> {
    return await this.providersService.updateProviderById(
      params.id,
      dataUpdate,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get providers' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of providers',
    type: Provider,
    isArray: true,
  })
  public async readProvider(
    @Query() filter: ReadProviderDto,
  ): Promise<Provider[]> {
    return await this.providersService.readProviderByCondition(filter);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a provider' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    description: 'Provider deleted successfully',
    type: () => ({ message: String }),
  })
  public async deleteProvider(@Param() params): Promise<{ message: string }> {
    return await this.providersService.deleteProviderById(params.id);
  }
}
