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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.user);
  }

  @IsPublic()
  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@CurrentUser('refreshToken') user: UserEntity) {
    return await this.authService.refreshTokens(user as User);
  }
}
