import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

type SourceOptions = DataSourceOptions;

config();

const configService = new ConfigService();

const options: SourceOptions = {
  type: 'sqlite' as const,
  database: String(
    configService.getOrThrow('DB_PATH') || join(__dirname, '../../db.sqlite'),
  ),
  entities: [__dirname + '/../**/*.orm-entity.{ts,js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  // synchronize:
  //   configService.getOrThrow('NODE_ENV') === 'development' &&
  //   Boolean(+configService.getOrThrow('SYNCHRONIZE')),
};

export default new DataSource(options);
