import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../models/user-payload';

import * as bcrypt from 'bcrypt';
import { UserTokenWithRefresh } from '../models/user-token-with-refresh';
import * as process from 'process';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { UserEntity } from '@/domain/entities/user.entity';
import { RefreshTokenBody } from '@/modules/auth/application/models/refresh-token-body';
import { InvalidTokenError } from '@/common/exceptions/invalid-token.error';
import { TokenExpiredError } from '@/common/exceptions/token-expired.error';
import { UserNotFoundError } from '@/common/exceptions/user-not-found.error';
import { UserError } from '@/common/exceptions/user.error';

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
    username: string,
    password: string,
  ): Promise<Omit<UserEntity, 'postsUpdated' | 'postsCreated' | 'password'>> {
    const user = await this.userRepository.getByUsername(username);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          id: user.id,
          name: user.name,
          role: user.role,
          status: user.status,
          email: user.email,
          avatar: user.avatar,
          username: user.username,
          refreshToken: user.refreshToken,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }
    }

    throw new UserError('Username or password provided is incorrect.');
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
        throw new InvalidTokenError('Invalid signature');
      }

      if (e.name === 'TokenExpiredError') {
        throw new TokenExpiredError('Expired token');
      }

      throw new InvalidTokenError(e.name);
    }

    const username = this.jwtService.decode(body.refreshToken)['username'];
    if (!username)
      throw new UserNotFoundError(
        'User not found or refresh token is invalid.',
      );

    const user = await this.userRepository.getByUsername(username);
    if (!user) throw new UserNotFoundError('User not found');

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
      name: user.name,
      preferred_username: user.username,
      role: user.role,
      email: user.email,
      picture: user.avatar,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '8h',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    const exp = this.jwtService.decode(accessToken)['exp'];
    return {
      expiresIn: new Date(exp * 1000).toISOString(),
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
