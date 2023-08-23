import { UserToken } from './user-token';
import { ApiProperty } from '@nestjs/swagger';

export class UserTokenWithRefresh implements UserToken {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  access_token: string;
}
