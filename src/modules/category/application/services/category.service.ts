import { Inject, Injectable } from '@nestjs/common';
import { ReadCategoryDto } from '../dtos/read-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryRepositoryInterface } from '../../../../domain/interfaces/category.repository.interface';
import { NotFoundSwagger } from '../../../../common/swagger/not-found.swagger';

const Repository = () => Inject('CategoryRepository');

@Injectable()
export class CategoryService {
  constructor(
    @Repository() private readonly repository: CategoryRepositoryInterface,
  ) {}

  public async createCategory(category: CreateCategoryDto): Promise<void> {
    await this.repository.createCategory({
      title: category.title,
      slug: category.slug,
      createdAt: new Date(),
    });
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.repository.deleteCategory(id);
  }

  public async getCategories(): Promise<ReadCategoryDto[]> {
    const categories = await this.repository.getCategories();
    return categories.map((c) => {
      return {
        id: c.id,
        title: c.title,
        slug: c.slug,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      };
    });
  }

  public async getCategory(id: string): Promise<ReadCategoryDto> {
    const category = await this.repository.getCategory(id);
    if (!category) return null;

    return {
      id: category.id,
      title: category.title,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  public async updateCategory(
    id: string,
    entity: UpdateCategoryDto,
  ): Promise<void> {
    await this.repository.updateCategory(id, {
      title: entity.title,
      slug: entity.slug,
      createdAt: undefined,
    });
  }
}
