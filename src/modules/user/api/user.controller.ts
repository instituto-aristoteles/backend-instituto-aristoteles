import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../application/appService/user.service';
import { UserCreateUpdateDto } from '../application/dtos/user.create.update.dto';
import { UserReadDto } from '../application/dtos/user.read.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @HttpCode(200)
  public async getUsers(): Promise<UserReadDto[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  public async getUser(@Param('id') id: string): Promise<UserReadDto> {
    return await this.userService.getUser(id);
  }

  @Post()
  @HttpCode(201)
  public async createUser(@Body() user: UserCreateUpdateDto): Promise<void> {
    await this.userService.createUser(user);
  }

  @Post('login')
  @HttpCode(200)
  public async loginUser(@Body() {}): Promise<unknown> {
    return {};
  }

  @Put(':id')
  @HttpCode(200)
  public async updateUser(
    @Param('id') id: string,
    @Body() user: UserCreateUpdateDto,
  ): Promise<void> {
    await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(200)
  public async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
