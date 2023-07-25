import { Injectable } from '@nestjs/common';
import { CityLinkService } from 'src/modules/shipping-service/providers/city-link/city-link.service';
import { JtService } from 'src/modules/shipping-service/providers/jt/jt.service';
import { ShippingServiceInterface } from './interfaces/shipping-service.interface';
import { ProviderCode } from 'src/common/constant';

@Injectable()
export class ShippingServiceFactory {
  constructor(
    private readonly cityLinkService: CityLinkService,
    private readonly jtService: JtService,
  ) {}
  getShippingService(code: string): ShippingServiceInterface {
    if (code === ProviderCode.JT) return this.jtService;
    return this.cityLinkService;
  }
}
