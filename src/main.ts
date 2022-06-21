import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from './../node_modules/@nestjs/platform-fastify/interfaces/nest-fastify-application.interface.d';
import { ValidationPipe } from '@nestjs/common';
import { contentParser } from 'fastify-multer';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Finances Donatello')
    .setDescription('Finances Donatello')
    .setVersion('1.0')
    .addTag('finances')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.register(contentParser);

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: process.env.ENVIRONMENT === 'DEV' ? false : true,
  });
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
