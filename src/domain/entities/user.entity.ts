import { EntityBase } from '@/common/base/entity.base';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostEntity } from '@/domain/entities/post.entity';
import { UserRole } from '@/domain/enums/user-role';
import { UserStatus } from '@/domain/enums/user-status';

@Entity({ name: 'User' })
export class UserEntity extends EntityBase<UserEntity> {
  @Column()
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  role: UserRole;

  @Column({ default: 'unconfirmed' as UserStatus })
  status: UserStatus;

  @OneToMany(() => PostEntity, (post) => post.createdBy)
  postsCreated: PostEntity[];

  @OneToMany(() => PostEntity, (post) => post.updatedBy)
  postsUpdated: PostEntity[];
}
