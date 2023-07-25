import { CalculateRateRequestDTO } from '../../rates/dtos/calculate-rate-request.dto';
import { RateDTO } from '../../rates/dtos/rate.dto';

export interface ShippingServiceInterface {
  calculateRate(
    input: CalculateRateRequestDTO,
    url: string,
    code: string,
  ): Promise<RateDTO>;
}
