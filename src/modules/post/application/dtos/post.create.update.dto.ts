import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class PostCreateUpdateDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  coverUrl?: string;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty()
  @IsUUID()
  authorId: string;
}
