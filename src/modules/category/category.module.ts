import { Module } from '@nestjs/common';
import { CategoryController } from './api/category.controller';
import { CategoryService } from './application/services/category.service';
import { CategoryRepository } from '@/modules/category/repositories/category.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@/domain/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
