import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CalculateRateRequestDTO } from './dtos/calculate-rate-request.dto';
import { RatesService } from './rates.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseAppGuard } from '../auth/decorators/use-app-guard.decorator';
import { CacheInterceptor } from 'src/common/interceptors/cache.interceptor';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';

@ApiTags('rates')
@Controller('rates')
@UseAppGuard()
@UseInterceptors(CacheInterceptor)
@UseInterceptors(LoggerInterceptor)
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rate calculation' })
  @ApiCreatedResponse({
    description: 'The create rate request has been successfully processed',
  })
  public async createRate(@Body() rate: CalculateRateRequestDTO) {
    return await this.ratesService.createRate(rate);
  }
}
