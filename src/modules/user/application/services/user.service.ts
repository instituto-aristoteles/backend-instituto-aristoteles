import { Injectable } from '@nestjs/common';
import { UserReadDto } from '../dtos/user.read.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { UnprocessableEntityError } from '@/common/exceptions/unprocessable-entity.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUsers(): Promise<UserReadDto[]> {
    const users = await this.userRepository.getUsers();
    return users.map((u) => {
      return {
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
      };
    });
  }

  public async getUser(id: string): Promise<UserReadDto> {
    const user = await this.userRepository.getUser(id);
    if (!user) return null;
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };
  }

  public async createUser(user: CreateUserDto): Promise<void> {
    const userNameDb = await this.userRepository.getByUsername(user.username);
    if (userNameDb)
      throw new UnprocessableEntityError('Username already exists.');

    const emailDb = await this.userRepository.getByUsername(user.email);
    if (emailDb) throw new UnprocessableEntityError('Email already exists.');

    await this.userRepository.createUser({
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: !user.avatar ? null : user.avatar,
      password: await bcrypt.hash(user.password, 10),
    });
  }
}
