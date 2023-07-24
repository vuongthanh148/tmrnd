import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CalculateRateDto } from 'src/modules/rates/dtos/calculate-rate.dto';
import { HTTPMethod } from '../../../utils/constant';
import { httpClient } from '../../../utils/http-client';
import { fileCommon } from '../../../utils/file';
import { generateLog } from '../../../utils/logs';

@Injectable()
export class JT {
  constructor(private readonly httpService: HttpService) {}

  public createRequest(input: CalculateRateDto) {
    return {
      shipping_rates_type: 'domestic',
      sender_postcode: input.departure_post_code,
      receiver_postcode: input.arrival_post_code,
      destination_country: 'BWN',
      shipping_type: 'EZ',
      weight: input.item_weight,
      length: input.item_length,
      width: input.item_width,
      height: input.item_height,
    };
  }

  public async transformResp(
    input: CalculateRateDto,
    url: string,
    code: string,
  ) {
    const req = this.createRequest(input);
    let resp: any;
    try {
      // resp = await httpClient(this.httpService, HTTPMethod.POST, req, {}, url);
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
    } catch (error) {
      console.log('Error provider J&T', error.message);
    }

    return {
      courier: code.toLowerCase(),
      rate: Math.floor(Math.random() * 100) + 1,
    };
  }
}
