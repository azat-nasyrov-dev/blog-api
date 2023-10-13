import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Blog-API')
    .setDescription('Blog-API documentation')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .addTag('Developed by Azat Nasyrov')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(port, () => console.log(`Server started on port: ${port}`));
}

bootstrap();
