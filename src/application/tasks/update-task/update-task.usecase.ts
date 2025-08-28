import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from 'src/application/tasks/update-task/update-task.dto';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Auth } from 'src/types/auth.type';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({ id, title, description, status, user }: Auth<UpdateTaskDto>) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== user.id) {
      throw new NotFoundException('Task not found');
    }
    task.updateStatus(status);
    task.updateTitle(title);
    task.updateDescription(description);
    const updatedTask = await this.taskRepository.updateOne(task);
    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      userId: updatedTask.userId,
      createdAt: updatedTask.createdAt,
      status: updatedTask.status,
    };
  }
}
