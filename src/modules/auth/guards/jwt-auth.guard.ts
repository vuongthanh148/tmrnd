import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from '../jwt/jwt-payload';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      console.log('SECRET: ', process.env.JWT_SECRET);
      const isVerified = jwt.verify(token, process.env.JWT_SECRET);
      if (!isVerified) throw new UnauthorizedException();

      const payload: any = jwt.decode(token);

      if (payload) {
        const { userId, access } = payload;
        const userPayload: JwtPayload = {
          userId,
          accessToken: token,
          selectedRole: access?.selectedRole,
        };
        request['user'] = userPayload;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
