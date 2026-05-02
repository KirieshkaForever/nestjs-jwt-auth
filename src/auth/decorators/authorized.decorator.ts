import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/generated';
import { Request } from 'express';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;

    return data ? user![data] : data
  },
);
