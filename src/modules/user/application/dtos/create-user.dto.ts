import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from '@/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends UserEntity {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  password: string;
}
