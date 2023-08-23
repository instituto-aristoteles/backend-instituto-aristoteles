import { ApiProperty } from '@nestjs/swagger';

export class PostCreateUpdateDTO {
  @ApiProperty()
  Title: string;

  @ApiProperty()
  Description: string;

  @ApiProperty()
  PostStatus: number;

  @ApiProperty()
  CreatedById: string;

  @ApiProperty({
    nullable: true,
  })
  UpdatedById?: string;

  @ApiProperty()
  CreatedAt: Date;

  @ApiProperty({
    nullable: true,
  })
  @ApiProperty()
  UpdatedAt?: Date;
}
