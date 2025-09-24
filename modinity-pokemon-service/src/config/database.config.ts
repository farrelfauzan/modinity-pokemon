import { ConfigService, registerAs } from '@nestjs/config';
import { join } from 'path';

const configService = new ConfigService();

export default registerAs('database', () => ({
  type: 'sqlite' as const,
  database:
    configService.getOrThrow('DB_PATH') || join(__dirname, '../../db.sqlite'),
  entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize:
    configService.getOrThrow('NODE_ENV') === 'development' &&
    Boolean(+configService.getOrThrow('SYNCHRONIZE')),
  logging: configService.getOrThrow('NODE_ENV') === 'development',
}));
