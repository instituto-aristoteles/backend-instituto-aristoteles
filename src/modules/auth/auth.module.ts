import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/services/auth.service';
import { PrismaService } from '@/database/prisma/service/prisma.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { LoginValidationMiddleware } from '@/common/middlewares/login-validation.middleware';
import { JwtStrategy } from '@/common/strategies/jwt.strategy';
import { LocalStrategy } from '@/common/strategies/local.strategy';
import { JwtRefreshTokenStrategy } from '@/common/strategies/jwt-refresh-token.strategy';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('auth/login');
  }
}
