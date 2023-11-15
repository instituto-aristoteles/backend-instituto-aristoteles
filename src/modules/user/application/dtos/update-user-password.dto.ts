import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  newPassword: string;
}
