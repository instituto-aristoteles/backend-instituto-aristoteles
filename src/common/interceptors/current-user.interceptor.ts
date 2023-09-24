import { ExecutionContext, Logger } from '@nestjs/common';
import {
  CallHandler,
  NestInterceptor,
} from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { AuthRequest } from '@/modules/auth/application/models/auth-request';
import { Repository } from 'typeorm';
import { UserEntity } from '@/domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestError } from '@/common/exceptions/bad-request.error';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    try {
      request.user = await this.repository.findOne({
        where: { id: request.user.id },
      });
    } catch (error) {
      Logger.error(error, 'Error');
      throw new BadRequestError(error);
    }

    return handler.handle();
  }
}
