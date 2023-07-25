import { Injectable } from '@nestjs/common';
import { PostRepositoryInterface } from '../../../../domain/interfaces/post.repository.interface';
import { PostEntity } from '../../../../domain/entities/post.entity';
import { PrismaService } from '../../../../database/prisma/service/prisma.service';

@Injectable()
export class PostRepository implements PostRepositoryInterface {
  constructor(private readonly repository: PrismaService) {}

  async createPost(postEntity: PostEntity): Promise<void> {
    await this.repository.post.create({
      data: {
        Title: postEntity.Title,
        Description: postEntity.Description,
        PostStatus: postEntity.PostStatus,
        CreatedById: postEntity.CreatedById,
        UpdatedById: postEntity.UpdatedById,
      },
    });
  }

  async deletePost(id: string): Promise<void> {
    await this.repository.post.delete({
      where: { Id: id },
    });
  }

  async getPost(id: string): Promise<PostEntity> {
    return this.repository.post.findUnique({
      where: { Id: id },
      include: {
        CreatedBy: true,
        UpdatedBy: true,
      },
    });
  }

  async getPosts(): Promise<PostEntity[]> {
    return this.repository.post.findMany({
      include: {
        CreatedBy: true,
        UpdatedBy: true,
      },
    });
  }

  async updatePost(id: string, postEntity: PostEntity): Promise<void> {
    await this.repository.post.update({
      where: {
        Id: id,
      },
      data: {
        Title: postEntity.Title,
        Description: postEntity.Description,
        PostStatus: postEntity.PostStatus,
        UpdatedById: postEntity.UpdatedById,
      },
    });
  }
}
