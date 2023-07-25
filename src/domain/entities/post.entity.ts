import { PostStatusEnum } from '../enums/post-status.enum';
import { EntityBase } from '../../common/entity.base';
import { UserEntity } from './user.entity';

export class PostEntity extends EntityBase {
  Title: string;
  Description: string;
  PostStatus: PostStatusEnum;
  CreatedById: string;
  UpdatedById?: string;
  CreatedBy?: UserEntity;
  UpdatedBy?: UserEntity;
}
