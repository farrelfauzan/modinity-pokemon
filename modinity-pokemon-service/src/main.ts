import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 3 * 1024 * 1024,
    }),
    { cors: true },
  );
  const appConfig = app.get(ConfigService).get('app');

  app.use(helmet());
  app.setGlobalPrefix('/api');

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformResponseInterceptor(),
  );

  const swagger = new DocumentBuilder()
    .setTitle('Modinity Pokemon Service')
    .setDescription('The Modinity Pokemon Service API description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api-docs', app, documentFactory(), {
    swaggerOptions: { docExpansion: 'none' },
  });

  await app.listen(appConfig.port, '0.0.0.0');

  return app;
}

void bootstrap();
