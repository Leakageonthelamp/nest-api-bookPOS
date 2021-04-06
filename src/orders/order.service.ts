import { plainToClass } from 'class-transformer';
import { BookService } from './../books/book.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ProductListDto, CreateOrderDto } from './order.dto';
import {
  IFindPromotion,
  IFindPromotionResult,
  IDiscount,
  IPromotionResult,
  IOrder,
} from '../common/interfaces';
import { OrderRepository } from './repositories/order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TOrder } from './transforms/order.transform';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepo: OrderRepository,

    private readonly bookserivce: BookService,
  ) {}

  async calculateOrder(data: ProductListDto): Promise<IPromotionResult> {
    const orderList = data.productList;
    const orderListDetail = await Promise.all(
      orderList.map(async (d) => {
        const book = await this.bookserivce.getBookById(d.productId);
        if (book.stock < d.quantity) {
          throw new Error('order.STOCK_LESS_THAT_ORDER_QUANTITY');
        }
        return { ...book, orderQuantity: d.quantity };
      }),
    );

    //Find Discount
    const orderProductType = this.findPromotionProduct(orderListDetail);
    const { discount } = this.calDiscount(orderProductType.promotionProduct);
    //Find TotalPrice
    const priceArray = orderListDetail.map((p) => p.orderQuantity * p.price);
    const totalPrice = priceArray.reduce((acc, curr) => acc + curr);

    return {
      totalPrice,
      discount,
      net: totalPrice - discount,
    };
  }

  async createOrder(userId: string, data: CreateOrderDto): Promise<IOrder> {
    const { productList, totalPrice, discount, net } = data;
    const orderPrice = { totalPrice, discount, net };
    const calOrderPrice = await this.calculateOrder(data);
    //Test Order price
    const test1 = Object.is(orderPrice.totalPrice, calOrderPrice.totalPrice);
    const test2 = Object.is(orderPrice.discount, calOrderPrice.discount);
    const test3 = Object.is(orderPrice.net, calOrderPrice.net);
    if (!test1 || !test2 || !test3) {
      throw new Error('order.MISMATCH_ORDER_PRICE_VALUE');
    }

    const updateStock = await Promise.all(
      productList.map(async (st) => {
        const books = await this.bookserivce.getBookById(st.productId);
        const newStock = {
          updateStockQty: books.stock - st.quantity,
        };
        const result = await this.bookserivce.updateBookStock(
          st.productId,
          newStock,
        );
        return result;
      }),
    );
    if (!updateStock) {
      throw new UnprocessableEntityException(
        'order.FAIL_TO_UPDATE_STOCK_QUANTITY',
      );
    }

    let order = this.orderRepo.create({
      totalPrice,
      discount,
      net,
      userId,
      products: productList,
    });
    order = await this.orderRepo.save(order);

    return plainToClass(TOrder, order)?.getOrder();
  }

  findPromotionProduct(payload: IFindPromotion[]): IFindPromotionResult {
    const result = {
      promotionProduct: [],
      normalProduct: [],
    };
    payload.map((product) => {
      if (product.author === 'JK Rowling') {
        result.promotionProduct.push(product);
      } else {
        result.normalProduct.push(product);
      }
    });

    return result;
  }

  calDiscount(payload: IFindPromotion[]): IDiscount {
    if (payload.length >= 2) {
      const qtyArray = payload.map((q) => q.orderQuantity);
      const uniqueMin = Math.min(...qtyArray);
      const result = payload.map((x) => {
        return (((10 + (payload.length - 2)) * x.price) / 100) * uniqueMin;
      });
      const discount = result.reduce((acc, curr) => acc + curr);
      return { discount };
    } else return { discount: 0 };
  }
}
