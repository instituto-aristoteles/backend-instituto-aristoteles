import { Module } from '@nestjs/common';
import { PostController } from '@/modules/post/api/post.controller';
import { PostService } from '@/modules/post/application/services/post.service';
import { PrismaService } from '@/database/prisma/service/prisma.service';
import { PostRepository } from '@/modules/post/repositories/post.repository';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { CategoryRepository } from '@/modules/category/repositories/category.repository.impl';

@Module({
  controllers: [PostController],
  providers: [
    PostRepository,
    UserRepository,
    CategoryRepository,
    PostService,
    PrismaService,
  ],
})
export class PostModule {}
