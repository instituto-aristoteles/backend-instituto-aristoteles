import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@/domain/entities/category.entity';
import { PrismaService } from '@/database/prisma/service/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly repository: PrismaService) {}
  public async createCategory(entity: CategoryEntity): Promise<void> {
    await this.repository.category.create({
      data: entity,
    });
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.repository.category.delete({
      where: {
        id: id,
      },
    });
  }

  public async getCategories(): Promise<CategoryEntity[]> {
    return this.repository.category.findMany();
  }

  public async getCategory(id: string): Promise<CategoryEntity> {
    return this.repository.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async updateCategory(
    id: string,
    entity: CategoryEntity,
  ): Promise<void> {
    await this.repository.category.update({
      where: {
        id: id,
      },
      data: entity,
    });
  }
}
