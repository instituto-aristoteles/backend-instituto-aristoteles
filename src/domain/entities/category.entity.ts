import { EntityBase } from '@/common/base/entity.base';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostEntity } from '@/domain/entities/post.entity';

@Entity({ name: 'Category' })
export class CategoryEntity extends EntityBase<CategoryEntity> {
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => PostEntity, (post) => post.category)
  posts?: PostEntity[];
}
