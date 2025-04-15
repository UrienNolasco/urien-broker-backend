import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

// Interface estendida para incluir handshake (específico do WebSocket)
interface RequestWithHandshake extends Request {
  handshake?: {
    query: {
      token?: string;
    };
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestWithHandshake) => {
          // WebSocket: token na query do handshake
          if (request?.handshake?.query?.token) {
            return request.handshake.query.token.toString();
          }

          // HTTP: token no header Authorization
          if (request?.headers?.authorization) {
            return request.headers.authorization.split(' ')[1];
          }

          return null;
        },
      ]),
      secretOrKey: 'JWT_SECRET', // Use variáveis de ambiente no código real
    });
  }

  validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}