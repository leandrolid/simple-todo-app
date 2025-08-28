import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from 'src/application/tasks/create-task/create-task.usecase';
import { GetTaskUseCase } from 'src/application/tasks/get-task/get-task.usecase';
import { CreateTaskController } from 'src/infra/controllers/tasks/create-task/create-task.controller';
import { GetTaskController } from 'src/infra/controllers/tasks/get-task/get-task.controller';

@Module({
  imports: [],
  controllers: [CreateTaskController, GetTaskController],
  providers: [CreateTaskUseCase, GetTaskUseCase],
})
export class TasksModule {}
