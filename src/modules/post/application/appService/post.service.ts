import { Inject, Injectable } from '@nestjs/common';
import { PostRepositoryInterface } from '../../../../domain/interfaces/post.repository.interface';
import { PostReadDTO } from '../dtos/post.read.dto';
import { PostCreateUpdateDTO } from '../dtos/post.create.update.dto';
import {
  dtoToModel,
  modelToDTO,
  modelToDtoList,
} from '../../common/util/post-converter';
import { PostEntity } from '../../../../domain/entities/post.entity';
import { UserRepositoryInterface } from '../../../../domain/interfaces/user.repository.interface';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { NotFoundError } from '../../../../common/exceptions/not-found.error';
import { UnprocessableEntityError } from '../../../../common/exceptions/unprocessable-entity.error';

const Repository = () => Inject('PostRepository');
const UserRepository = () => Inject('UserRepository');

@Injectable()
export class PostService {
  constructor(
    @Repository() private readonly postRepository: PostRepositoryInterface,
    @UserRepository() private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async getPosts(): Promise<PostReadDTO[]> {
    const posts = await this.postRepository.getPosts();
    return modelToDtoList(posts);
  }

  public async getPost(id: string): Promise<PostReadDTO> {
    const post = await this.postRepository.getPost(id);
    if (!post) throw new NotFoundError(`Post with id: ${id} not found`);

    return modelToDTO(post);
  }

  public async updatePost(
    id: string,
    post: PostCreateUpdateDTO,
  ): Promise<void> {
    const postEntity: PostEntity = await this.postRepository.getPost(id);
    if (!postEntity) {
      throw new NotFoundError('Post not found.');
    }

    const userEntity: UserEntity = await this.userRepository.getUser(
      post.updatedById,
    );
    if (!userEntity) {
      throw new NotFoundError('User not found.');
    }

    await this.postRepository.updatePost(id, {
      ...postEntity,
      updatedBy: userEntity,
    });
  }

  public async createPost(post: PostCreateUpdateDTO): Promise<void> {
    if (!post.createdById) {
      throw new UnprocessableEntityError(
        'Its mandatory the post to contain a user who is creating.',
      );
    }

    await this.postRepository.createPost(dtoToModel(post));
  }

  public async deletePost(id: string): Promise<void> {
    const postEntity: PostEntity = await this.postRepository.getPost(id);
    if (!postEntity) {
      throw new NotFoundError('Post not found.');
    }

    await this.postRepository.deletePost(id);
  }
}
