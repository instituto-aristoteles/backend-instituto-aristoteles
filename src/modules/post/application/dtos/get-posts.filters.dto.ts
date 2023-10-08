import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PostStatus, PostStatusValues } from '@/domain/enums/post.status';

export class GetPostsFiltersDto {
  @ApiProperty({ default: 10 })
  @IsInt()
  @Type(() => Number)
  pageSize: number;

  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  page: number;

  @ApiProperty({ nullable: true, required: false, enum: PostStatusValues })
  @IsOptional()
  @IsIn(PostStatusValues)
  status?: PostStatus;
}
