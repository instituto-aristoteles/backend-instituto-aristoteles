import { Injectable } from '@nestjs/common';
import { PostReadDTO } from '@/modules/post/application/dtos/post.read.dto';
import { PostCreateUpdateDTO } from '@/modules/post/application/dtos/post.create.update.dto';
import {
  dtoToModel,
  modelToDTO,
  modelToDtoList,
} from '@/modules/post/util/post-converter';
import { NotFoundError } from '@/common/exceptions/not-found.error';
import { UnprocessableEntityError } from '@/common/exceptions/unprocessable-entity.error';
import { PostRepository } from '@/modules/post/repositories/post.repository';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { CategoryRepository } from '@/modules/category/repositories/category.repository.impl';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async getPosts(): Promise<PostReadDTO[]> {
    const posts = await this.postRepository.getPosts();
    return modelToDtoList(posts);
  }

  public async findPost(id: string): Promise<PostReadDTO> {
    const post = await this.postRepository.findPost(id);

    if (!post) throw new NotFoundError(`Post ${id} not found`);

    return modelToDTO(post);
  }

  public async createPost(post: PostCreateUpdateDTO): Promise<void> {
    const author = await this.userRepository.getUser(post.authorId);

    if (!author) {
      throw new UnprocessableEntityError(
        `Author of id ${post.authorId} not found`,
      );
    }

    if (post.categoryId) {
      const category = await this.categoryRepository.getCategory(
        post.categoryId,
      );

      if (!category) {
        throw new UnprocessableEntityError(
          `Category of id ${post.categoryId} not found`,
        );
      }
    }

    await this.postRepository.createPost(dtoToModel(post));
  }

  public async updatePost(
    id: string,
    post: PostCreateUpdateDTO,
  ): Promise<void> {
    const postEntity = await this.postRepository.findPost(id);
    if (!postEntity) {
      throw new NotFoundError('Post not found.');
    }

    const author = await this.userRepository.getUser(post.authorId);
    if (!author) {
      throw new UnprocessableEntityError(
        `Author of id ${post.authorId} not found`,
      );
    }

    if (post.categoryId) {
      const category = await this.categoryRepository.getCategory(
        post.categoryId,
      );

      if (!category) {
        throw new UnprocessableEntityError(
          `Category of id ${post.categoryId} not found`,
        );
      }
    }

    await this.postRepository.updatePost(dtoToModel(post, postEntity));
  }

  public async deletePost(id: string): Promise<void> {
    const postEntity = await this.postRepository.findPost(id);

    if (!postEntity) {
      throw new NotFoundError('Post not found.');
    }

    await this.postRepository.deletePost(postEntity.id);
  }
}
