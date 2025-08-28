import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}

export interface UpdateTaskDto extends UpdateTaskParamsDto, UpdateTaskBodyDto {}
