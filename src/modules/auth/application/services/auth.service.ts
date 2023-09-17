import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../domain/interfaces/user.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserPayload } from '../models/user-payload';

import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '../../../../domain/exceptions/unauthorized.error';
import { UserTokenWithRefresh } from '../models/user-token-with-refresh';
import * as process from 'process';

const UserRepository = () => Inject('UserRepository');

@Injectable()
export class AuthService {
  constructor(
    @UserRepository() private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserTokenWithRefresh> {
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async validateUser(email: string, password: string): Promise<User> {
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

  async refreshTokens(user: User) {
    const userDb = await this.userRepository.getUserByEmail(user.email);
    if (!userDb) throw new ForbiddenException('Access denied');

    const isPasswordValid = await bcrypt.compare(
      user.refreshToken,
      userDb.refreshToken,
    );

    if (!isPasswordValid) throw new ForbiddenException('Access denied');
    const tokens = await this.getTokens(userDb as User);
    await this.updateRefreshToken(userDb.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(id, hash);
  }

  async getTokens(user: User): Promise<UserTokenWithRefresh> {
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
