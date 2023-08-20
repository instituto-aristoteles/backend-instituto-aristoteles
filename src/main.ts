import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<string> {
  const port = parseInt(process.env.APP_PORT, 10) || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

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
