import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { User } from './modules/user/users.entity';
import { UsersModule } from './modules/user/users.module';
import { Variables } from './utils/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(Variables.PgHost),
        port: +configService.get(Variables.PgPort),
        username: configService.get(Variables.PgUser),
        password: configService.get(Variables.PgPassword),
        database: configService.get(Variables.PgDB),
        entities: [User],
        synchronize: true,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PostModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
