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
    return modelToDTO(post);
  }

  public async updatePost(
    id: string,
    post: PostCreateUpdateDTO,
  ): Promise<void> {
    let postEntity: PostEntity = await this.postRepository.getPost(id);
    if (!postEntity) {
      throw new Error('Post not found.');
    }

    const userEntity: UserEntity = await this.userRepository.getUser(
      post.UpdatedById,
    );
    if (!userEntity) {
      throw new Error('User not found.');
    }

    postEntity = {
      ...post,
      UpdatedBy: userEntity,
    };
    await this.postRepository.updatePost(id, postEntity);
  }

  public async createPost(post: PostCreateUpdateDTO): Promise<void> {
    if (!post.CreatedById) {
      throw new Error(
        'Its mandatory the post to contain a user who is creating.',
      );
    }

    await this.postRepository.createPost(dtoToModel(post));
  }

  public async deletePost(id: string): Promise<void> {
    const postEntity: PostEntity = await this.postRepository.getPost(id);
    if (!postEntity) {
      throw new Error('Post not found.');
    }

    await this.postRepository.deletePost(id);
  }
}
