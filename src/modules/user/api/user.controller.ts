import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from '../application/appService/user.service';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { UserReadDto } from '../application/dtos/user.read.dto';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { UserEntity } from '../../../domain/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  public async getUsers(): Promise<UserReadDto[]> {
    return this.userService.getUsers();
  }

  @Get('id')
  @HttpCode(200)
  public async getUser(@Param('id') id: string): Promise<UserReadDto> {
    return this.userService.getUser(id);
  }

  @Get('me')
  @HttpCode(200)
  public async getCurrentUser(
    @CurrentUser() user: UserEntity,
  ): Promise<UserReadDto> {
    return user;
  }

  @Post()
  @HttpCode(201)
  public async createUser(@Body() user: CreateUserDto): Promise<void> {
    await this.userService.createUser(user);
  }
}
