import { User } from 'src/domain/entities/user.entity';
import { TaskStatus } from 'src/domain/enums/task-status.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

  @Column({ type: 'text', name: 'title' })
  title: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'expired_at', nullable: true })
  expiredAt: Date | null;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  updateStatus(status?: TaskStatus) {
    if (!status) return;
    this.status = status;
  }

  updateTitle(title?: string) {
    if (!title) return;
    this.title = title;
  }

  updateDescription(description?: string) {
    if (!description) return;
    this.description = description || this.description;
  }
}
