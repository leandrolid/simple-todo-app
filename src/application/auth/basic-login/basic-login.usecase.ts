import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BasicLoginDto } from 'src/application/auth/basic-login/basic-login.dto';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IEncryptionService } from 'src/domain/services/encryption.service';

@Injectable()
export class BasicLoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionService')
    private readonly encryptionService: IEncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: BasicLoginDto) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.encryptionService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return { token };
  }
}
