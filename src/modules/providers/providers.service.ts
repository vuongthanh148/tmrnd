import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ProviderRepository } from './providers.repository';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { Provider } from './providers.entity';
import { UpdateResult } from 'typeorm';
import { ReadProviderDto } from './dtos/read-provider.dto';
import { OFFSET, LIMIT } from 'src/common/constant';

@Injectable()
export class ProvidersService {
  constructor(private readonly providerRepository: ProviderRepository) {}

  public async createNewProvider(
    newProvider: CreateProviderDto,
  ): Promise<Provider> {
    const { code } = newProvider;
    const provider = await this.providerRepository.findOne({
      where: { code },
    });
    if (provider) throw new BadRequestException('Code is unique');

    return this.providerRepository.create(newProvider);
  }

  public async updateProviderById(
    id: number,
    dataUpdate: Partial<Provider>,
  ): Promise<UpdateResult> {
    if (dataUpdate?.code) {
      const provider = await this.providerRepository.findOne({
        where: { code: dataUpdate.code },
      });
      if (provider) throw new BadRequestException('This code already exists');
    }

    return this.providerRepository.update(id, dataUpdate);
  }

  public async readProviderByCondition(
    filter: ReadProviderDto,
  ): Promise<Provider[]> {
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

      return this.providerRepository.find({
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

  public async deleteProviderById(id: number): Promise<{ message: string }> {
    try {
      return this.providerRepository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getProviderById(id: number): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: {
        id,
      },
    });
    if (!provider)
      throw new BadRequestException(`Provider with id: ${id} does not exist`);
    return provider;
  }
}
