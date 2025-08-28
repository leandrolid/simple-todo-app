import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/users/create-user/create-user.dto';
import { CreateUserUseCase } from 'src/application/users/create-user/create-user.usecase';

@Controller({
  path: 'users',
})
@ApiTags('Users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created successfully.',
    schema: {
      example: {
        id: 'uuid',
        name: 'John Doe',
        email: '',
        createdAt: new Date().toISOString(),
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed',
        errors: ['Unknown error'],
      },
    },
  })
  @ApiConflictResponse({
    description: 'User already exists.',
    schema: {
      example: {
        statusCode: 409,
        message: 'User already exists',
      },
    },
  })
  async execute(
    @Body()
    body: CreateUserDto,
  ) {
    return this.createUserUseCase.execute(body);
  }
}
