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
        title: postEntity.title,
        description: postEntity.description,
        slug: postEntity.slug,
        coverUrl: postEntity.coverUrl,
        status: postEntity.status,
        createdById: postEntity.createdById,
        updatedById: postEntity.updatedById,
      },
    });
  }

  async deletePost(id: string): Promise<void> {
    await this.repository.post.delete({
      where: { id: id },
    });
  }

  async getPost(id: string): Promise<PostEntity> {
    return this.repository.post.findUnique({
      where: { id: id },
      include: {
        createdBy: true,
        updatedBy: true,
      },
    });
  }

  async getPosts(): Promise<PostEntity[]> {
    return this.repository.post.findMany({
      include: {
        createdBy: true,
        updatedBy: true,
        category: true,
      },
    });
  }

  async updatePost(id: string, postEntity: PostEntity): Promise<void> {
    await this.repository.post.update({
      where: {
        id: id,
      },
      data: {
        title: postEntity.title,
        description: postEntity.description,
        status: postEntity.status,
        updatedById: postEntity.updatedById,
      },
    });
  }
}
