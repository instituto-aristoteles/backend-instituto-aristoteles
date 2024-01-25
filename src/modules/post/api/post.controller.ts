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
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UserEntity } from '@/domain/entities/user.entity';
import { Roles } from '@/common/decorators/user-role.decorator';
import { UserRole } from '@/domain/enums/user-role';
import { UserStatusType } from '@/common/decorators/user-status-type.decorator';
import { BulkDeletePostDto } from '@/modules/post/application/dtos/bulk-delete-post.dto';

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
  @UserStatusType('confirmed')
  @Roles(UserRole.Admin, UserRole.Editor)
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
  public async createPost(
    @Body() post: PostCreateUpdateDTO,
    @CurrentUser() user: UserEntity,
  ) {
    await this.postService.createPost(post, user);
  }

  @Put(':id')
  @UserStatusType('confirmed')
  @Roles(UserRole.Admin, UserRole.Editor)
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
    @CurrentUser() user: UserEntity,
  ) {
    await this.postService.updatePost(id, post, user);
  }

  @Delete('bulk-delete')
  @UserStatusType('confirmed')
  @Roles(UserRole.Admin, UserRole.Editor)
  @HttpCode(200)
  @ApiOperation({ summary: 'Remove uma lista de artigos' })
  @ApiResponse({
    status: 200,
    description: 'Lista removida com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar remover um artigo sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async bulkDeletePosts(@Body() ids: BulkDeletePostDto) {
    await this.postService.bulkDeletePosts(ids);
  }

  @Delete(':id')
  @UserStatusType('confirmed')
  @Roles(UserRole.Admin, UserRole.Editor)
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
