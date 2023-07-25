import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HTTPMethod } from 'src/common/constant';
import { fileCommon } from 'src/common/file';
import { httpClient } from 'src/common/http-client';
import { generateLog } from 'src/common/logs';
import { CalculateRateRequestDTO } from 'src/modules/rates/dtos/calculate-rate-request.dto';
import { RateDTO } from 'src/modules/rates/dtos/rate.dto';
import { ShippingServiceInterface } from 'src/modules/shipping-service/interfaces/shipping-service.interface';
import { CityLinkRequestDTO } from './dtos/city-link-request.dto';

@Injectable()
export class CityLinkService implements ShippingServiceInterface {
  constructor(private readonly httpService: HttpService) {}
  async calculateRate(
    input: CalculateRateRequestDTO,
    url: string,
    code: string,
  ): Promise<RateDTO> {
    const req = new CityLinkRequestDTO(input).toRequest();
    let resp: any;
    try {
      resp = await httpClient(this.httpService, HTTPMethod.POST, req, {}, url);
      const logsReq = generateLog(resp?.request, {
        label: 'Request City Link Provider',
        bodyPayload: req,
      });
      fileCommon.writeLogToFile(
        `gateway-date-${new Date().getDate()}.log`,
        logsReq,
      );
      const logsResp = generateLog(resp?.request, {
        label: 'Response City Link Provider',
        bodyPayload: resp?.data,
      });
      fileCommon.writeLogToFile(
        `gateway-date-${new Date().getDate()}.log`,
        logsResp,
      );
      return {
        courier: code.toLowerCase(),
        rate: resp?.data?.req?.data?.rate || 0,
      };
    } catch (error) {
      console.log('Error provider city link', error.message);
      throw error;
    }
  }
}
