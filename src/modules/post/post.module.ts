import { Module } from '@nestjs/common';
import { PostController } from './api/post.controller';
import { PostService } from './application/appService/post.service';
import { PostRepositoryProvider } from './infra/providers/post-repository.provider';
import { PrismaService } from '../../database/prisma/service/prisma.service';
import { UserRepositoryProvider } from '../user/infra/providers/user.repository.provider';

@Module({
  controllers: [PostController],
  providers: [
    PostRepositoryProvider,
    UserRepositoryProvider,
    PostService,
    PrismaService,
  ],
})
export class PostModule {}
