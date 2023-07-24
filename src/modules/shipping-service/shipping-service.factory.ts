import { Injectable } from "@nestjs/common";
import { CityLinkService } from "src/modules/shipping-service/city-link/city-link.service";
import { JtService } from "src/modules/shipping-service/jt/jt.service";
import { ShippingServiceInterface } from "../rates/interfaces/provider.interface";

@Injectable()
export class ShippingServiceFactory {
    constructor(private readonly cityLinkService: CityLinkService, private readonly jtService: JtService) { }
    getShippingService(code: string): ShippingServiceInterface {
        if (code === "JT") return this.jtService
        return this.cityLinkService
    }
}