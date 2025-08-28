import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetTaskDto } from 'src/application/tasks/get-task/get-task.dto';
import { GetTaskUseCase } from 'src/application/tasks/get-task/get-task.usecase';
import { AuthUser } from 'src/infra/decorators/auth-user.decorator';
import { JwtGuard } from 'src/infra/middlewares/jwt.middleware';
import { AuthUserDto } from 'src/types/auth.type';

@Controller({
  path: 'tasks',
})
@UseGuards(JwtGuard)
@ApiTags('Tasks')
@ApiBearerAuth()
export class GetTaskController {
  constructor(private readonly getTaskUseCase: GetTaskUseCase) {}

  @Get(':id')
  @ApiOkResponse({
    description: 'Task retrieved successfully',
    schema: {
      example: {
        id: '1',
        title: 'Task Title',
        description: 'Task Description',
        userId: '1',
        createdAt: '2023-10-10T10:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
    schema: { example: { statusCode: 404, message: 'Task not found' } },
  })
  async execute(@Param() param: GetTaskDto, @AuthUser() user: AuthUserDto) {
    return this.getTaskUseCase.execute({
      ...param,
      user,
    });
  }
}
