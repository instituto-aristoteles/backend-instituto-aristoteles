import { EntityBase } from '@/common/base/entity.base';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Category' })
export class CategoryEntity extends EntityBase<CategoryEntity> {
  @Column()
  title: string;

  @Column()
  slug: string;
}
