import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';

import { PayloadToken } from './interfaces/token';

export const Auth = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Partial<PayloadToken> => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const payload: PayloadToken = {
        name: request.user.name,
        userId: request.user.userId,
      };
      return payload;
    } catch (error) {
      throw new ForbiddenException();
    }
  },
);
