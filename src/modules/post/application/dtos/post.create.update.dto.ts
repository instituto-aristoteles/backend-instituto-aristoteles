import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PostStatus, PostStatusValues } from '@/domain/enums/post.status';

export class PostCreateUpdateDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  coverUrl?: string;

  @ApiProperty({ default: 'draft' as PostStatus })
  @IsIn(PostStatusValues)
  status: PostStatus;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;
}
