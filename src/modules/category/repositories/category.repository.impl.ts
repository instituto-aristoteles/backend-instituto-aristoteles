import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@/domain/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}
  public async createCategory(
    entity: Omit<CategoryEntity, 'createdAt'>,
  ): Promise<void> {
    await this.repository.save(entity);
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async getCategories(): Promise<CategoryEntity[]> {
    return this.repository.find();
  }

  public async getCategory(id: string): Promise<CategoryEntity> {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  public async updateCategory(
    id: string,
    entity: CategoryEntity,
  ): Promise<void> {
    await this.repository.update(id, entity);
  }
}
