import { BookController } from './book.controller';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookRepository } from './repositories/book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService, TypeOrmModule],
})
export class BookModule {}
