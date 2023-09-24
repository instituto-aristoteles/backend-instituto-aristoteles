import { Module } from '@nestjs/common';
import { PrismaService } from '@/database/prisma/service/prisma.service';
import { CategoryController } from './api/category.controller';
import { CategoryService } from './application/services/category.service';
import { CategoryRepository } from '@/modules/category/repositories/category.repository.impl';

@Module({
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService, CategoryRepository],
})
export class CategoryModule {}
