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
  entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

export default new DataSource(options);
