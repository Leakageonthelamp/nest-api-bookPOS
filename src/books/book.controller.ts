import {
  Controller,
  UseGuards,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ParseInt } from '../common/custom-decorators/';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { IGetBooks, ISuccessMessage } from '../common/interfaces';
import { AddNewBookDto, UpdateStockDto } from './book.dto';

@ApiTags('Book')
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse()
  @Get('Book/GetBooks')
  async getBooks(): Promise<IGetBooks[]> {
    return this.bookService.getAllBooks();
  }

  @ApiOkResponse()
  @Get('Book/GetBook/:bookId')
  getBookById(@Param('bookId', ParseInt) bookId: number): Promise<IGetBooks> {
    return this.bookService.getBookById(bookId);
  }

  @ApiCreatedResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('Book/AddBook')
  addNewBook(@Body() data: AddNewBookDto): Promise<IGetBooks> {
    return this.bookService.addNewBook(data);
  }

  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('Book/UpdateBook/:bookId')
  updateBook(
    @Param('bookId', ParseInt) bookId: number,
    @Body() data: AddNewBookDto,
  ): Promise<IGetBooks> {
    return this.bookService.updateBook(bookId, data);
  }

  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('Book/UpdateBookStock/:bookId')
  updateStock(
    @Param('bookId', ParseInt) bookId: number,
    @Body() data: UpdateStockDto,
  ): Promise<IGetBooks> {
    return this.bookService.updateBookStock(bookId, data);
  }

  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('Book/DeleteBook/:bookId')
  deleteBook(
    @Param('bookId', ParseInt) bookId: number,
  ): Promise<ISuccessMessage> {
    return this.bookService.deleteBook(bookId);
  }
}
