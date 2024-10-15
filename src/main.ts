import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe)

  const config = new DocumentBuilder()
    .setTitle('Hall Consommer Local | TogoGnim API')
    .setDescription("Documentation de l'API TOGOGNIM")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("", app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
