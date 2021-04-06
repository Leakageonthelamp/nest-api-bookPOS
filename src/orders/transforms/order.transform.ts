import { IOrder, IProductList } from './../../common/interfaces/';

export class TOrder {
  id: number;
  totalPrice: number;
  discount: number;
  net: number;
  userId: string;
  products: IProductList[];
  createdAt?: Date;
  updatedAt?: Date;

  getOrder(): IOrder {
    return {
      id: this.id,
      userId: this.userId,
      totalPrice: this.totalPrice,
      discount: this.discount,
      net: this.net,
      products: this.products,
    };
  }
}
