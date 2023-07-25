import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/base/base-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './providers.entity';

@Injectable()
export class ProviderRepository extends BaseRepository<Provider> {
  constructor(
    @InjectRepository(Provider)
    providerRepository: Repository<Provider>,
  ) {
    super(providerRepository);
  }
}
