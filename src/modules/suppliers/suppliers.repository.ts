import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../utils/base/base-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './suppliers.entity';

@Injectable()
export class SupplierRepository extends BaseRepository<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    supplierRepository: Repository<Supplier>,
  ) {
    super(supplierRepository);
  }
}
