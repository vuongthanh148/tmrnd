import { objectToSnake } from 'src/common/case-convert';
import { CalculateRateRequestDTO } from 'src/modules/rates/dtos/calculate-rate-request.dto';

export class JTRequestDTO {
  constructor(input: CalculateRateRequestDTO) {
    const jtRequest = {
      shippingRatesType: 'domestic',
      senderPostcode: input.departurePostCode,
      receiverPostcode: input.arrivalPostCode,
      destinationCountry: 'BWN',
      shippingType: 'EZ',
      weight: input.itemWeight,
      length: input.itemLength,
      width: input.itemWidth,
      height: input.itemHeight,
    };
    Object.assign(this, jtRequest);
  }

  shippingRatesType: string;
  senderPostcode: string;
  receiverPostcode: number;
  destinationCountry: string;
  shippingType: string;
  weight: number;
  length: number;
  width: number;
  height: number;

  toRequest() {
    return objectToSnake(this);
  }
}
