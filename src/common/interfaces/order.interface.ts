export interface IFindPromotion {
  id: number;
  name: string;
  author: string;
  price: number;
  stock?: number;
  orderQuantity?: number;
}

export interface IFindPromotionResult {
  promotionProduct?: IFindPromotion[];
  normalProduct?: IFindPromotion[];
}

export interface IDiscount {
  discount: number;
}

export interface IPromotionResult {
  totalPrice: number;
  discount: number;
  net: number;
}

export interface IOrder {
  id: number;
  totalPrice: number;
  discount: number;
  net: number;
  userId: string;
  products: IProductList[];
}

export interface IProductList {
  productId: number;
  quantity: number;
}
