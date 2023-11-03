import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@/domain/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DatabaseError } from '@/common/exceptions/database.error';
import { DuplicatedKeyError } from '@/common/exceptions/duplicated-key.error';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}
  public async createCategory(
    entity: Omit<CategoryEntity, 'createdAt'>,
  ): Promise<void> {
    try {
      await this.repository.save(entity);
    } catch (e) {
      if (e.name === 'QueryFailedError') {
        if (e.code == '23505') {
          throw new DuplicatedKeyError(e.detail);
        }

        throw new DatabaseError(e.name);
      }

      throw new DatabaseError(e.name);
    }
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async getCategories(): Promise<CategoryEntity[]> {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
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

  public async bulkDeleteCategory(ids: string[]) {
    await this.repository.delete({ id: In(ids) });
  }
}
