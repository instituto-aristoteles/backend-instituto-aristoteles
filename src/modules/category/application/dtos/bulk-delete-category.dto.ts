import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class BulkDeleteCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  ids: string[];
}
