import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;
}
