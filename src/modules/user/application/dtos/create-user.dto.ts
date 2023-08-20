import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from '../../../../domain/entities/user.entity';

export class CreateUserDto extends UserEntity {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
