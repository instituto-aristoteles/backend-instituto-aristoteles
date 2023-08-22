import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from '../application/appService/user.service';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { UserReadDto } from '../application/dtos/user.read.dto';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { UserEntity } from '../../../domain/entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedSwagger } from '../../../common/swagger/unauthorized.swagger';
import { NotFoundSwagger } from '../../../common/swagger/not-found.swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a listagem de usuários criados no banco',
    type: UserReadDto,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar um artigo sem estar logado',
  })
  public async getUsers(): Promise<UserReadDto[]> {
    return this.userService.getUsers();
  }

  @Get('id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o usuário pelo id',
    type: UserReadDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado pelo ID',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar um artigo sem estar logado',
    type: UnauthorizedSwagger,
  })
  public async getUser(@Param('id') id: string): Promise<UserReadDto> {
    return this.userService.getUser(id);
  }

  @Get('me')
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca o usuário baseado no token' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o respectivo usuário',
    type: UserReadDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar um artigo sem estar logado',
    type: UnauthorizedSwagger,
  })
  public async getCurrentUser(
    @CurrentUser() user: UserEntity,
  ): Promise<UserReadDto> {
    return user;
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar um artigo sem estar logado',
    type: UnauthorizedSwagger,
  })
  public async createUser(@Body() user: CreateUserDto): Promise<void> {
    await this.userService.createUser(user);
  }
}
