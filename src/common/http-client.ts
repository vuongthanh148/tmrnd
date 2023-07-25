import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as https from 'https';

export const httpClient = (
  httpService: any,
  method: string,
  body: any,
  headers: any,
  url: string,
) => {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  return firstValueFrom(
    httpService
      .request({ url, method, headers, data: body, httpsAgent: agent })
      .pipe(
        catchError((error: AxiosError) => {
          console.log('HTTP Error: ', error.code, error.message);
          throw error;
        }),
      ),
  );
};
