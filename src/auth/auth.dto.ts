import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
