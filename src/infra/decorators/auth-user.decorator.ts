import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthUserDto } from 'src/types/auth.type';

export const AuthUser = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request['user'] as AuthUserDto;
  },
);
