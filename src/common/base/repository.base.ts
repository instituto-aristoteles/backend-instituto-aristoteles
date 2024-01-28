import { EntityBase } from '@/common/base/entity.base';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { DuplicatedKeyError } from '@/common/exceptions/duplicated-key.error';
import { DatabaseError } from '@/common/exceptions/database.error';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class RepositoryBase<T extends EntityBase<T>> {
  protected repository: Repository<T>;
  protected constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    try {
      const result = await this.repository.save(data);
      return await this.findOneById(result.id);
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

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  public async count(options?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(options);
  }

  public async findOneById(id: any): Promise<T> {
    return await this.repository.findOneBy({ id });
  }

  public async update(
    id: string,
    data: QueryDeepPartialEntity<T>,
  ): Promise<void> {
    await this.repository.update(id, data);
  }

  public async findByCondition(filter: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne(filter);
  }

  public async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
