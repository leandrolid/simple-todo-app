import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteTaskDto } from 'src/application/tasks/delete-task/delete-task.dto';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Auth } from 'src/types/auth.type';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({ id, user }: Auth<DeleteTaskDto>) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== user.id) {
      throw new NotFoundException('Task not found');
    }
    await this.taskRepository.deleteById(task.id);
    return {
      message: 'Task deleted successfully',
    };
  }
}
