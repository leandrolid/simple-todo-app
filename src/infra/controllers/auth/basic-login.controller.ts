import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BasicLoginDto } from 'src/application/auth/basic-login/basic-login.dto';
import { BasicLoginUseCase } from 'src/application/auth/basic-login/basic-login.usecase';

@Controller({
  path: 'auth',
})
@ApiTags('Authentication')
export class BasicLoginController {
  constructor(private readonly basicLoginUseCase: BasicLoginUseCase) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'Login successful, returns JWT token.',
    schema: {
      example: {
        token: 'jwt_token_here',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
      },
    },
  })
  async execute(
    @Body()
    body: BasicLoginDto,
  ) {
    return this.basicLoginUseCase.execute(body);
  }
}
