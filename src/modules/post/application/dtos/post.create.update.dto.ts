import { ApiProperty } from '@nestjs/swagger';

export class PostCreateUpdateDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  coverUrl: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  createdById: string;

  @ApiProperty({
    nullable: true,
  })
  updatedById?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({
    nullable: true,
  })
  updatedAt?: Date;
}
