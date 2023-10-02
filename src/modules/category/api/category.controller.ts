import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundSwagger } from '@/common/swagger/not-found.swagger';
import { UnauthorizedSwagger } from '@/common/swagger/unauthorized.swagger';
import { IsPublic } from '@/common/decorators/is-public.decorator';
import { CategoryService } from '../application/services/category.service';
import { ReadCategoryDto } from '../application/dtos/read-category.dto';
import { CreateCategoryDto } from '../application/dtos/create-category.dto';
import { UpdateCategoryDto } from '../application/dtos/update-category.dto';
import { BadRequestSwagger } from '@/common/swagger/bad-request.swagger';

@Controller('categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  @IsPublic()
  @HttpCode(200)
  @ApiOperation({ summary: 'Lista todas as categorias' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a listagem das categorias.',
    type: ReadCategoryDto,
    isArray: true,
  })
  @ApiBearerAuth()
  public async getCategories(): Promise<ReadCategoryDto[]> {
    return this.categoryService.getCategories();
  }

  @IsPublic()
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca uma categoria pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a categoria',
    type: ReadCategoryDto,
  })
  @ApiResponse({
    status: 204,
    description:
      'Ocorre quando não existe a categoria cadastrada no banco de dados.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
    type: NotFoundSwagger,
  })
  @ApiBearerAuth()
  public async getCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ReadCategoryDto> {
    return await this.categoryService.getCategory(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria uma categoria' })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar uma categoria sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async createCategory(
    @Body() category: CreateCategoryDto,
  ): Promise<void> {
    await this.categoryService.createCategory(category);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove uma categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria removida com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar uma categoria sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async deleteCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza uma categoria' })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar uma categoria sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async updateCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<void> {
    await this.categoryService.updateCategory(id, category);
  }
}
