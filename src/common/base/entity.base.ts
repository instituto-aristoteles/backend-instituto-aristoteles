import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class EntityBase<T> {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
