import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '@/domain/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RepositoryBase } from '@/common/base/repository.base';

@Injectable()
export class CategoryRepository extends RepositoryBase<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    repository: Repository<CategoryEntity>,
  ) {
    super(repository);
  }

  public async deleteMany(ids: string[]) {
    await this.repository.delete({ id: In(ids) });
  }
}
