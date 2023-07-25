import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../domain/interfaces/user.repository.interface';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { PrismaService } from '../../../../database/prisma/service/prisma.service';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly repository: PrismaService) {}
  async createUser(entity: UserEntity): Promise<void> {
    this.repository.user.create({
      data: entity,
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.repository.user.delete({
      where: { Id: id },
    });
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.repository.user.findUnique({
      where: {
        Id: id,
      },
    });
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.repository.user.findMany();
  }

  async updateUser(id: string, entity: UserEntity): Promise<void> {
    this.repository.user.update({
      where: {
        Id: id,
      },
      data: entity,
    });
  }
}
