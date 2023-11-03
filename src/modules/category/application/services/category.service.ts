import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { ReadCategoryDto } from '../dtos/read-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { NotFoundError } from '@/common/exceptions/not-found.error';
import { CategoryRepository } from '@/modules/category/repositories/category.repository.impl';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  public async createCategory(category: CreateCategoryDto): Promise<void> {
    await this.repository.createCategory({
      title: category.title,
      slug: slugify(category.title, { lower: true }),
    });
  }

  public async deleteCategory(id: string): Promise<void> {
    const category = await this.repository.getCategory(id);
    if (!category) throw new NotFoundError('Category not found.');

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
    if (!category) throw new NotFoundError('Category not found');

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
    const category = await this.repository.getCategory(id);
    if (!category) throw new NotFoundError('Category not found.');

    await this.repository.updateCategory(id, {
      title: entity.title,
      slug: slugify(entity.title, { lower: true }),
      createdAt: undefined,
    });
  }
}
