import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';

export async function bootstrap(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 3 * 1024 * 1024,
    }),
    { cors: true },
  );

  app.use(helmet());
  app.setGlobalPrefix('/api');

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformResponseInterceptor(),
  );

  const configService = app.get('ConfigService');

  const port = configService.get('PORT') ?? 3000;

  await app.listen(port, '0.0.0.0');

  return app;
}

void bootstrap();
