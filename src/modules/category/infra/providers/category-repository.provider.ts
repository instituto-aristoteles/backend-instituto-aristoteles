import { Provider } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository.impl';

export const CategoryRepositoryProvider: Provider = {
  provide: 'CategoryRepository',
  useClass: CategoryRepository,
};
