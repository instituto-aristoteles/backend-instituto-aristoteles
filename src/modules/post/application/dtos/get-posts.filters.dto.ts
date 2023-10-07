import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostsFiltersDto {
  @ApiProperty({ default: 10 })
  @IsInt()
  @Type(() => Number)
  pageSize: number;

  @ApiProperty({ default: 1 })
  @IsInt()
  @Type(() => Number)
  page: number;

  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  status?: number;
}
