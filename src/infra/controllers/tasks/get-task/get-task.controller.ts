import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  async execute(@Param() param: GetTaskDto, @AuthUser() user: AuthUserDto) {
    return this.getTaskUseCase.execute({
      ...param,
      user,
    });
  }
}
