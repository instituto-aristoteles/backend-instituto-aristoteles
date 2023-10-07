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
  Query,
} from '@nestjs/common';
import { PostService } from '@/modules/post/application/services/post.service';
import { PostCreateUpdateDTO } from '@/modules/post/application/dtos/post.create.update.dto';
import { PostReadDTO } from '@/modules/post/application/dtos/post.read.dto';
import { IsPublic } from '@/common/decorators/is-public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnauthorizedSwagger } from '@/common/swagger/unauthorized.swagger';
import { NotFoundSwagger } from '@/common/swagger/not-found.swagger';
import { BadRequestSwagger } from '@/common/swagger/bad-request.swagger';
import { GetPostsFiltersDto } from '@/modules/post/application/dtos/get-posts.filters.dto';
import { PaginatedResponse } from '@/modules/post/application/dtos/paginated.dto';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @IsPublic()
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Lista todos os artigos criados até o momento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos os artigos',
    type: PaginatedResponse<PostReadDTO>,
  })
  public async getPosts(@Query() filters: GetPostsFiltersDto) {
    return this.postService.getPosts(filters);
  }

  @IsPublic()
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca o artigo pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o artigo pelo idOrSlug',
    type: PostReadDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Artigo não encontrado pelo ID',
    type: NotFoundSwagger,
  })
  public async getPost(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.postService.findPost(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Criação de um artigo' })
  @ApiResponse({
    status: 201,
    description: 'Artigo criado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar um artigo sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async createPost(@Body() post: PostCreateUpdateDTO) {
    await this.postService.createPost(post);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualiza um artigo' })
  @ApiResponse({
    status: 200,
    description: 'Artigo atualizado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar um artigo sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async updatePost(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() post: PostCreateUpdateDTO,
  ) {
    await this.postService.updatePost(id, post);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove um artigo' })
  @ApiResponse({
    status: 200,
    description: 'Artigo removido com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar um artigo sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async deletePost(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.postService.deletePost(id);
  }
}
