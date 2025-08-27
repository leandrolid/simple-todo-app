import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/users/create-user/create-user.usecase';
import { CreateUserController } from 'src/infra/controllers/users/create-user/create-user.controller';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
