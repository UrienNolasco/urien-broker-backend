import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // frontend
    credentials: true, // se você for usar cookies/autenticação
  });

  await app.listen(3000);
}
bootstrap();