import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from 'src/application/tasks/create-task/create-task.usecase';
import { CreateTaskController } from 'src/infra/controllers/tasks/create-task/create-task.controller';

@Module({
  imports: [],
  controllers: [CreateTaskController],
  providers: [CreateTaskUseCase],
})
export class TasksModule {}
