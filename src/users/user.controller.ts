import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserInfo } from '../common/custom-decorators/';
import { TUser } from './transforms/user.transform';
import { IUserBasicInfo } from '../common/interfaces';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse()
  @Get('Me')
  userMe(@UserInfo() user: TUser): Promise<IUserBasicInfo> {
    return this.userService.getUserMe(user);
  }
}
