import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryBase } from '@/common/base/repository.base';

@Injectable()
export class UserRepository extends RepositoryBase<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
