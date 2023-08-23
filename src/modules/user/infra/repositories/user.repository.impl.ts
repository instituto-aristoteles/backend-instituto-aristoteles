import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../domain/interfaces/user.repository.interface';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { PrismaService } from '../../../../database/prisma/service/prisma.service';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly repository: PrismaService) {}

  async createUser(entity: UserEntity): Promise<void> {
    await this.repository.user.create({
      data: entity,
    });
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.user.delete({
      where: { id: id },
    });
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.repository.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.repository.user.findMany();
  }

  async updateUser(id: string, entity: UserEntity): Promise<void> {
    await this.repository.user.update({
      where: {
        id: id,
      },
      data: entity,
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.repository.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.repository.user.update({
      where: {
        id: id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  }
}
