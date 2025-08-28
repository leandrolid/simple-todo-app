import { Inject, Injectable } from '@nestjs/common';
import { ListTasksDto } from 'src/application/tasks/list-tasks/list-tasks.dto';
import { ITaskRepository } from 'src/domain/repositories/task.repository';
import { Auth } from 'src/types/auth.type';

@Injectable()
export class ListTasksUseCase {
  constructor(
    @Inject('ITaskRepository') private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({ page, perPage, user }: Auth<ListTasksDto>) {
    const result = await this.taskRepository.findByUserIdAndCount({
      page,
      perPage,
      userId: user.id,
    });
    return {
      meta: {
        total: result.total,
        page,
        perPage,
        totalPages: Math.ceil(result.total / perPage),
      },
      data: result.tasks,
    };
  }
}
