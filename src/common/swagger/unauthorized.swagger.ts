import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  path: string;

  @ApiProperty()
  message: string;
}
