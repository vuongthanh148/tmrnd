import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function generateSwaggerFile(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Digital Backend Assignment')
    .setDescription('The Digital Backend Assignment API description')
    .setVersion('1.0')
    .addTag('Digital Backend Assignment')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  fs.writeFileSync('./swagger.yaml', yaml.dump(document));
}
