import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseError } from '@/common/exceptions/database.error';
import { DuplicatedKeyError } from '@/common/exceptions/duplicated-key.error';
import { UserStatus } from '@/domain/enums/user-status';
import { UserRole } from '@/domain/enums/user-role';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createUser(
    entity: Pick<
      UserEntity,
      'name' | 'email' | 'username' | 'password' | 'avatar' | 'role'
    >,
  ): Promise<void> {
    try {
      await this.repository.save(entity);
    } catch (e) {
      if (e.name === 'QueryFailedError') {
        if (e.code == '23505') {
          throw new DuplicatedKeyError(e.detail);
        }

        throw new DatabaseError(e.name);
      }

      throw new DatabaseError(e.name);
    }
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.repository.find({
      order: { createdAt: 'desc' },
    });
  }

  async updateProfileUser(
    id: string,
    entity: Pick<UserEntity, 'name' | 'email' | 'avatar'>,
  ) {
    await this.repository.update(id, entity);
  }

  async updateUserRole(id: string, role: UserRole): Promise<void> {
    await this.repository.update(id, { role: role });
  }

  async resetUserPassword(id: string, password: string, status: UserStatus) {
    await this.repository.update(id, { password: password, status: status });
  }

  async getByUsername(usernameOrEmail: string): Promise<UserEntity> {
    return this.repository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.repository.update(id, { refreshToken: refreshToken });
  }

  async activateUser(
    id: string,
    password: string,
    status: UserStatus,
  ): Promise<void> {
    await this.repository.update(id, { password: password, status: status });
  }

  async updatePassword(id: string, password: string) {
    await this.repository.update(id, { password: password });
  }
}
