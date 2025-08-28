import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListTasksDto } from 'src/application/tasks/list-tasks/list-tasks.dto';
import { ListTasksUseCase } from 'src/application/tasks/list-tasks/list-tasks.usecase';
import { AuthUser } from 'src/infra/decorators/auth-user.decorator';
import { JwtGuard } from 'src/infra/middlewares/jwt.middleware';
import { AuthUserDto } from 'src/types/auth.type';

@Controller({
  path: 'tasks',
})
@UseGuards(JwtGuard)
@ApiTags('Tasks')
@ApiBearerAuth()
export class ListTasksController {
  constructor(private readonly listTasksUseCase: ListTasksUseCase) {}

  @Get()
  async execute(@Query() query: ListTasksDto, @AuthUser() user: AuthUserDto) {
    return this.listTasksUseCase.execute({
      ...query,
      user,
    });
  }
}
