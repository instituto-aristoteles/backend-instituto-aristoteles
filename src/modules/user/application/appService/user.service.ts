import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../domain/interfaces/user.repository.interface';
import { UserReadDto } from '../dtos/user.read.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

import * as bcrypt from 'bcrypt';

const Repository = () => Inject('UserRepository');

@Injectable()
export class UserService {
  constructor(
    @Repository() private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async getUsers(): Promise<UserReadDto[]> {
    const users = await this.userRepository.getUsers();
    return users.map((u) => {
      return {
        id: u.id,
        name: u.name,
        email: u.email,
      };
    });
  }

  public async getUser(id: string): Promise<UserReadDto> {
    const user = await this.userRepository.getUser(id);
    return {
      name: user.name,
      email: user.email,
    };
  }

  public async getUserByEmail(email: string): Promise<UserReadDto> {
    const user = await this.userRepository.getUserByEmail(email);
    return {
      ...user,
    };
  }

  public async createUser(user: CreateUserDto): Promise<void> {
    await this.userRepository.createUser({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
  }
}
