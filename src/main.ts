import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { generateSwaggerFile } from './swagger';
import globalConfig from './config/global.config';

async function bootstrap() {
  console.log(globalConfig().app.port);
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  generateSwaggerFile(app);
  // app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  const port = globalConfig().app.port;
  await app.listen(port);
  console.log(`App runs on port ${port}`);
}
bootstrap();
