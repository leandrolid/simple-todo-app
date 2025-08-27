import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/infra/repositories/user.repository';

const repositories = [
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: repositories,
  exports: repositories,
})
export class RepositoriesModule {}
