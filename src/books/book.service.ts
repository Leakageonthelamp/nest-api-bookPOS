import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './repositories/book.repository';
import { TBook } from './transforms/book.transform';
import { AddNewBookDto, UpdateStockDto } from './book.dto';
import { IGetBooks, ISuccessMessage } from './../common/interfaces/';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepo: BookRepository,
  ) {}

  async getAllBooks(): Promise<IGetBooks[]> {
    const books = await this.bookRepo.find();
    return plainToClass(TBook, books)?.map((book) => book.getBooks());
  }

  async getBookById(bookId: number): Promise<IGetBooks> {
    const book = await this.bookRepo.findOne({ id: bookId });
    if (!book) {
      throw new NotFoundException('book.NOT_FOUND_BOOK_ID');
    }
    return plainToClass(TBook, book)?.getBooks();
  }

  async addNewBook(data: AddNewBookDto): Promise<IGetBooks> {
    const { name, author, price, stock } = data;
    const newBook = this.bookRepo.create({
      name,
      author,
      price,
      stock,
    });
    const respone = await this.bookRepo.save(newBook);
    return plainToClass(TBook, respone)?.getBooks();
  }

  async updateBook(bookId: number, data: AddNewBookDto): Promise<IGetBooks> {
    let book = await this.bookRepo.findOne({
      where: {
        id: bookId,
      },
    });

    book = { id: book.id, ...data };
    book = await this.bookRepo.save(book);

    return plainToClass(TBook, book)?.getBooks();
  }

  async updateBookStock(
    bookId: number,
    data: UpdateStockDto,
  ): Promise<IGetBooks> {
    let book = await this.bookRepo.save({
      id: bookId,
      stock: data.updateStockQty,
    });

    book = await this.bookRepo.findOne({ where: { id: bookId } });
    return plainToClass(TBook, book)?.getBooks();
  }

  async deleteBook(bookId: number): Promise<ISuccessMessage> {
    const book = await this.bookRepo.findOne({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      throw new NotFoundException('book.NOT_FOUND_BOOK_ID');
    }
    await this.bookRepo.remove(book);
    return { message: 'book.SUCCESS_MESSAGE.DELETE_BOOK' };
  }
}
