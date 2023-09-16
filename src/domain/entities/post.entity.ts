import { PostStatusEnum } from '../enums/post-status.enum';
import { EntityBase } from '../../common/base/entity.base';
import { UserEntity } from './user.entity';

export class PostEntity extends EntityBase {
  title: string;
  description: string;
  status: PostStatusEnum;
  createdbyid: string;
  updatedbyid?: string;
  createdby?: UserEntity;
  updatedby?: UserEntity;
}
