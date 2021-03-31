import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { RegisterUserDto, UserLoginDto } from './auth.dto';
import { IAccessToken } from '../common/interfaces';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @Post('User/Login')
  userLogin(@Body() data: UserLoginDto): Promise<IAccessToken> {
    return this.authService.studentLogin(data);
  }

  @ApiCreatedResponse()
  @Post('User/Register')
  registerUser(@Body() data: RegisterUserDto): Promise<IAccessToken> {
    return this.authService.registerUser(data);
  }
}
