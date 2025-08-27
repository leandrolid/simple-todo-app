import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateTaskDto } from 'src/application/tasks/create-task/create-task.dto';
import { CreateTaskUseCase } from 'src/application/tasks/create-task/create-task.usecase';
import { AuthUser } from 'src/infra/decorators/auth-user.decorator';
import { JwtGuard } from 'src/infra/middlewares/jwt.middleware';
import { AuthUserDto } from 'src/types/auth.type';

@Controller({
  path: 'tasks',
})
@UseGuards(JwtGuard)
@ApiTags('Tasks')
@ApiBearerAuth()
export class CreateTaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Task created successfully',
    schema: {
      example: {
        id: 1,
        title: 'My Task',
        description: 'This is my task description',
        userId: 1,
        createdAt: '2023-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    schema: { example: { statusCode: 401, message: 'No token provided' } },
  })
  async execute(@Body() body: CreateTaskDto, @AuthUser() user: AuthUserDto) {
    return this.createTaskUseCase.execute({
      user,
      ...body,
    });
  }
}
