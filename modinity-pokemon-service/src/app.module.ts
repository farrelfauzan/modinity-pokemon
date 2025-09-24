import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { TeamModule } from './modules/team/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    FavoriteModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
