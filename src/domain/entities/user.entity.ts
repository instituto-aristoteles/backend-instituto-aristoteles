import { EntityBase } from '../../common/entity.base';

export class UserEntity extends EntityBase {
  name: string;
  email: string;
  password: string;
}
