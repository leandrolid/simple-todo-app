import { Task } from 'src/domain/entities/task.entity';

export interface ITaskRepository {
  createOne(input: CreateTaskInput): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findByUserIdAndCount(
    input: FindByUserIdAndCountInput,
  ): Promise<FindByUserIdAndCountOutput>;
  updateOne(task: Task): Promise<Task>;
  deleteById(id: string): Promise<void>;
}

export type CreateTaskInput = {
  title: string;
  description: string;
  userId: string;
};

export type FindByUserIdAndCountInput = {
  userId: string;
  page: number;
  perPage: number;
};

export type FindByUserIdAndCountOutput = {
  tasks: Task[];
  total: number;
};
