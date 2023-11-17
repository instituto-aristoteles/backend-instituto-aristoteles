import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@/domain/enums/user-status';
import { UserRole } from '@/domain/enums/user-role';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsString()
  role: UserRole;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  status?: UserStatus;
}
