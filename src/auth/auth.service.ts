import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/user.repository';

import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync, genSalt } from 'bcrypt';
import { RegisterUserDto, UserLoginDto } from './auth.dto';
import { IAccessToken, IAuthPayload } from '../common/interfaces';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,

    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signStudentToken(payload: IAuthPayload): Promise<IAccessToken> {
    return {
      accesssToken: this.jwtService.sign(payload),
    };
  }

  async studentLogin(data: UserLoginDto): Promise<IAccessToken> {
    const { username, password } = data;
    const user = await this.userService.verify({ username });
    const hash = user.password.replace(/^\$2y(.+)$/i, '$2a$1');
    const isValidPassword = compareSync(password, hash);
    if (!isValidPassword) {
      throw new UnauthorizedException('auth.ERROR_MESSAGE.INVALID_PASSWORD');
    }

    return this.signStudentToken({ uuid: user.uuid });
  }

  async registerUser(data: RegisterUserDto): Promise<IAccessToken> {
    const { username, password, email } = data;
    const hashPass = hashSync(password, 12);
    let user = await this.userRepo.findOne({ username });
    if (user) {
      throw new UnprocessableEntityException(
        'auth.ERROR_MESSAGE.USERNAME_ALREADY_EXIST',
      );
    }
    user = this.userRepo.create({
      username,
      password: hashPass,
      email,
    });
    user = await this.userRepo.save(user);
    this.signStudentToken({ uuid: user.uuid });
    return this.signStudentToken({ uuid: user.uuid });
  }
}
