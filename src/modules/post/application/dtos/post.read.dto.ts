import { UserReadDto } from '../../../user/application/dtos/user.read.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostReadDTO {
  @ApiProperty()
  Id: string;

  @ApiProperty()
  Title: string;

  @ApiProperty()
  Description: string;

  @ApiProperty()
  PostStatus: number;

  @ApiProperty()
  CreatedBy: UserReadDto;

  @ApiProperty()
  UpdatedBy?: UserReadDto;

  @ApiProperty()
  CreatedAt: Date;

  @ApiProperty()
  UpdatedAt?: Date;
}
