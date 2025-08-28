import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from 'src/application/tasks/create-task/create-task.usecase';
import { DeleteTaskUseCase } from 'src/application/tasks/delete-task/delete-task.usecase';
import { GetTaskUseCase } from 'src/application/tasks/get-task/get-task.usecase';
import { ListTasksUseCase } from 'src/application/tasks/list-tasks/list-tasks.usecase';
import { UpdateTaskUseCase } from 'src/application/tasks/update-task/update-task.usecase';
import { CreateTaskController } from 'src/infra/controllers/tasks/create-task.controller';
import { DeleteTaskController } from 'src/infra/controllers/tasks/delete-task.controller';
import { GetTaskController } from 'src/infra/controllers/tasks/get-task.controller';
import { ListTasksController } from 'src/infra/controllers/tasks/list-tasks.controller';
import { UpdateTaskController } from 'src/infra/controllers/tasks/update-task.controller';

@Module({
  imports: [],
  controllers: [
    CreateTaskController,
    GetTaskController,
    ListTasksController,
    UpdateTaskController,
    DeleteTaskController,
  ],
  providers: [
    CreateTaskUseCase,
    GetTaskUseCase,
    ListTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
  ],
})
export class TasksModule {}
