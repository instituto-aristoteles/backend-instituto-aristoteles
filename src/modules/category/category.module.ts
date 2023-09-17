import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/service/prisma.service';
import { CategoryController } from './api/category.controller';
import { CategoryService } from './application/services/category.service';
import { CategoryRepositoryProvider } from './infra/providers/category-repository.provider';

@Module({
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService, CategoryRepositoryProvider],
})
export class CategoryModule {}
