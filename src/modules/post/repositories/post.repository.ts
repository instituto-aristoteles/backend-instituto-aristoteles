import { Injectable } from '@nestjs/common';
import { PostEntity } from '@/domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPostsFiltersDto } from '@/modules/post/application/dtos/get-posts.filters.dto';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>,
  ) {}

  async createPost(newPost: Omit<PostEntity, 'id'>) {
    await this.repository.save(newPost);
  }

  async deletePost(id: string) {
    await this.repository.delete(id);
  }

  async findPost(id: string): Promise<PostEntity> {
    return this.repository.findOne({
      where: [{ id: id }, { slug: id }],
      relations: ['createdBy', 'updatedBy', 'category'],
    });
  }

  async getPosts(filters: GetPostsFiltersDto): Promise<PostEntity[]> {
    const take = filters.pageSize;
    const skip = take * (filters.page - 1);

    return this.repository.find({
      relations: ['createdBy', 'updatedBy', 'category'],
      skip: skip,
      take: take,
      order: { createdAt: 'asc' },
    });
  }

  async updatePost(newPost: PostEntity) {
    await this.repository.update(newPost.id, newPost);
  }
}
