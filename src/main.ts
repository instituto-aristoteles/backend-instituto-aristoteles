import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilterMiddleware } from '@/common/middlewares/http-exception-filter.middleware';
import { RolesGuard } from '@/common/guards/roles.guard';
import { UserService } from '@/modules/user/application/services/user.service';

async function bootstrap(): Promise<string> {
  const port = parseInt(process.env.APP_PORT, 10) || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Instituto Aristóteles - API')
    .setVersion('1.0')
    .setExternalDoc('Swagger.json', 'swagger-json')
    .setDescription('Backend do site Instituto Aristóteles')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilterMiddleware(httpAdapter));

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  app.enableCors();
  await app.listen(port);

  return app.getUrl();
}
(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    Logger.log(`Actual URL: ${url}`, 'Bootstrap');
  } catch (error) {
    Logger.error(error);
  }
})();
