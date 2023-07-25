import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserReadDto } from '../../application/dtos/user.read.dto';
import { UserCreateUpdateDto } from '../../application/dtos/user.create.update.dto';

export function modelToDTO(entity: UserEntity): UserReadDto {
  return {
    ...entity,
  };
}

export function modelToDtoList(entityList: UserEntity[]): UserReadDto[] {
  const users: UserReadDto[] = [];
  entityList.forEach((x) => users.push(modelToDTO(x)));

  return users;
}

export function dtoToModel(dto: UserCreateUpdateDto): UserEntity {
  return {
    ...dto,
  };
}
