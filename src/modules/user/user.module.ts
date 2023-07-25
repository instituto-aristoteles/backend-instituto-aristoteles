import { Module } from '@nestjs/common';
import { UserRepositoryProvider } from './infra/providers/user.repository.provider';
import { UserService } from './application/appService/user.service';
import { UserController } from './api/user.controller';
import { PrismaService } from '../../database/prisma/service/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserRepositoryProvider, UserService, PrismaService],
  exports: [UserRepositoryProvider],
})
export class UserModule {}
