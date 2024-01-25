import { Injectable } from '@nestjs/common';
import { PostReadDTO } from '@/modules/post/application/dtos/post.read.dto';
import { PostCreateUpdateDTO } from '@/modules/post/application/dtos/post.create.update.dto';
import {
  dtoToModel,
  modelToDTO,
  modelToDtoList,
} from '@/modules/post/util/post-converter';
import { UnprocessableEntityError } from '@/common/exceptions/unprocessable-entity.error';
import { PostRepository } from '@/modules/post/repositories/post.repository';
import { CategoryRepository } from '@/modules/category/repositories/category.repository.impl';
import { GetPostsFiltersDto } from '@/modules/post/application/dtos/get-posts.filters.dto';
import { PaginatedResponse } from '@/modules/post/application/dtos/paginated.dto';
import { UserEntity } from '@/domain/entities/user.entity';
import { PostNotFoundError } from '@/common/exceptions/post-not-found.error';
import { BulkDeletePostDto } from '@/modules/post/application/dtos/bulk-delete-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async getPosts(
    filters: GetPostsFiltersDto,
  ): Promise<PaginatedResponse<PostReadDTO>> {
    const take = filters.pageSize;
    const skip = take * (filters.page - 1);

    const posts = await this.postRepository.findAll({
      relations: ['createdBy', 'updatedBy', 'category'],
      skip: skip,
      take: take,
      where: {
        status: filters.status,
      },
      order: { createdAt: 'desc' },
    });

    const postsCount = await this.postRepository.count({
      where: {
        status: filters.status,
      },
    });

    return {
      currentPage: filters.page,
      pageSize: filters.pageSize,
      results: modelToDtoList(posts),
      totalSize: postsCount,
    };
  }

  public async findPost(id: string): Promise<PostReadDTO> {
    const post = await this.postRepository.findByCondition({
      where: [{ id: id }, { slug: id }],
      relations: ['createdBy', 'updatedBy', 'category'],
    });

    if (!post) throw new PostNotFoundError(`Post ${id} not found`);

    return modelToDTO(post);
  }

  public async createPost(
    post: PostCreateUpdateDTO,
    user: UserEntity,
  ): Promise<void> {
    if (post.categoryId) {
      const category = await this.categoryRepository.findOneById(
        post.categoryId,
      );

      if (!category) {
        throw new UnprocessableEntityError(
          `Category of id ${post.categoryId} not found`,
          'category_not_found',
        );
      }
    }

    await this.postRepository.save(dtoToModel(post, user));
  }

  public async updatePost(
    id: string,
    post: PostCreateUpdateDTO,
    user: UserEntity,
  ): Promise<void> {
    const postEntity = await this.postRepository.findByCondition({
      where: [{ id: id }, { slug: id }],
      relations: ['createdBy', 'updatedBy', 'category'],
    });
    if (!postEntity) {
      throw new PostNotFoundError('Post not found.');
    }

    if (post.categoryId) {
      const category = await this.categoryRepository.findOneById(
        post.categoryId,
      );

      if (!category) {
        throw new UnprocessableEntityError(
          `Category of id ${post.categoryId} not found`,
          'category_not_found',
        );
      }
    }

    await this.postRepository.update(id, dtoToModel(post, user, postEntity));
  }

  public async deletePost(id: string): Promise<void> {
    const postEntity = await this.postRepository.findOneById(id);

    if (!postEntity) {
      throw new PostNotFoundError('Post not found.');
    }

    await this.postRepository.remove(postEntity.id);
  }

  public async bulkDeletePosts(postIds: BulkDeletePostDto) {
    await this.postRepository.deleteMany(postIds.ids);
  }
}
