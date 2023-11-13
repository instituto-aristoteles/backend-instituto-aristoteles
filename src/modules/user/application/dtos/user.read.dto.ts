import { ApiProperty } from '@nestjs/swagger';

export class UserReadDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true })
  avatar?: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  status: string;
}
