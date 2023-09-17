import { PostStatusEnum } from '../enums/post-status.enum';
import { EntityBase } from '../../common/base/entity.base';
import { UserEntity } from './user.entity';
import { CategoryEntity } from './category.entity';

type CreatePostEntity = Required<
  Omit<PostEntity, 'createdById' | 'updatedById' | 'categoryId'>
>;

export class PostEntity extends EntityBase {
  title: string;
  description: string;
  slug: string;
  content: string;
  coverUrl?: string;
  category?: CategoryEntity;
  categoryId?: string;
  status: PostStatusEnum;
  createdById: string;
  updatedById?: string;
  createdBy?: UserEntity;
  updatedBy?: UserEntity;
}
