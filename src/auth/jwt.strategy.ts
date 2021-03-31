import { UserService } from '../users/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IAuthPayload, IUserIAuthPayload } from '../common/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'testdev',
    });
  }

  async validate(payload: IAuthPayload): Promise<IUserIAuthPayload> {
    const { uuid } = payload;
    const user = await this.userService.verify({ uuid });
    return { user };
  }
}
