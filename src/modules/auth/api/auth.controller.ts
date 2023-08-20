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
import { JwtAuthGuard } from '../domain/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.body);
  }
}
