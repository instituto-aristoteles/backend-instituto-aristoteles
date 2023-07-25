import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../../domain/interfaces/user.repository.interface';
import { UserReadDto } from '../dtos/user.read.dto';
import { UserCreateUpdateDto } from '../dtos/user.create.update.dto';
import {
  dtoToModel,
  modelToDTO,
  modelToDtoList,
} from '../../common/util/user-converter';

const Repository = () => Inject('UserRepository');

@Injectable()
export class UserService {
  constructor(
    @Repository() private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async getUsers(): Promise<UserReadDto[]> {
    const users = await this.userRepository.getUsers();

    return modelToDtoList(users);
  }

  public async getUser(id: string): Promise<UserReadDto> {
    const user = await this.userRepository.getUser(id);
    return modelToDTO(user);
  }

  public async updateUser(
    id: string,
    user: UserCreateUpdateDto,
  ): Promise<void> {
    let userDb = await this.userRepository.getUser(id);
    if (!user) {
      throw new Error('');
    }

    userDb = {
      ...user,
    };

    await this.userRepository.updateUser(id, userDb);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  public async createUser(user: UserCreateUpdateDto): Promise<void> {
    await this.userRepository.createUser(dtoToModel(user));
  }
}
