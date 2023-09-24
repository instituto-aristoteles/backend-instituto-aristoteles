import { EntityBase } from '@/common/base/entity.base';
import { Column, Entity } from 'typeorm';

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
}
