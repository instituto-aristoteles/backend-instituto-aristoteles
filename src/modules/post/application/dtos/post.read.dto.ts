import { UserReadDto } from '../../../user/application/dtos/user.read.dto';
import { ApiProperty } from '@nestjs/swagger';

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
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;
}
