import { IGetBooks } from './../../common/interfaces/book.interface';

export class TBook {
  id: number;
  name: string;
  author: string;
  price: number;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;

  getBooks(): IGetBooks {
    return {
      id: this.id,
      name: this.name,
      author: this.author,
      stock: this.stock,
      price: this.price,
    };
  }
}
