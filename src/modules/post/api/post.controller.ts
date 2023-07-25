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
import { PostService } from '../application/appService/post.service';
import { PostCreateUpdateDTO } from '../application/dtos/post.create.update.dto';
import { PostReadDTO } from '../application/dtos/post.read.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  @HttpCode(200)
  public async getPosts(): Promise<PostReadDTO[]> {
    return this.postService.getPosts();
  }

  @Get(':id')
  @HttpCode(200)
  public async getPost(@Param('id') id: string): Promise<PostReadDTO> {
    return await this.postService.getPost(id);
  }

  @Post()
  @HttpCode(201)
  public async createPost(@Body() post: PostCreateUpdateDTO): Promise<void> {
    await this.postService.createPost(post);
  }

  @Put(':id')
  @HttpCode(200)
  public async updatePost(
    @Param('id') id: string,
    @Body() post: PostCreateUpdateDTO,
  ): Promise<void> {
    await this.postService.updatePost(id, post);
  }

  @Delete(':id')
  @HttpCode(200)
  public async deletePost(@Param('id') id: string): Promise<void> {
    await this.postService.deletePost(id);
  }
}
