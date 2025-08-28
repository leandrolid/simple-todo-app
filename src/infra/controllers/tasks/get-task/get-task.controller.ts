import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
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
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  async execute(@Param() param: GetTaskDto, @AuthUser() user: AuthUserDto) {
    return this.getTaskUseCase.execute({
      ...param,
      user,
    });
  }
}
