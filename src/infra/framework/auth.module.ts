import { Module } from '@nestjs/common';
import { BasicLoginUseCase } from 'src/application/auth/basic-login/basic-login.usecase';
import { BasicLoginController } from 'src/infra/controllers/auth/basic-login/basic-login.controller';

@Module({
  imports: [],
  controllers: [BasicLoginController],
  providers: [BasicLoginUseCase],
})
export class AuthModule {}
