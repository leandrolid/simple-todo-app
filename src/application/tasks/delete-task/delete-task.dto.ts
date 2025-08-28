import { IsString, IsUUID } from 'class-validator';

export class DeleteTaskDto {
  @IsString()
  @IsUUID()
  id: string;
}
