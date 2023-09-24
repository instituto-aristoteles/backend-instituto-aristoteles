import { Request } from 'express';
import { UserEntity } from '@/domain/entities/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
