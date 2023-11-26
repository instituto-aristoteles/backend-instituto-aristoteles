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

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async getPosts(
    filters: GetPostsFiltersDto,
  ): Promise<PaginatedResponse<PostReadDTO>> {
    const posts = await this.postRepository.getPosts(filters);

    return {
      currentPage: filters.page,
      pageSize: filters.pageSize,
      results: modelToDtoList(posts),
    };
  }

  public async findPost(id: string): Promise<PostReadDTO> {
    const post = await this.postRepository.findPost(id);

    if (!post) throw new PostNotFoundError(`Post ${id} not found`);

    return modelToDTO(post);
  }

  public async createPost(
    post: PostCreateUpdateDTO,
    user: UserEntity,
  ): Promise<void> {
    if (post.categoryId) {
      const category = await this.categoryRepository.findOne(post.categoryId);

      if (!category) {
        throw new UnprocessableEntityError(
          `Category of id ${post.categoryId} not found`,
          'category_not_found',
        );
      }
    }

    await this.postRepository.createPost(dtoToModel(post, user));
  }

  public async updatePost(
    id: string,
    post: PostCreateUpdateDTO,
    user: UserEntity,
  ): Promise<void> {
    const postEntity = await this.postRepository.findPost(id);
    if (!postEntity) {
      throw new PostNotFoundError('Post not found.');
    }

    if (post.categoryId) {
      const category = await this.categoryRepository.findOne(post.categoryId);

      if (!category) {
        throw new UnprocessableEntityError(
          `Category of id ${post.categoryId} not found`,
          'category_not_found',
        );
      }
    }

    await this.postRepository.updatePost(dtoToModel(post, user, postEntity));
  }

  public async deletePost(id: string): Promise<void> {
    const postEntity = await this.postRepository.findPost(id);

    if (!postEntity) {
      throw new PostNotFoundError('Post not found.');
    }

    await this.postRepository.deletePost(postEntity.id);
  }
}
