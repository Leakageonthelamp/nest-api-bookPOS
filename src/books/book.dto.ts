import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddNewBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
