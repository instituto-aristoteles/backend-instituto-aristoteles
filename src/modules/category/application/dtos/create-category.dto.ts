import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;
}
