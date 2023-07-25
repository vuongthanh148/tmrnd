import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { fileCommon } from '../file';
import { generateLog } from '../logs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Logging HTTP request ${req.method} ${req.url} ${res.statusCode}`,
    );

    const logs = generateLog(req, { label: 'gateway', bodyPayload: req.body });
    fileCommon.writeLogToFile(`gateway-date-${new Date().getDate()}.log`, logs);
    next();
  }
}
