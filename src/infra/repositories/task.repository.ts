import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import {
  CreateTaskInput,
  FindByUserIdAndCountInput,
  FindByUserIdAndCountOutput,
  ITaskRepository,
} from 'src/domain/repositories/task.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly ormRepository: Repository<Task>,
  ) {}

  async createOne(input: CreateTaskInput): Promise<Task> {
    const task = this.ormRepository.create(input);
    return this.ormRepository.save(task);
  }

  async findById(id: string): Promise<Task | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  async findByUserIdAndCount({
    userId,
    page,
    perPage,
  }: FindByUserIdAndCountInput): Promise<FindByUserIdAndCountOutput> {
    const [tasks, total] = await this.ormRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return { tasks, total };
  }

  async updateOne(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
