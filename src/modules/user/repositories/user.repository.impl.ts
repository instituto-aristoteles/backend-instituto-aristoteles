import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createUser(
    entity: Pick<UserEntity, 'name' | 'email' | 'password' | 'avatar'>,
  ): Promise<void> {
    await this.repository.save(entity);
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async updateUser(id: string, entity: UserEntity): Promise<void> {
    await this.repository.update(id, entity);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { email: email } });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.repository.update(id, { refreshToken: refreshToken });
  }
}
