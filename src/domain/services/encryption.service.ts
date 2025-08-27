export interface IEncryptionService {
  hash(data: string): Promise<string>;
  compare(data: string, hash: string): Promise<boolean>;
}
