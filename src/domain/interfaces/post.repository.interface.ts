import { PostEntity } from '../entities/post.entity';

export interface PostRepositoryInterface {
  getPosts(): Promise<PostEntity[]>;
  createPost(postEntity: PostEntity): Promise<void>;
  updatePost(id: string, postEntity: PostEntity): Promise<void>;
  getPost(id: string): Promise<PostEntity>;
  deletePost(id: string): Promise<void>;
}
