import { PostReadDTO } from '@/modules/post/application/dtos/post.read.dto';
import { PostEntity } from '@/domain/entities/post.entity';
import { PostCreateUpdateDTO } from '@/modules/post/application/dtos/post.create.update.dto';

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
  const posts: PostReadDTO[] = [];
  entityList.forEach((x) => posts.push(modelToDTO(x)));

  return posts;
}

export function dtoToModel(
  dto: PostCreateUpdateDTO,
  updated?: PostEntity,
): PostEntity {
  const isUpdate = !!updated;
  const currentDate = new Date();

  return {
    id: updated?.id,
    title: dto.title,
    description: dto.description,
    slug: dto.slug,
    content: dto.content,
    coverUrl: dto.coverUrl,
    status: dto.status,
    categoryId: dto.categoryId,
    createdAt: updated?.createdAt ?? currentDate,
    updatedAt: isUpdate ? currentDate : currentDate,
    createdById: updated?.createdById ?? dto.authorId,
    updatedById: dto.authorId,
  };
}
