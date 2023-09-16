import { PostReadDTO } from '../../application/dtos/post.read.dto';
import { PostCreateUpdateDTO } from '../../application/dtos/post.create.update.dto';
import { PostEntity } from '../../../../domain/entities/post.entity';

export function modelToDTO(entity: PostEntity): PostReadDTO {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    status: entity.status,
    createdBy: entity.createdby,
    updatedBy: entity.updatedby,
    createdAt: entity.createdat,
    updatedAt: entity.updatedat,
  };
}

export function modelToDtoList(entityList: PostEntity[]): PostReadDTO[] {
  const posts: PostReadDTO[] = [];
  entityList.forEach((x) => posts.push(modelToDTO(x)));

  return posts;
}

export function dtoToModel(dto: PostCreateUpdateDTO): PostEntity {
  return {
    createdby: undefined,
    createdbyid: dto.createdById,
    title: dto.title,
    description: dto.description,
    slug: dto.slug,
    coverUrl: dto.coverUrl,
    status: dto.status,
    createdat: dto.createdAt,
    updatedat: dto.updatedAt,
  };
}
