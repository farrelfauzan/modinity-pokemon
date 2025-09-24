// import { ConfigService, registerAs } from '@nestjs/config';

// const configService = new ConfigService();

// export default registerAs('database', () => ({
//   type: 'postgres',
//   host: configService.getOrThrow('DB_HOST'),
//   port: parseInt(configService.getOrThrow('DB_PORT'), 10) || 5432,
//   username: configService.getOrThrow('DB_USERNAME'),
//   password: configService.getOrThrow('DB_PASSWORD'),
//   database: configService.getOrThrow('DB_NAME'),
//   parseInt8: true,
//   entities: [__dirname + '/../**/*.orm-entity.{ts,js}'],
//   migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//   migrationsTableName: 'migrations',
//   synchronize:
//     configService.getOrThrow('NODE_ENV') === 'development' &&
//     Boolean(+configService.getOrThrow('SYNCHRONIZE')),
//   logging: configService.getOrThrow('NODE_ENV') === 'development',
// }));
