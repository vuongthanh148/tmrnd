import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { SupplierRepository } from './suppliers.repository';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { Supplier } from './suppliers.entity';
import { UpdateResult } from 'typeorm';
import { LIMIT, OFFSET, Sort } from '../../utils/constant';
import { ReadSupplierDto } from './dtos/read-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  public async createNewSupllier(
    newSupplier: CreateSupplierDto,
  ): Promise<Supplier> {
    const { code } = newSupplier;
    const supplier = await this.supplierRepository.findOne({
      where: { code },
    });
    if (supplier) throw new BadRequestException('Code is unique');

    return this.supplierRepository.create(newSupplier);
  }

  public async updateSupplierById(
    id: number,
    dataUpdate: Partial<Supplier>,
  ): Promise<UpdateResult> {
    if (dataUpdate?.code) {
      const supplier = await this.supplierRepository.findOne({
        where: { code: dataUpdate.code },
      });
      if (supplier) throw new BadRequestException('This code already exists');
    }

    return this.supplierRepository.update(id, dataUpdate);
  }

  public async readSupplierByCondition(
    filter: ReadSupplierDto,
  ): Promise<Supplier[]> {
    try {
      let sortField = 'createdAt';
      let sortType = 'DESC';
      const where = {};
      if (filter['sortField'] && filter['sortType']) {
        sortField = filter.sortField;
        sortType = filter.sortType;
      }
      if (filter['status']) {
        where['status'] = filter['status'];
      }
      if (filter['code']) {
        where['code'] = filter['code'];
      }
      const offset = filter['offset'] ? filter['offset'] : OFFSET;
      const limit = filter['limit'] ? filter['limit'] : LIMIT;

      return this.supplierRepository.find({
        order: {
          [sortField]: `${sortType}`,
        },
        take: limit,
        skip: offset,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async deleteSupplierById(id: number): Promise<{ message: string }> {
    try {
      return this.supplierRepository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getSupplierById(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({
      where: {
        id,
      },
    });
    if (!supplier)
      throw new BadRequestException(`Supplier with id: ${id} does not exist`);
    return supplier;
  }
}
