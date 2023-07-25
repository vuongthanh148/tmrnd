import { Injectable } from '@nestjs/common';
import { CityLinkService } from 'src/modules/shipping-service/providers/city-link/city-link.service';
import { JtService } from 'src/modules/shipping-service/providers/jt/jt.service';
import { ShippingServiceInterface } from './interfaces/shipping-service.interface';
import { ShippingServiceEnum } from './enums/shipping-service.enum';

@Injectable()
export class ShippingServiceFactory {
  constructor(
    private readonly cityLinkService: CityLinkService,
    private readonly jtService: JtService,
  ) {}
  getShippingService(code: string): ShippingServiceInterface {
    switch (code) {
      case ShippingServiceEnum.JT:
        return this.jtService;
      case ShippingServiceEnum.CityLink:
        return this.cityLinkService;
      default:
        return this.cityLinkService;
    }
  }
}
