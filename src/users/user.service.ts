import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { TUser } from './transforms/user.transform';
import { IUserBasicInfo } from '../common/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  async verify(findCondition: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { ...findCondition },
    });
    if (!user) {
      throw new NotFoundException('user.ERROR_MESSAGE.NO_USER');
    }
    return user;
  }

  async getUserMe(user: TUser): Promise<IUserBasicInfo> {
    const userMe = await user.me();
    return { ...userMe };
  }
}
