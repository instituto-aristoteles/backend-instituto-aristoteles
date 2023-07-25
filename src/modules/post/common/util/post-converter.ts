import { PostReadDTO } from '../../application/dtos/post.read.dto';
import { PostCreateUpdateDTO } from '../../application/dtos/post.create.update.dto';
import { PostEntity } from '../../../../domain/entities/post.entity';

export function modelToDTO(entity: PostEntity): PostReadDTO {
  return {
    Id: entity.Id,
    Title: entity.Title,
    Description: entity.Description,
    PostStatus: entity.PostStatus,
    CreatedBy: entity.CreatedBy,
    UpdatedBy: entity.UpdatedBy,
    CreatedAt: entity.CreatedAt,
    UpdatedAt: entity.UpdatedAt,
  };
}

export function modelToDtoList(entityList: PostEntity[]): PostReadDTO[] {
  const posts: PostReadDTO[] = [];
  entityList.forEach((x) => posts.push(modelToDTO(x)));

  return posts;
}

export function dtoToModel(dto: PostCreateUpdateDTO): PostEntity {
  return {
    CreatedBy: undefined,
    CreatedById: dto.CreatedById,
    Title: dto.Title,
    Description: dto.Description,
    PostStatus: dto.PostStatus,
    CreatedAt: dto.CreatedAt,
    UpdatedAt: dto.UpdatedAt,
  };
}
