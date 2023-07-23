import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/modules/transactions/dtos/create-transaction.dto';
import { HTTPMethod } from '../../utils/constant';
import { httpClient } from '../../utils/http-client';
import { fileCommon } from '../../utils/file';
import { generateLog } from '../../utils/logs';

@Injectable()
export class JT {
  constructor(private readonly httpService: HttpService) {}

  public createRequest(input: CreateTransactionDto) {
    return {
      origin_country: input?.departure_country_code || 'MY',
      origin_state: input?.departure_state_name || 'Kuala Lumpur',
      origin_postcode: input.departure_post_code,
      destination_country: input?.arrival_country_code || 'MY',
      destination_state: input?.arrival_state_name || 'Perlis',
      destination_postcode: input.arrival_post_code,
      length: input.item_length,
      width: input.item_width,
      height: input.item_height,
      selected_type: 1,
      parcel_weight: input.item_weight,
    };
  }

  public async transformResp(
    input: CreateTransactionDto,
    url: string,
    code: string,
  ) {
    const req = this.createRequest(input);
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
    } catch (error) {
      console.log('Error supplier J&T', error.message);
    }

    return {
      courier: code.toLowerCase(),
      rate: resp?.data?.req?.data?.rate || 0,
    };
  }
}
