import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../application/services/auth.service';
import { IsPublic } from '../domain/decorators/is-public.decorator';
import { AuthRequest } from '../application/models/auth-request';
import { LocalAuthGuard } from '../domain/guards/local-auth.guard';

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
}
