import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetAuthUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
