import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../domain/interfaces/user.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserToken } from '../models/user-token';
import { UserPayload } from '../models/user-payload';

import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from '../../domain/errors/unauthorized.error';
const UserRepository = () => Inject('UserRepository');
@Injectable()
export class AuthService {
  constructor(
    @UserRepository() private readonly userRepository: UserRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
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
          createdat: user.createdat,
          updatedat: user.updatedat,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
