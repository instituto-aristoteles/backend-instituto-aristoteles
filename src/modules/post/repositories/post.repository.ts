import { Injectable } from '@nestjs/common';
import { PostEntity } from '@/domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPostsFiltersDto } from '@/modules/post/application/dtos/get-posts.filters.dto';
import { DatabaseError } from '@/common/exceptions/database.error';
import { DuplicatedKeyError } from '@/common/exceptions/duplicated-key.error';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repository: Repository<PostEntity>,
  ) {}

  async createPost(entity: Omit<PostEntity, 'id'>) {
    try {
      await this.repository.save(entity);
    } catch (e) {
      if (e.name === 'QueryFailedError') {
        if (e.code == '23505') {
          throw new DuplicatedKeyError(e.detail);
        }

        throw new DatabaseError(e.name);
      }

      throw new DatabaseError(e.name);
    }
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
      where: {
        status: filters.status,
      },
      order: { createdAt: 'desc' },
    });
  }

  async updatePost(newPost: PostEntity) {
    await this.repository.update(newPost.id, newPost);
  }
}
