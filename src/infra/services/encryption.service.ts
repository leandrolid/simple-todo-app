import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { IEncryptionService } from 'src/domain/services/encryption.service';

@Injectable()
export class EncryptionService implements IEncryptionService {
  async hash(password: string): Promise<string> {
    try {
      const hashed = await hash(password, 10);
      return hashed;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error hashing password');
    }
  }
  async compare(password: string, hashed: string): Promise<boolean> {
    try {
      const isMatch = await compare(password, hashed);
      return isMatch;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error comparing passwords');
    }
  }
}
