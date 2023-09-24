import { EntityBase } from '@/common/base/entity.base';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostEntity } from '@/domain/entities/post.entity';

@Entity({ name: 'User' })
export class UserEntity extends EntityBase<UserEntity> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  @OneToMany(() => PostEntity, (post) => post.createdBy)
  postsCreated: PostEntity[];

  @OneToMany(() => PostEntity, (post) => post.updatedBy)
  postsUpdated: PostEntity[];
}
