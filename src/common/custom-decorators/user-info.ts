import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestAuth } from '../interfaces';
import { TUser } from '../../users/transforms/user.transform';
import { plainToClass } from 'class-transformer';

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: IRequestAuth = ctx.switchToHttp().getRequest();
    const user = request.user.user;
    return plainToClass(TUser, user);
  },
);
