import { CalculateRateDTO } from "../dtos/calculate-rate.dto";
import { RateDTO } from "../dtos/rate.dto";

export interface ShippingServiceInterface {
    calculateRate(input: CalculateRateDTO, url: string, code: string): Promise<RateDTO>
}