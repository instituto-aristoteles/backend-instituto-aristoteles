import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from '@/database/typeorm/database.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    CategoryModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        APP_PORT: Joi.number().default(3000),
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
