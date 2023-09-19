import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/service/prisma.service';
import { PostEntity } from '@/domain/entities/post.entity';

@Injectable()
export class PostRepository {
  constructor(private readonly repository: PrismaService) {}

  async createPost(newPost: Omit<PostEntity, 'id'>) {
    await this.repository.post.create({
      data: {
        title: newPost.title,
        description: newPost.description,
        slug: newPost.slug,
        content: newPost.content,
        coverUrl: newPost.coverUrl,
        status: newPost.status,
        categoryId: newPost.categoryId,
        createdById: newPost.createdById,
        updatedById: newPost.updatedById,
      },
    });
  }

  async deletePost(id: string) {
    await this.repository.post.delete({
      where: { id },
    });
  }

  async findPost(id: string): Promise<PostEntity> {
    return this.repository.post.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        createdBy: true,
        updatedBy: true,
        category: true,
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

  async updatePost(newPost: PostEntity) {
    await this.repository.post.update({
      where: { id: newPost.id },
      data: {
        title: newPost.title,
        description: newPost.description,
        slug: newPost.slug,
        content: newPost.content,
        coverUrl: newPost.coverUrl,
        status: newPost.status,
        categoryId: newPost.categoryId,
        createdById: newPost.createdById,
        updatedById: newPost.updatedById,
      },
    });
  }
}
