import { Module } from '@nestjs/common';
import { PostController } from '@/modules/post/api/post.controller';
import { PostService } from '@/modules/post/application/services/post.service';
import { PostRepository } from '@/modules/post/repositories/post.repository';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { CategoryRepository } from '@/modules/category/repositories/category.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/domain/entities/user.entity';
import { CategoryEntity } from '@/domain/entities/category.entity';
import { PostEntity } from '@/domain/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CategoryEntity, PostEntity])],
  controllers: [PostController],
  providers: [PostRepository, UserRepository, CategoryRepository, PostService],
})
export class PostModule {}
