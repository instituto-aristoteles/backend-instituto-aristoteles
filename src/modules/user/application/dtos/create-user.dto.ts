import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsString()
  role: UserRole;
}
