import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskDto } from 'src/application/tasks/get-task/get-task.dto';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Auth } from 'src/types/auth.type';

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({ id, user }: Auth<GetTaskDto>) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== user.id) {
      throw new NotFoundException('Task not found');
    }
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      userId: task.userId,
      createdAt: task.createdAt,
    };
  }
}
