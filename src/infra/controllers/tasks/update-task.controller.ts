import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  UpdateTaskBodyDto,
  UpdateTaskParamsDto,
} from 'src/application/tasks/update-task/update-task.dto';
import { UpdateTaskUseCase } from 'src/application/tasks/update-task/update-task.usecase';
import { AuthUser } from 'src/infra/decorators/auth-user.decorator';
import { JwtGuard } from 'src/infra/middlewares/jwt.middleware';
import { AuthUserDto } from 'src/types/auth.type';

@Controller({
  path: 'tasks',
})
@UseGuards(JwtGuard)
@ApiTags('Tasks')
@ApiBearerAuth()
export class UpdateTaskController {
  constructor(private readonly updateTaskUseCase: UpdateTaskUseCase) {}

  @Put(':id')
  @ApiOkResponse({
    description: 'Task updated successfully',
    schema: {
      example: {
        id: '1ab2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
        title: 'My Updated Task',
        description: 'This is my updated task description',
        userId: '1ab2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
        createdAt: '2023-01-01T00:00:00.000Z',
        status: 'pending',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
    schema: { example: { statusCode: 404, message: 'Task not found' } },
  })
  async execute(
    @Param() param: UpdateTaskParamsDto,
    @Body() body: UpdateTaskBodyDto,
    @AuthUser() user: AuthUserDto,
  ) {
    return this.updateTaskUseCase.execute({
      ...param,
      ...body,
      user,
    });
  }
}
