import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { generateSwaggerFile } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  generateSwaggerFile(app);
  // app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.PORT)
  const port = process.env.PORT ? parseInt(process.env.PORT) : 2711;
  await app.listen(port);
  console.log(`App runs on port ${port}`);
}
bootstrap();
