import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();

export default registerAs('app', () => ({
  port: parseInt(configService.getOrThrow('PORT'), 10) || 3000,
  nodenv: configService.getOrThrow('NODE_ENV'),
}));
