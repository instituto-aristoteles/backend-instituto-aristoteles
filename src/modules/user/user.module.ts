import { Module } from '@nestjs/common';
import { UserService } from '@/modules/user/application/services/user.service';
import { UserController } from './api/user.controller';
import { PrismaService } from '@/database/prisma/service/prisma.service';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}
