import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'My Task' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'This is my task description' })
  @IsString()
  @MinLength(3)
  description: string;
}
