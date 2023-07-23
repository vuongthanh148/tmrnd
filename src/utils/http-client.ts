import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export const httpClient = (
  httpService: any,
  method: string,
  body: any,
  headers: any,
  url: string,
) => {
  return firstValueFrom(
    httpService.request({ url, method, headers, data: body }).pipe(
      catchError((error: AxiosError) => {
        console.log('HTTP Error: ', error.code, error.message);
        throw error;
      }),
    ),
  );
};
