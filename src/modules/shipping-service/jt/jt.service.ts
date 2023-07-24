import { Injectable } from '@nestjs/common';
import { ShippingServiceInterface } from 'src/modules/rates/interfaces/provider.interface';
import { CalculateRateDTO } from 'src/modules/rates/dtos/calculate-rate.dto';
import { RateDTO } from 'src/modules/rates/dtos/rate.dto';
import { fileCommon } from 'src/common/file';
import { generateLog } from 'src/common/logs';
import { JTRequestDTO } from './dtos/jt-request.dto';
import { HTTPMethod } from 'src/common/constant';
import { httpClient } from 'src/common/http-client';
import { HttpService } from '@nestjs/axios';
import { CityLinkRequestDTO } from '../city-link/dtos/city-link-request.dto';

@Injectable()
export class JtService implements ShippingServiceInterface {
  constructor(private readonly httpService: HttpService) { }
  async calculateRate(input: CalculateRateDTO, url: string, code: string): Promise<RateDTO> {
    const req = new CityLinkRequestDTO(input).toRequest();
    // const req = new JTRequestDTO(input).toRequest();
    let resp: any;
    try {
      resp = await httpClient(this.httpService, HTTPMethod.POST, req, {}, url);
      const logsReq = generateLog(resp?.request, {
        label: 'Request J&T Provider',
        bodyPayload: req,
      });
      fileCommon.writeLogToFile(
        `gateway-date-${new Date().getDate()}.log`,
        logsReq,
      );
      const logsResp = generateLog(resp?.request, {
        label: 'Response J&T  Provider',
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
      console.log('Error provider J&T', error.message);
      throw error
    }


  }

}
