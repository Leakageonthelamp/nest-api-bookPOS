import { IGetBooks } from './../../common/interfaces/book.interface';

export class TBook {
  id: number;
  name: string;
  author: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;

  getBooks(): IGetBooks {
    return {
      id: this.id,
      name: this.name,
      author: this.author,
      price: this.price,
    };
  }
}
