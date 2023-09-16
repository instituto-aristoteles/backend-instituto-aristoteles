import { PostReadDTO } from '../../application/dtos/post.read.dto';
import { PostCreateUpdateDTO } from '../../application/dtos/post.create.update.dto';
import { PostEntity } from '../../../../domain/entities/post.entity';

export function modelToDTO(entity: PostEntity): PostReadDTO {
  return {
    Id: entity.id,
    Title: entity.title,
    Description: entity.description,
    PostStatus: entity.status,
    CreatedBy: entity.createdby,
    UpdatedBy: entity.updatedby,
    CreatedAt: entity.createdat,
    UpdatedAt: entity.updatedat,
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
    createdbyid: dto.CreatedById,
    title: dto.Title,
    description: dto.Description,
    status: dto.PostStatus,
    createdat: dto.CreatedAt,
    updatedat: dto.UpdatedAt,
  };
}
