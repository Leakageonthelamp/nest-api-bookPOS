import { OrderService } from './order.service';
import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ProductListDto, CreateOrderDto } from './order.dto';
import { IPromotionResult, IOrder } from '../common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { TUser } from 'src/users/transforms/user.transform';
import { UserInfo } from 'src/common/custom-decorators';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse()
  @Post('OrderCheckPrice')
  calculatePrice(@Body() data: ProductListDto): Promise<IPromotionResult> {
    return this.orderService.calculateOrder(data);
  }

  @ApiCreatedResponse()
  @Post('CreateOrder')
  createOrder(
    @UserInfo() user: TUser,
    @Body() data: CreateOrderDto,
  ): Promise<IOrder> {
    return this.orderService.createOrder(user.uuid, data);
  }
}
