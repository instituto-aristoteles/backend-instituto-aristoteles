import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@/modules/user/application/services/user.service';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { UserReadDto } from '../application/dtos/user.read.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UserEntity } from '@/domain/entities/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnauthorizedSwagger } from '@/common/swagger/unauthorized.swagger';
import { NotFoundSwagger } from '@/common/swagger/not-found.swagger';
import { BadRequestSwagger } from '@/common/swagger/bad-request.swagger';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { CurrentUserInterceptor } from '@/common/interceptors/current-user.interceptor';
import { Roles } from '@/common/decorators/user-role.decorator';
import { UserRole } from '@/domain/enums/user-role';
import { UpdateUserPasswordDto } from '@/modules/user/application/dtos/update-user-password.dto';
import { UserStatusType } from '@/common/decorators/user-status-type.decorator';
import { UserStatusGuard } from '@/common/guards/user-status.guard';
import { UpdateUserProfileDto } from '@/modules/user/application/dtos/update-user-profile.dto';
import { UpdateUserRoleDto } from '@/modules/user/application/dtos/update-user-role.dto';

@Controller('users')
@ApiTags('users')
@UseInterceptors(CurrentUserInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.Admin)
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
    description: 'Ocorre ao tentar listar os usuários sem estar logado',
  })
  @ApiBearerAuth()
  public async getUsers(): Promise<UserReadDto[]> {
    return this.userService.getUsers();
  }

  @Put('me')
  @UseGuards(UserStatusGuard)
  @UserStatusType('confirmed')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Atualiza o perfil do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil atualizado',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar atualizar um usuário sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async updateUserProfile(
    @CurrentUser() user: Pick<UserEntity, 'id'>,
    @Body() profile: UpdateUserProfileDto,
  ) {
    await this.userService.updateUserProfile(user.id, profile);
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
    description: 'Ocorre ao buscar criar um usuário sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiBearerAuth()
  public async getCurrentUser(
    @CurrentUser()
    user: Pick<
      UserEntity,
      'id' | 'name' | 'email' | 'avatar' | 'username' | 'role' | 'status'
    >,
  ): Promise<UserReadDto> {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
    };
  }

  @Get(':id')
  @Roles(UserRole.Admin)
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
    description: 'Ocorre ao tentar buscar um usuário sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiBearerAuth()
  public async getUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserReadDto> {
    return this.userService.getUser(id);
  }

  @Post()
  @Roles(UserRole.Admin)
  @HttpCode(201)
  @ApiOperation({ summary: 'Cria um usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar criar um usuário sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async createUser(@Body() user: CreateUserDto): Promise<void> {
    await this.userService.createUser(user);
  }

  @Put(':id')
  @HttpCode(200)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: 'Atualiza o papel(role) do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Role atualizada',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar atualizar um usuário sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async updateUserRole(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() role: UpdateUserRoleDto,
  ) {
    await this.userService.updateUserRole(id, role);
  }

  @Put(':id/reset-password')
  @HttpCode(200)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: 'Reseta a senha do usuário e retorna o status para Não Confirmado',
  })
  @ApiResponse({
    status: 200,
    description: 'Senha resetada',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar atualizar um usuário sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async resetUserPassword(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.resetUserPassword(id);
  }

  @Put('me/activate-user')
  @HttpCode(200)
  @UserStatusType('unconfirmed')
  @ApiOperation({
    summary:
      'Atualiza a senha e ativa o usuário com status "Não Confirmado" para "Confirmado"',
  })
  @ApiResponse({
    status: 200,
    description: 'Senha atualizada e usuário ativado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar atualizar um usuário sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 403,
    description:
      'Ocorre ao tentar acessar o endpoint com um usuário já confirmado',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async activateUser(
    @CurrentUser() user: Pick<UserEntity, 'id'>,
    @Body() oldAndNewPassword: UpdateUserPasswordDto,
  ): Promise<void> {
    await this.userService.activateUser(user.id, oldAndNewPassword);
  }

  @Put('me/update-password')
  @UserStatusType('confirmed')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Atualiza a senha do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Senha atualizada',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar atualizar um usuário sem estar logado',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async updateUserPassword(
    @CurrentUser() user: Pick<UserEntity, 'id'>,
    @Body() oldAndNewPassword: UpdateUserPasswordDto,
  ) {
    await this.userService.updateUserPassword(user.id, oldAndNewPassword);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Remove um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário removido',
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre ao tentar fazer uma requisição sem estar logado.',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 403,
    description:
      'Somente usuários com o papel de Admin podem fazer essa requisição',
    type: ForbiddenException,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteUser(id);
  }
}
