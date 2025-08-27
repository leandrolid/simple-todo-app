import { User } from 'src/domain/entities/user.entity';

export interface IUserRepository {
  createOne(input: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export type CreateUserInput = {
  name: string;
  email: string;
  passwordHash: string;
};
