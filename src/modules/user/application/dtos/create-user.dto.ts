import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @MaxLength(20)
  @ApiProperty()
  password: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;
}
