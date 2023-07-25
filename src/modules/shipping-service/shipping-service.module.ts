import { Module } from '@nestjs/common';
import { CityLinkModule } from './providers/city-link/city-link.module';
import { JtModule } from './providers/jt/jt.module';
import { ShippingServiceFactory } from './shipping-service.factory';

@Module({
  imports: [CityLinkModule, JtModule],
  providers: [ShippingServiceFactory],
  exports: [ShippingServiceFactory],
})
export class ShippingServiceModule {}
