import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';

import { PayloadToken } from './interfaces/token';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Partial<PayloadToken> => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const payload: PayloadToken = {
        name: request.name,
        id: request.id,
      };
      return payload;
    } catch (error) {
      throw new ForbiddenException();
    }
  },
);
