import { Injectable } from '@nestjs/common';
import { UserReadDto } from '../dtos/user.read.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { UserEntity } from '@/domain/entities/user.entity';
import { UpdateUserPasswordDto } from '@/modules/user/application/dtos/update-user-password.dto';
import { UserNotFoundError } from '@/common/exceptions/user-not-found.error';
import { InvalidUserPasswordError } from '@/common/exceptions/invalid-user-password.error';

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
        avatar: u.avatar,
        role: u.role,
        status: u.status,
      };
    });
  }

  public async getUser(id: string): Promise<UserReadDto> {
    const user = await this.userRepository.getUser(id);
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
    };
  }

  public async createUser(user: CreateUserDto): Promise<void> {
    await this.userRepository.createUser({
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: !user.avatar ? null : user.avatar,
      password: await bcrypt.hash(user.password, 10),
    });
  }

  public async updateUserPassword(
    id: string,
    oldAndNewPassword: UpdateUserPasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.getUser(id);
    if (!user) throw new UserNotFoundError(`User not found with id ${id}`);

    const isValidPassword = await bcrypt.compare(
      oldAndNewPassword.oldPassword,
      user.password,
    );

    if (!isValidPassword)
      throw new InvalidUserPasswordError('Please enter correct old password');

    const hashPassword = await bcrypt.hash(oldAndNewPassword.newPassword, 10);

    await this.userRepository.updatePassword(id, hashPassword, 'confirmed');
  }
}
