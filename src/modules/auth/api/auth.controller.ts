import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../application/services/auth.service';
import { IsPublic } from '@/common/decorators/is-public.decorator';
import { AuthRequest } from '../application/models/auth-request';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedSwagger } from '@/common/swagger/unauthorized.swagger';
import { UserTokenWithRefresh } from '../application/models/user-token-with-refresh';
import { LoginRequestBody } from '../application/models/login-request-body';
import { BadRequestSwagger } from '@/common/swagger/bad-request.swagger';
import { RefreshTokenBody } from '@/modules/auth/application/models/refresh-token-body';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login com usuário e senha' })
  @ApiResponse({
    status: 200,
    description: 'Logado com sucesso',
    type: UserTokenWithRefresh,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário e/ou senha incorretos',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBody({ type: LoginRequestBody })
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.user);
  }

  @IsPublic()
  @Post('refresh')
  @ApiOperation({ summary: 'Atualizar o refresh token vinculado ao usuário' })
  @ApiResponse({
    status: 200,
    description: 'Refresh token retornado',
    type: UserTokenWithRefresh,
  })
  @ApiResponse({
    status: 401,
    description: 'Ocorre caso não esteja logado com seu email e senha',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre ao enviar uma solicitação incorreta para o servidor',
    type: BadRequestSwagger,
  })
  @ApiBody({ type: RefreshTokenBody })
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() req: RefreshTokenBody) {
    return this.authService.reauthenticate(req);
  }
}
