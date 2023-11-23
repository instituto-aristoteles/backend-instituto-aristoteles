import { UserRole } from '@/domain/enums/user-role';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto {
  @IsString()
  @ApiProperty()
  role: UserRole;
}
