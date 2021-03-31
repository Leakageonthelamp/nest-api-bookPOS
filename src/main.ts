import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Nest Book Store API')
    .setDescription('The backend API in nest js term.')
    .setVersion(config.get<string>('version'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = {};
        errors.map((error) => {
          errorMessages[error?.property] = Object.values(error?.constraints)
            .join('. ')
            .trim();
        });
        return new BadRequestException({
          error: 'Bad Request',
          inputError: errorMessages,
        });
      },
    }),
  );

  await app.listen(config.get<number>('port'));
}
bootstrap();
