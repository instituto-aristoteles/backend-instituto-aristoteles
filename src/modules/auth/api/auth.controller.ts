import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../application/services/auth.service';
import { IsPublic } from '../../../common/decorators/is-public.decorator';
import { AuthRequest } from '../application/models/auth-request';
import { LocalAuthGuard } from '../../../common/guards/local-auth.guard';
import { RefreshTokenAuthGuard } from '../../../common/guards/refresh-token-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { UserEntity } from '../../../domain/entities/user.entity';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedSwagger } from '../../../common/swagger/unauthorized.swagger';
import { UserTokenWithRefresh } from '../application/models/user-token-with-refresh';

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
    description: 'Email e/ou senha incorretos',
    type: UnauthorizedSwagger,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.user);
  }

  @IsPublic()
  @UseGuards(RefreshTokenAuthGuard)
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
  @HttpCode(HttpStatus.OK)
  async refreshToken(@CurrentUser() user: User) {
    return await this.authService.refreshTokens(user);
  }
}
