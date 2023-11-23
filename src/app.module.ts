import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from '@/database/typeorm/database.module';
import { HealthModule } from '@/modules/health/health.module';
import { RolesGuard } from '@/common/guards/roles.guard';
import { UserStatusGuard } from '@/common/guards/user-status.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    UserModule,
    PostModule,
    AuthModule,
    CategoryModule,
    DatabaseModule,
    HealthModule,
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
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        template: {
          dir: process.cwd() + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            extName: '.hbs',
            layoutsDir: process.cwd() + '/templates',
          },
        },
        transport: {
          service: 'Gmail',
          host: config.getOrThrow('MAIL_HOST'),
          port: parseInt(config.getOrThrow('MAIL_PORT')),
          secure: true,
          auth: {
            user: config.getOrThrow('MAIL_USER'),
            pass: config.getOrThrow('MAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserStatusGuard,
    },
  ],
})
export class AppModule {}
