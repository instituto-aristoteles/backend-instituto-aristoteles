import { PostReadDTO } from '@/modules/post/application/dtos/post.read.dto';
import { PostEntity } from '@/domain/entities/post.entity';
import { PostCreateUpdateDTO } from '@/modules/post/application/dtos/post.create.update.dto';
import slugify from 'slugify';
import { UserEntity } from '@/domain/entities/user.entity';

export function modelToDTO(entity: PostEntity): PostReadDTO {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    status: entity.status,
    content: entity.content,
    category: entity.category,
    slug: entity.slug,
    createdBy: {
      name: entity.createdBy.name,
      email: entity.createdBy.email,
    },
    updatedBy: {
      name: entity.updatedBy.name,
      email: entity.updatedBy.email,
    },
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export function modelToDtoList(entityList: PostEntity[]): PostReadDTO[] {
  return entityList.map(modelToDTO);
}

export function dtoToModel(
  dto: PostCreateUpdateDTO,
  author: UserEntity,
  updated?: PostEntity,
): PostEntity {
  const currentDate = new Date();

  return {
    id: updated?.id,
    title: dto.title,
    description: dto.description,
    slug: slugify(dto.title, { lower: true }),
    content: dto.content,
    coverUrl: dto.coverUrl,
    status: dto.status,
    categoryId: dto.categoryId,
    createdAt: updated?.createdAt ?? currentDate,
    updatedAt: currentDate,
    createdById: updated?.createdById ?? author.id,
    updatedById: author.id,
  };
}
