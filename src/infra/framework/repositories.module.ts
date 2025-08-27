import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import { User } from 'src/domain/entities/user.entity';
import { TaskRepository } from 'src/infra/repositories/task.repository';
import { UserRepository } from 'src/infra/repositories/user.repository';

const repositories = [
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
  {
    provide: 'ITaskRepository',
    useClass: TaskRepository,
  },
];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  providers: repositories,
  exports: repositories,
})
export class RepositoriesModule {}
