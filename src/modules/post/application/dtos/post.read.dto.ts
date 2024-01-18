import { UserReadDto } from '@/modules/user/application/dtos/user.read.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ReadCategoryDto } from '@/modules/category/application/dtos/read-category.dto';
import { PostStatus } from '@/domain/enums/post.status';

export class PostReadDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  coverUrl?: string;

  @ApiProperty()
  status: PostStatus;

  @ApiProperty()
  createdBy: Pick<UserReadDto, 'id' | 'name' | 'email'>;

  @ApiProperty()
  updatedBy?: Pick<UserReadDto, 'id' | 'name' | 'email'>;

  @ApiProperty()
  category?: ReadCategoryDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}
