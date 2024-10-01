import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' }));

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: (errors) => {
      const messages: { [key: string]: string } = {}
      const result = errors.map(
        (error) =>
          messages[error.property] ??
          error.property + ':' + error.constraints[Object.keys(error.constraints)[0]]
      ).join(',')
      return new BadRequestException({
        error_code: 'Validation failed',
        error_description: result,
      })
    },


  }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('LLM Solution')
    .setDescription('An API for managing the LLM Solution')
    .setVersion('1.0')
    .addTag('llm-solution')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
