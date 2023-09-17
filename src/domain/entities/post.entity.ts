import { PostStatusEnum } from '../enums/post-status.enum';
import { EntityBase } from '../../common/base/entity.base';
import { UserEntity } from './user.entity';
import { CategoryEntity } from './category.entity';

export class PostEntity extends EntityBase {
  title: string;
  description: string;
  slug: string;
  coverUrl?: string;
  category?: CategoryEntity;
  status: PostStatusEnum;
  createdById: string;
  updatedById?: string;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
}
