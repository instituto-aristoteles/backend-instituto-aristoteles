import { UserReadDto } from '../../../user/application/dtos/user.read.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ReadCategoryDto } from '../../../category/application/dtos/read-category.dto';

export class PostReadDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  createdBy: UserReadDto;

  @ApiProperty()
  updatedBy?: UserReadDto;

  @ApiProperty()
  category?: ReadCategoryDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}
