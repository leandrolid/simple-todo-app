import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import {
  CreateUserInput,
  IUserRepository,
} from 'src/domain/repositories/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  createOne(input: CreateUserInput): Promise<User> {
    const user = this.ormRepository.create({
      name: input.name,
      email: input.email,
      password: input.passwordHash,
    });
    return this.ormRepository.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email } });
  }
}
