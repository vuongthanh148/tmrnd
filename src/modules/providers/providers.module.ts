import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { ProviderRepository } from './providers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './providers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService, ProviderRepository],
  exports: [ProvidersService],
})
export class ProvidersModule {}
