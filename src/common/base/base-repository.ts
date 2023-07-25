import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BaseEntity,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  InsertResult,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';

@Injectable()
export class BaseRepository<T extends BaseEntity> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.genericRepository.find(options);
  }

  async findOne(options?: FindOneOptions<T>): Promise<T> {
    return this.genericRepository.findOne(options);
  }

  async count(options: FindManyOptions<T>): Promise<number> {
    return this.genericRepository.count(options);
  }

  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<T> {
    return this.genericRepository.createQueryBuilder(alias, queryRunner);
  }

  getRepository(): Repository<T> {
    return this.genericRepository;
  }

  async upsert(
    entity: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
    conflictPathsOrOptions?: string[] | UpsertOptions<T>,
  ): Promise<InsertResult> {
    return this.genericRepository.upsert(entity, conflictPathsOrOptions);
  }

  async create(model: DeepPartial<T>): Promise<T> {
    try {
      const docs = await this.genericRepository.create(model);
      return await docs.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async insertMany(
    entityArr: QueryDeepPartialEntity<T>[],
  ): Promise<InsertResult> {
    return this.genericRepository.insert(entityArr);
  }

  async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | FindOptionsWhere<T>,
  ): Promise<{ message: string }> {
    const result = await this.genericRepository.delete(criteria);

    if (result.affected === 0) {
      return new NotFoundException('Not found');
    }
    return { message: 'success' };
  }

  async update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    try {
      return await this.genericRepository.update(criteria, partialEntity);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
