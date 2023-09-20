import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@/database/prisma/service/prisma.service';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { PostCreateUpdateDTO } from '@/modules/post/application/dtos/post.create.update.dto';
import * as bcrypt from 'bcrypt';
import { AppModule } from '@/app.module';

jest.setTimeout(30000);

describe('PostController', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvVars: true,
          ignoreEnvFile: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    prismaService = moduleRef.get<PrismaService>(PrismaService);

    await prismaService.user.upsert({
      where: { email: 'user@test.com' },
      update: {},
      create: {
        name: 'User',
        email: 'user@test.com',
        password: await bcrypt.hash('', 10),
      },
    });

    await app.init();
  });

  beforeEach(async () => {
    await prismaService.post.deleteMany();
  });

  it('should return empty', async () => {
    return request(app.getHttpServer()).get('/posts').expect(200).expect([]);
  });

  it('should create new post', async () => {
    const author = await prismaService.user.findUnique({
      where: { email: 'user@test.com' },
    });

    await request(app.getHttpServer())
      .post('/posts')
      .send({
        title: 'Test',
        status: 0,
        content: 'This is a test',
        slug: 'test',
        description: 'Test description',
        authorId: author.id,
      } as PostCreateUpdateDTO)
      .expect(201);

    expect(await prismaService.post.count({ where: { slug: 'test' } })).toBe(1);
  });
});
