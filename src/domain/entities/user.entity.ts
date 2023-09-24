import { EntityBase } from '@/common/base/entity.base';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostEntity } from '@/domain/entities/post.entity';

@Entity({ name: 'User' })
export class UserEntity extends EntityBase<UserEntity> {
  @Column()
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => PostEntity, (post) => post.createdBy)
  postsCreated: PostEntity[];

  @OneToMany(() => PostEntity, (post) => post.updatedBy)
  postsUpdated: PostEntity[];
}
