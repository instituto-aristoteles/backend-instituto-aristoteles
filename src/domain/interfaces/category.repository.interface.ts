import { CategoryEntity } from '../entities/category.entity';

export interface CategoryRepositoryInterface {
  getCategories(): Promise<CategoryEntity[]>;
  getCategory(id: string): Promise<CategoryEntity>;
  createCategory(entity: CategoryEntity): Promise<void>;
  updateCategory(id: string, entity: CategoryEntity): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
