import { PostStatusEnum } from '@/domain/enums/post-status.enum';
import { EntityBase } from '@/common/base/entity.base';
import { UserEntity } from '@/domain/entities/user.entity';
import { CategoryEntity } from '@/domain/entities/category.entity';

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
