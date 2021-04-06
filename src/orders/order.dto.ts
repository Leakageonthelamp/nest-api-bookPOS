import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsArray,
  ArrayMinSize,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type as ValidateType } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderCheckDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class ProductListDto {
  @ApiProperty({ type: [OrderCheckDto], required: true })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @ValidateNested()
  @ValidateType(() => OrderCheckDto)
  public productList: OrderCheckDto[];
}

export class CreateOrderDto extends ProductListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  net: number;
}
