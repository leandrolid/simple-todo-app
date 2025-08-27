import { Global, Module } from '@nestjs/common';
import { EncryptionService } from 'src/infra/services/encryption.service';

const services = [
  {
    provide: 'IEncryptionService',
    useClass: EncryptionService,
  },
];

@Global()
@Module({
  imports: [],
  providers: services,
  exports: services,
})
export class ServicesModule {}
