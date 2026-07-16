import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const defaultCorsOrigins = 'http://localhost:5500,http://127.0.0.1:5500';
  
  const corsOrigins = (process.env.CORS_ORIGIN ?? defaultCorsOrigins)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  const port = Number(process.env.PORT ?? 3000);

  await app.listen(port, '0.0.0.0');
}
bootstrap();