import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { AuthModule } from 'src/infra/framework/auth.module';
import { RepositoriesModule } from 'src/infra/framework/repositories.module';
import { ServicesModule } from 'src/infra/framework/services.module';
import { UsersModule } from 'src/infra/framework/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5555,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
    RepositoriesModule,
    ServicesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
