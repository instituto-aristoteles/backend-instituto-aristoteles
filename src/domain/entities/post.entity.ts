import { PostStatusEnum } from '@/domain/enums/post-status.enum';
import { EntityBase } from '@/common/base/entity.base';
import { UserEntity } from '@/domain/entities/user.entity';
import { CategoryEntity } from '@/domain/entities/category.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'Post' })
export class PostEntity extends EntityBase<PostEntity> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  coverUrl?: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  category?: CategoryEntity;

  @Column({ nullable: true })
  categoryId?: string;

  @Column()
  status: PostStatusEnum;

  @Column()
  createdById: string;

  @Column({ nullable: true })
  updatedById?: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  createdBy?: UserEntity;
  @ManyToOne(() => UserEntity, (user) => user.id)
  updatedBy?: UserEntity;
}
