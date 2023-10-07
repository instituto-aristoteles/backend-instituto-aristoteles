import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostsFiltersDto {
  @ApiProperty({ nullable: true })
  @IsInt()
  @Type(() => Number)
  pageSize: number;

  @ApiProperty({ nullable: true })
  @IsInt()
  @Type(() => Number)
  page: number;
}
