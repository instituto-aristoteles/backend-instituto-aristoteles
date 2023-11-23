import { Injectable } from '@nestjs/common';
import { UserReadDto } from '../dtos/user.read.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { UpdateUserPasswordDto } from '@/modules/user/application/dtos/update-user-password.dto';
import { UserNotFoundError } from '@/common/exceptions/user-not-found.error';
import { InvalidUserPasswordError } from '@/common/exceptions/invalid-user-password.error';
import { generateRandomPassword } from '@/common/util/string.util';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateUserProfileDto } from '@/modules/user/application/dtos/update-user-profile.dto';
import { UpdateUserRoleDto } from '@/modules/user/application/dtos/update-user-role.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
  ) {}

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
    const password = generateRandomPassword(25);

    const isCreated = await this.userRepository.createUser({
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: !user.avatar ? null : user.avatar,
      password: await bcrypt.hash(password, 10),
    });

    if (isCreated) {
      const mail = {
        to: user.email,
        from: '"Instituto Aristoteles" <contato.instituto.aristoteles@gmail.com>',
        subject: 'Bem vindo ao Instituto Aristóteles!',
        template: 'user-password',
        context: {
          username: user.username,
          password: password,
          name: user.name,
        },
      };

      await this.mailerService.sendMail(mail);
    }
  }

  public async updateUserProfile(id: string, profile: UpdateUserProfileDto) {
    await this.userRepository.updateProfileUser(id, profile);
  }

  public async updateUserRole(id: string, userRole: UpdateUserRoleDto) {
    await this.userRepository.updateUserRole(id, userRole.role);
  }

  public async activateUser(
    id: string,
    oldAndNewPassword: UpdateUserPasswordDto,
  ): Promise<void> {
    const password = await this.getUserPassword(id, oldAndNewPassword);

    await this.userRepository.activateUser(id, password, 'confirmed');
  }

  public async updateUserPassword(
    id: string,
    oldAndNewPassword: UpdateUserPasswordDto,
  ) {
    const password = await this.getUserPassword(id, oldAndNewPassword);

    await this.userRepository.updatePassword(id, password);
  }

  private async getUserPassword(
    id: string,
    oldAndNewPassword: UpdateUserPasswordDto,
  ) {
    const user = await this.userRepository.getUser(id);
    if (!user) throw new UserNotFoundError(`User not found with id ${id}`);

    const isValidPassword = await bcrypt.compare(
      oldAndNewPassword.oldPassword,
      user.password,
    );

    if (!isValidPassword)
      throw new InvalidUserPasswordError('Please enter correct old password');

    return await bcrypt.hash(oldAndNewPassword.newPassword, 10);
  }
}
