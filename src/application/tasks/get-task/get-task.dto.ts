import { IsString, IsUUID } from 'class-validator';

export class GetTaskDto {
  @IsString()
  @IsUUID()
  id: string;
}
