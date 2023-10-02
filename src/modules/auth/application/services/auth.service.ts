import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../models/user-payload';

import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '@/common/exceptions/unauthorized.error';
import { UserTokenWithRefresh } from '../models/user-token-with-refresh';
import * as process from 'process';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { UserEntity } from '@/domain/entities/user.entity';
import { RefreshTokenBody } from '@/modules/auth/application/models/refresh-token-body';
import { NotFoundError } from '@/common/exceptions/not-found.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEntity): Promise<UserTokenWithRefresh> {
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserEntity, 'postsUpdated' | 'postsCreated'>> {
    const user = await this.userRepository.getUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: undefined,
          refreshToken: user.refreshToken,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }

  private async verifyRefreshToken(
    body: RefreshTokenBody,
  ): Promise<UserEntity> {
    try {
      await this.jwtService.verify(body.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (e: any) {
      if (e.name === 'JsonWebTokenError' || e.name === 'SyntaxError') {
        throw new UnauthorizedError('Invalid signature');
      }

      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Expired token');
      }

      throw new UnauthorizedError(e.name);
    }

    const email = this.jwtService.decode(body.refreshToken)['email'];
    if (!email)
      throw new NotFoundError('User not found or refresh token is invalid.');

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new NotFoundError('User not found');

    return user;
  }

  async reauthenticate(body: RefreshTokenBody) {
    const payload: UserEntity = await this.verifyRefreshToken(body);

    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(payload.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<void> {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(id, hash);
  }

  private async getTokens(user: UserEntity): Promise<UserTokenWithRefresh> {
    const jwtPayload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '8h',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: access_token,
      refreshToken: refresh_token,
    };
  }
}
