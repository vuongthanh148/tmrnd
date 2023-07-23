import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config();
import { GlobalConfig } from './config/global.config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { generateSwaggerFile } from './swagger';

async function bootstrap() {
  console.log(GlobalConfig.app.port)
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  generateSwaggerFile(app);
  // app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  const port = GlobalConfig.app.port;
  await app.listen(port);
  console.log(`App runs on port ${port}`);
}
bootstrap();
