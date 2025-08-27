import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/application/users/create-user/create-user.dto';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IEncryptionService } from 'src/domain/services/encryption.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionService')
    private readonly encryptionService: IEncryptionService,
  ) {}

  async execute({ name, email, password }: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const passwordHash = await this.encryptionService.hash(password);
    const user = await this.userRepository.createOne({
      name,
      email,
      passwordHash,
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
