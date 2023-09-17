import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from '@/modules/post/application/appService/post.service';
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
    type: PostReadDTO,
    isArray: true,
  })
  public async getPosts(): Promise<PostReadDTO[]> {
    return this.postService.getPosts();
  }

  @IsPublic()
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca o artigo pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o artigo pelo id',
    type: PostReadDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Artigo não encontrado pelo ID',
    type: NotFoundSwagger,
  })
  public async getPostById(@Param('id') id: string): Promise<PostReadDTO> {
    return await this.postService.findPostById(id);
  }

  @IsPublic()
  @Get(':slug')
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca o artigo pela Slug' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o artigo pela slug',
    type: PostReadDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Artigo não encontrado pela Slug',
    type: NotFoundSwagger,
  })
  public async getPostBySlug(
    @Param('slug') slug: string,
  ): Promise<PostReadDTO> {
    return await this.postService.findPostBySlug(slug);
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
  @ApiBearerAuth()
  public async createPost(@Body() post: PostCreateUpdateDTO): Promise<void> {
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
  @ApiBearerAuth()
  public async updatePost(
    @Param('id') id: string,
    @Body() post: PostCreateUpdateDTO,
  ): Promise<void> {
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
  @ApiBearerAuth()
  public async deletePost(@Param('id') id: string): Promise<void> {
    await this.postService.deletePost(id);
  }
}
