import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ name: 'book_stock' })
  stock: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;

  // @Column({ name: 'created_at' })
  // createdAt?: Date;

  // @CreateDateColumn({ name: 'updated_at' })
  // updatedAt?: Date;
}
