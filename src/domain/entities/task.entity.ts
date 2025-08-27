import { TaskStatus } from 'src/domain/enums/task-status.enum';
import { RemoveMethods } from 'src/types/remove-methods.type';

export class Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  expiredAt: Date | null;
  status: TaskStatus;

  constructor(props: RemoveMethods<Task>) {
    Object.assign(this, props);
    this.createdAt = new Date();
    this.status = TaskStatus.PENDING;
  }

  completed() {
    this.status = TaskStatus.COMPLETED;
  }
}
