import { PostReadDTO } from '../../application/dtos/post.read.dto';
import { PostCreateUpdateDTO } from '../../application/dtos/post.create.update.dto';
import { PostEntity } from '../../../../domain/entities/post.entity';

export function modelToDTO(entity: PostEntity): PostReadDTO {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    status: entity.status,
    category: entity.category,
    createdBy: entity.createdBy,
    updatedBy: entity.updatedBy,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export function modelToDtoList(entityList: PostEntity[]): PostReadDTO[] {
  const posts: PostReadDTO[] = [];
  entityList.forEach((x) => posts.push(modelToDTO(x)));

  return posts;
}

export function dtoToModel(dto: PostCreateUpdateDTO): PostEntity {
  return {
    createdBy: undefined,
    createdById: dto.createdById,
    title: dto.title,
    description: dto.description,
    slug: dto.slug,
    categoryId: dto.categoryId,
    coverUrl: dto.coverUrl,
    status: dto.status,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
