import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'book_name' })
  name: string;

  @Column({ name: 'book_author' })
  author: string;

  @Column({ name: 'book_price' })
  price: number;

  @CreateDateColumn()
  created_at?: Date;

  @CreateDateColumn()
  updated_at?: Date;
}
