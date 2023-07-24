import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../utils/base/base-repository';
import { Rate } from './rates.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RateRepository extends BaseRepository<Rate> {
  constructor(
    @InjectRepository(Rate)
    rateRepository: Repository<Rate>,
  ) {
    super(rateRepository);
  }
}
