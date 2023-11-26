import { Injectable } from '@nestjs/common';
import { PostEntity } from '@/domain/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositoryBase } from '@/common/base/repository.base';

@Injectable()
export class PostRepository extends RepositoryBase<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    repository: Repository<PostEntity>,
  ) {
    super(repository);
  }
}
