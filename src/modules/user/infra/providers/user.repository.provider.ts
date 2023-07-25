import { Provider } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository.impl';

export const UserRepositoryProvider: Provider = {
  provide: 'UserRepository',
  useClass: UserRepository,
};
