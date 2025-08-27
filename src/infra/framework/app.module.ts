import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import { User } from 'src/domain/entities/user.entity';
import { AuthModule } from 'src/infra/framework/auth.module';
import { RepositoriesModule } from 'src/infra/framework/repositories.module';
import { ServicesModule } from 'src/infra/framework/services.module';
import { TasksModule } from 'src/infra/framework/tasks.module';
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
      entities: [User, Task],
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
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
