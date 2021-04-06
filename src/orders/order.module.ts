import { BookModule } from './../books/book.module';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.repository';

@Module({
  imports: [BookModule, TypeOrmModule.forFeature([OrderRepository])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService, TypeOrmModule],
})
export class OrderModule {}
