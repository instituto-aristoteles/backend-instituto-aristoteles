import { ApiProperty } from '@nestjs/swagger';

export class NotFoundSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  path: string;

  @ApiProperty()
  messages: string | string[];
}
