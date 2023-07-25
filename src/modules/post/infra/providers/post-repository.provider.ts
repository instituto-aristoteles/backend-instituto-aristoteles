import { Provider } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository.impl';

export const PostRepositoryProvider: Provider = {
  provide: 'PostRepository',
  useClass: PostRepository,
};
