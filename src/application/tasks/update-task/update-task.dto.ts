import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { TaskStatus } from 'src/domain/enums/task-status.enum';

export class UpdateTaskParamsDto {
  @IsString()
  @IsUUID()
  id: string;
}

export class UpdateTaskBodyDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}

export interface UpdateTaskDto extends UpdateTaskParamsDto, UpdateTaskBodyDto {}
