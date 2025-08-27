import { TaskStatus } from 'src/domain/enums/task-status.enum';

export class Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  expiredAt: Date;
  status: TaskStatus;

  constructor(props: Task) {
    Object.assign(this, props);
  }

  completed() {
    this.status = TaskStatus.COMPLETED;
  }
}
