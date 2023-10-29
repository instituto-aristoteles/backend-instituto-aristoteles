import { UserToken } from './user-token';
import { ApiProperty } from '@nestjs/swagger';

export class UserTokenWithRefresh implements UserToken {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresIn: string;
}
