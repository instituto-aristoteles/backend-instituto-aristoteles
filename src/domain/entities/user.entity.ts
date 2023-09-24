import { EntityBase } from '@/common/base/entity.base';

export class UserEntity extends EntityBase {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
}
