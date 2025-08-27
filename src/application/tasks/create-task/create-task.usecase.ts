import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/application/tasks/create-task/create-task.dto';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Auth } from 'src/types/auth.type';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({ title, description, user }: Auth<CreateTaskDto>) {
    const task = await this.taskRepository.createOne({
      title,
      description,
      userId: user.id,
    });
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      userId: task.userId,
      createdAt: task.createdAt,
    };
  }
}
