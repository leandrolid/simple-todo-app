import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteTaskDto } from 'src/application/tasks/delete-task/delete-task.dto';
import { DeleteTaskUseCase } from 'src/application/tasks/delete-task/delete-task.usecase';
import { AuthUser } from 'src/infra/decorators/auth-user.decorator';
import { JwtGuard } from 'src/infra/middlewares/jwt.middleware';
import { AuthUserDto } from 'src/types/auth.type';

@Controller({
  path: 'tasks',
})
@UseGuards(JwtGuard)
@ApiTags('Tasks')
@ApiBearerAuth()
export class DeleteTaskController {
  constructor(private readonly deleteTaskUseCase: DeleteTaskUseCase) {}

  @Delete(':id')
  @ApiOkResponse({
    description: 'Task deleted successfully',
    schema: { example: { message: 'Task deleted successfully' } },
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
    schema: { example: { statusCode: 404, message: 'Task not found' } },
  })
  async execute(@Param() param: DeleteTaskDto, @AuthUser() user: AuthUserDto) {
    return this.deleteTaskUseCase.execute({
      ...param,
      user,
    });
  }
}
