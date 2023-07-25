import { UserReadDto } from '../../../user/application/dtos/user.read.dto';

export type PostReadDTO = {
  Id: string;
  Title: string;
  Description: string;
  PostStatus: number;
  CreatedBy: UserReadDto;
  UpdatedBy?: UserReadDto;
  CreatedAt: Date;
  UpdatedAt?: Date;
};
